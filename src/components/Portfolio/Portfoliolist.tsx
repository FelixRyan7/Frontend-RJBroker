import { useContext, useEffect, useMemo, useState } from 'react'
import { WalletContext } from '../../context/WalletContext';
import { useQuery } from '@tanstack/react-query';
import { fetchAssetsInfo } from '../../api/peticiones/assets';
import { calculatePnL } from '../../helpers/assetCalculations';
import { getCurrencySymbol } from '../../helpers/currency';
import { AssetType, type AssetDTO, type AssetFromApiDTO } from '../../@types/assets';
import PortfolioPieChart from '../Charts/PortofolioPieChart';
import { convertFromUSD } from '../../helpers/currencyChange';
import { Loader } from '../utils/Loader';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { AiPortfolioAnalysisModal } from '../../AI/AiPortfolioAnalysisModal';
import type { AiPortfolioAnalysisRequest, AiTermResponse, ChatMessage } from '../../@types/ai';
import { useAiPortfolioAnalisis, useAiQuestionFromPortfolio } from '../../api/peticiones/ai';
import { formatPortfolioResponse } from '../../helpers/FormatPortfolioResponse';
import AnalyzePortfolioButton from '../Buttons/AnalyzePortoflioButton';
import { fetchPortfolioSnapshots, PortfolioReport } from '../../api/peticiones/wallet';
import type { GenerateReportRequest } from '../../@types/wallet';

export default function Portfoliolist() {
    const walletContext = useContext(WalletContext);
        if (!walletContext) {
          throw new Error("WalletContext must be used inside WalletProvider");
        }
    const { wallet , netWorth } = walletContext;
    const { assets } = wallet;
    const assetIds = useMemo(
    () => wallet?.assets.map(asset => asset.assetId) ?? [],
    [wallet]
    );

    const { data: assetsInfo, isLoading, error } = useQuery({
        queryKey: ['assets-info', assetIds],
        queryFn: () => fetchAssetsInfo(assetIds),
        enabled: assetIds.length > 0, 
    });

    const [fullAssetsData, setFullAssetsData] = useState<AssetDTO[]>([])
      useEffect(() => {
        if (!wallet || !assetsInfo) return;

        const combinedAssets = wallet.assets.map(asset => {
        const extra: AssetFromApiDTO | undefined = assetsInfo.find(
          (a: AssetFromApiDTO) => a.id === asset.assetId
        );
        if (!extra) return null;

        return {
            id: asset.assetId,
            symbol: asset.assetSymbol,
            name: extra.name,
            logo: extra.logo,
            type: extra.type,
            quantity: asset.quantity,
            averagePrice: asset.averagePrice,
            currentPrice: extra.currentPrice,
            category: extra.category
        } as AssetDTO;
        }).filter((a): a is AssetDTO => a !== null); 

        setFullAssetsData(combinedAssets);
    }, [wallet, assetsInfo]);

    {fullAssetsData.map((asset) => {
      const { profitLoss, profitLossPercent } = calculatePnL(
        asset.currentPrice,
        asset.quantity,
        asset.averagePrice
      );

      const isPositive = profitLoss >= 0;
    }
    )}

    const totalValue = useMemo(() => {
      return fullAssetsData.reduce((acc, asset) => {
      return acc + asset.currentPrice * asset.quantity;
      }, 0);
      
    }, [fullAssetsData]);

    const [chartMode, setChartMode] = useState<"type" | "asset">("asset");

    const chartDataByType = useMemo(() => {
      const data: Record<string, number> = {};
        fullAssetsData.forEach(asset => {
        data[asset.type] =
        (data[asset.type] || 0) +
        asset.currentPrice * asset.quantity;
      });
    
      return Object.entries(data).map(([name, value]) => ({
        name,
        value,
      }));
    }, [fullAssetsData, wallet.balance]);


    const chartDataByAsset = useMemo(() => {
    const assetsData = fullAssetsData.map(asset => ({
      name: asset.symbol,
      value: asset.currentPrice * asset.quantity,
    }));
    if (wallet.balance > 0) {
      assetsData.push({
        name: "CASH",
        value: wallet.balance,
      });
    }
    return assetsData;
    }, [fullAssetsData, wallet.balance]);

    const [isAiModalOpen, setIsAiModalOpen] = useState(false);
    const { mutate: analyzePortfolio, isPending: isAnalyzingPortfolio } = useAiPortfolioAnalisis()
    const { mutate: askPortfolioQuestion,  isPending: isAskingQuestion} = useAiQuestionFromPortfolio()
    const [aiConversation, setAiConversation] = useState<ChatMessage[]>([]);
    const [aiLoading, setAiLoading] = useState(false);
    const [aiError, setAiError] = useState<string | null>(null);

    const handleSendQuestion = async (question: string) => {
      if (!fullAssetsData.length) return;
      console.log(question)
      setAiLoading(true);
      const userMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: "user",
        content: question,
      };
      setAiConversation((prev) => [...prev, userMessage]);

      const totalValueInLocalCurrency = convertFromUSD(totalValue, wallet.currency);

      const assets = fullAssetsData.map((asset) => {
        const value = asset.currentPrice * asset.quantity;
          return {
            symbol: asset.symbol,
            name: asset.name,
            type: asset.type,
            quantity: asset.quantity,
            averagePrice: convertFromUSD(asset.averagePrice, wallet.currency),
            currentPrice: convertFromUSD(asset.currentPrice, wallet.currency),
            value: convertFromUSD(value, wallet.currency),
            allocationPercent:
              (convertFromUSD(value, wallet.currency) /
              (convertFromUSD(totalValue, wallet.currency) + wallet.balance)) * 100,
          };
        });

        const payload = {
          question,
          portfolio: {
          totalValueInLocalCurrency,
          assets,
          cash: wallet.balance,
          assetCount: assets.length,
          typeCount: [...new Set(assets.map((a) => a.type))].length,
          currency: wallet.currency,
          },
        };

        askPortfolioQuestion(payload, {
          onSuccess: (response) => {
            const normalizedResponse: AiTermResponse =
              typeof response === "string" ? { explanation: response } : response;
            const aiMessage: ChatMessage = {
              id: crypto.randomUUID(),
              role: "assistant",
              content: normalizedResponse.explanation,
            };

            setAiConversation((prev) => [...prev, aiMessage]);
            setAiLoading(false);
          },
          onError: () => {
            setAiConversation((prev) => [
              ...prev,
            {
              id: crypto.randomUUID(),
              role: "assistant",
              content: "Ocurrió un error al analizar tu pregunta.",
            },
            ]);
            setAiLoading(false);
          },
      });
    };


    const handleAnalyzePortfolio = () => {
      if (!fullAssetsData.length) return;
      setIsAiModalOpen(true);
      setAiLoading(true)
      const totalValueInLocalCurrency = convertFromUSD(totalValue, wallet.currency)

      const assets = fullAssetsData.map(asset => {
      const value = asset.currentPrice * asset.quantity;
    
      return {
        symbol: asset.symbol,
        name: asset.name,
        type: asset.type,
        quantity: asset.quantity,
        averagePrice: convertFromUSD(asset.averagePrice, wallet.currency), 
        currentPrice: convertFromUSD(asset.currentPrice, wallet.currency),
        value: convertFromUSD(value, wallet.currency),
        allocationPercent: (convertFromUSD(value, wallet.currency) / (convertFromUSD(totalValue, wallet.currency) + wallet.balance)) * 100,
      };
      });

      const payload = {
        totalValueInLocalCurrency,
        assets,
        cash: wallet.balance,
        assetCount: assets.length,
        typeCount: [...new Set(assets.map(a => a.type))].length,
        currency: wallet.currency
      };
    
      analyzePortfolio(payload, {
        
        onSuccess: (response) => {
          const normalizedResponse: AiTermResponse =
                typeof response === "string" ? { explanation: response } : response;
        // Transformar la respuesta en texto para mostrar en el chat
          const aiMessage: ChatMessage = {
          id: crypto.randomUUID(),
          role: "assistant",
          content: normalizedResponse.explanation, // función que convierte AiPortfolioAnalysisResponse a texto
        };
        

        setAiConversation((prev) => [...prev, aiMessage]);
        setAiLoading(false);
        },
        onError: (error) => {
          console.error("Error al analizar portafolio:", error);
            setAiConversation((prev) => [
              ...prev,
              { id: crypto.randomUUID(), role: "assistant", content: "Ocurrió un error al analizar tu portafolio." }
            ]);
        },
      });
    };

    const snapshotsQuery = useQuery({
      queryKey: ["portfolioSnapshots"],
      queryFn: fetchPortfolioSnapshots,
      enabled: false,
    });
    // handle para buscar snapshots del portfoliio del usuario
    const handleRequestSnapshots = async (): Promise<void> => {
       await snapshotsQuery.refetch();
       
    };
    const snapshots: Date[] = snapshotsQuery.data?.map(s => new Date(s.snapshotDate)) ?? [];
    const loadingSnapshots = snapshotsQuery.isFetching;

    // handle para generar el informe desde una fecha
    const handleGenerateReportFromDate = async (from: Date): Promise<void> => {
      try {
        const payload: GenerateReportRequest = {
          startSnapshotDate: from.toISOString().split("T")[0], // YYYY-MM-DD
          netWorth,
          cash: wallet.balance,
          assets: fullAssetsData
        };
        console.log(payload)
        const report = await PortfolioReport(payload);
        console.log("Informe generado:", report);

      } catch (error) {
        console.error("Error generando informe:", error);
      } 
    };

  if(isLoading) return (
    <div className="flex items-center justify-center h-full">
      <Loader isLoading={isLoading} color="primary"/>
    </div>
  )
  if(error) return(
    <h1>Error</h1>
  )

  return (
        (assets.length === 0 ? (
            <div className="text-gray-400 text-center py-6">
                No assets in your portfolio yet.
            </div>
        ) 
        : 
        (
        <div className="space-y-4">
          <div className='flex justify-between px-4 text-xs text-darkerGray'> 
            <span>Price | Avg Price | qty</span>
            <span>Total Pnl</span>
          </div>
            
          {fullAssetsData.map((asset) => {
          const { profitLoss, profitLossPercent } = calculatePnL(
            asset.currentPrice,
            asset.quantity,
            asset.averagePrice
          );
          const isPositive = profitLoss >= 0;
          return (
          <div
            key={asset.id}
            className="flex items-center justify-between px-4 text-dark pb-5"
          >
            <div className="flex flex-col">
              <div className="flex gap-1 items-center">
                <img src={asset.logo} alt="" className="w-5 h-5 rounded-full" />
                <div className="font-semibold text-lg">
                  {asset.name}
                </div>
              </div>

              <div className="text-xs text-darkerGray">
                <span>{asset.currentPrice}</span>
                <span> | {asset.averagePrice}</span>
                <span> | {asset.quantity}</span>
              </div>
            </div>

            <div className="flex flex-col text-right">
              <span className="text-lg font-semibold">
                {convertFromUSD(asset.currentPrice * asset.quantity, wallet.currency).toFixed(2)}{" "}
                {getCurrencySymbol(wallet.currency)}
              </span>

              <span
                className={`text-sm font-medium ${
                  isPositive ? "text-green" : "text-red"
                }`}
              >
                {isPositive ? "+" : ""}
                {convertFromUSD(profitLoss, wallet.currency).toFixed(2)} ({profitLossPercent.toFixed(2)}%)
              </span>
            </div>
          </div> 
          );
          })}

          <div className="flex justify-between items-baseline gap-2 mb-4 px-2 border-t border-gray"></div>
            <div className='flex justify-end m-4'>
              <AnalyzePortfolioButton 
                handleAnalyzePortfolio={handleAnalyzePortfolio} 
                handleGenerateReportFromDate={handleGenerateReportFromDate} 
                onRequestSnapshots={handleRequestSnapshots} 
                snapshots={snapshotsQuery.data ?? []}
                loadingSnapshots={loadingSnapshots}/>
            </div>
            <PortfolioPieChart
              data={chartMode === "type" ? chartDataByType : chartDataByAsset}
              title={chartMode === "type" ? "Portfolio by Type" : "Portfolio by Asset"}
              chartMode={chartMode}
              setChartMode={setChartMode}
            />
            {isAiModalOpen && (
              <AiPortfolioAnalysisModal
                onClose={() => setIsAiModalOpen(false)}
                loading={aiLoading}
                error={aiError}
                conversation={aiConversation}
                onSendQuestion={handleSendQuestion}
              />
            )}
            
          </div>

          
    ))
  )
}
