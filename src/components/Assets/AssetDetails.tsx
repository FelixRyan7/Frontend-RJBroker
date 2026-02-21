
import type { AssetDetailsDto } from '../../@types/assets'
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchAssetById } from '../../api/peticiones/assets';
import CloseIcon from '@mui/icons-material/Close';
import { ArrowUpward, ArrowDownward } from '@mui/icons-material';
import SimplePriceChart from '../Charts/SimplePriceChart';
import {  useContext, useEffect, useState } from 'react';
import '../../styles/styles.css';
import TradeAsset from './TradeAsset';
import { AiTerm } from '../../AI/AiTerm';
import { useAiQuestion, useAiTerm } from '../../api/peticiones/ai';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import { Loader } from '../utils/Loader';
import { AiExplanationModal } from '../../AI/AiExplanationModal';
import type { AiTermResponse, ChatMessage } from '../../@types/ai';
import { getCurrencySymbol } from '../../helpers/currency';
import { convertFromUSD } from '../../helpers/currencyChange';
import { WalletContext } from '../../context/WalletContext';


export default function AssetDetails() {

  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const walletContext = useContext(WalletContext);
          if (!walletContext) {
            throw new Error("WalletContext must be used inside WalletProvider");
          }
  const { wallet } = walletContext;

    if (!id) return;

    const { data, isLoading, isError } = useQuery<AssetDetailsDto>({
    queryKey: ["asset", id],
    queryFn: () => fetchAssetById(Number(id)),
    staleTime: 8 * 60_000,              // 5 min en caché después de inactivo
    });

    const [tradeType, setTradeType] = useState<"buy" | "sell" | null>(null);
    
    const [selectedRange, setSelectedRange] = useState<"1D" | "5D" | "1M" | "1Y">("1D");
    const rangeOpenPriceMap: Record<"1D" | "5D" | "1M" | "1Y", number | null> = {
      "1D": data?.open ?? null,
      "5D": data?.open5D ?? null,
      "1M": data?.open1M ?? null,
      "1Y": data?.open1Y ?? null,
    };

    const startPrice = rangeOpenPriceMap[selectedRange];
    // Calcula cambio absoluto y porcentaje dinámicamente
    const change = startPrice != null && data?.price != null
      ? data.price - startPrice
      : 0;

    const changePercent = startPrice != null && data?.price != null
      ? ((data.price - startPrice) / startPrice) * 100
      : 0;

    const [isVisible, setIsVisible] = useState(false);
    
      useEffect(() => {
        // fuerza el render inicial y luego anima
        console.log
        requestAnimationFrame(() => {
         setIsVisible(true);
         console.log(data)
      });
      
    
      return () => setIsVisible(false);
      }, []);

    const metrics = [
      { label: "Dividend", value: data?.dividendAmount, key: "dividendAmount" },
      { label: "Market Cap", value: data?.marketCap, key: "marketCap" },
      { label: "Net Income", value: data?.netIncome, key: "netIncome" },
      { label: "PE Ratio", value: data?.peRatio, key: "peRatio" },
      { label: "EPS", value: data?.eps, key: "eps" },
      { label: "EBITDA", value: data?.ebitda, key: "ebitda" },
    ];

    const [selectedTerm, setSelectedTerm] = useState<string | null>(null);
  
    const columns = [];
      for (let i = 0; i < metrics.length; i += 3) {
      columns.push(metrics.slice(i, i + 3));
    }
    const [aiMode, setAiMode] = useState(false);
    const [aiOpen, setAiOpen] = useState<boolean>(false);
    const [conversation, setConversation] = useState<ChatMessage[]>([]);
    const [aiLoading, setAiLoading] = useState<boolean>(false);
    const [aiError, setAiError] = useState<string | null>(null);

    const { mutateAsync: getAiTerm, isPending, error, data: aiData } = useAiTerm();
    const [usedMetrics, setUsedMetrics] = useState<string[]>([]);

    const handleTermClick = async (termKey: string) => {
      if (!data) return;
      setUsedMetrics((prev) => [...prev, termKey]);

      const metric = metrics.find(m => m.key === termKey);
      const value = metric?.value;

      const payload = {
        termKey,
        value,
        assetName: data.name,
        assetSymbol: data.symbol,
        price: data.price,
      };

      const userMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: "user",
        content: `${metric?.label || termKey} - ${data.name}`,
      };

      setSelectedTerm(termKey);
      setAiOpen(true);
      setAiLoading(true);
      setConversation(prev => [...prev, userMessage]);
      setAiError(null);
      console.log(payload)
      try {
      const response = await getAiTerm(payload);
      // 🔹 Normalizamos la respuesta para que sea AiTermResponse
      const normalizedResponse: AiTermResponse =
      typeof response === "string" ? { explanation: response } : response;

      const assistantMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "assistant",
      content: normalizedResponse.explanation,
    };

    setConversation(prev => [...prev, assistantMessage]);

    console.log("AI response:", normalizedResponse);

    } catch (err) {
      setAiError("No se pudo obtener la explicación.");
      console.error("Error fetching AI explanation:", err);
    } finally {
      setAiLoading(false);
    }
    };

    const { mutateAsync: getAiQuestion } = useAiQuestion();

    const handleUserQuestion = async (question: string) => {
      if (!question.trim() || !data) return;

      const userMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: "user",
        content: question,
      };

      setConversation((prev) => [...prev, userMessage]);
      setAiLoading(true);
      setAiError(null);

      try {
      const payload = {
        question,
        assetName: data.name,
        assetSymbol: data.symbol,
        price: data.price,
      };

      const response = await getAiQuestion(payload);

      const normalizedResponse: AiTermResponse =
        typeof response === "string" ? { explanation: response } : response;

      const assistantMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: normalizedResponse.explanation,
      };

      setConversation((prev) => [...prev, assistantMessage]);

      } catch (err) {
        setAiError("No se pudo obtener la explicación.");
        console.error(err);
      } finally {
        setAiLoading(false);
      }
    };


    if(isLoading) return (
      <div className={`relative inset-0 z-50 transition-all duration-100 ease-out
        ${isVisible ? "opacity-100" : "opacity-0"}
        `}
      >
        <div className={`fixed inset-x-0 bottom-0 top-10 border-t border-gray rounded-t-2xl bg-white2 flex flex-col transition-transform duration-100 ease-out
            ${isVisible ? "translate-y-0" : "translate-y-full"}
          `}
        >   
          <div className="flex items-center justify-center h-full">
            <Loader isLoading={isLoading} color="primary"/>
          </div>
        </div>
      </div>
    )

    if(isError) return <h1>Error </h1>

    

    

  return (
  <>
    <div className={`relative inset-0 z-50 transition-all duration-100 ease-out 
        ${isVisible ? "opacity-100" : "opacity-0"}
        `}>
      <div className={`fixed inset-x-0 bottom-0 top-10 border-t border-gray rounded-t-2xl bg-white2 flex flex-col transition-transform duration-100 ease-out
            ${isVisible ? "translate-y-0" : "translate-y-full"}
          `}
      >    
        <div className="absolute inset-0 flex-1 overflow-y-auto pt-6 overscroll-contain" style={{ paddingBottom: 'calc(6rem + 2rem)' }}>
          <div 
             
            className='fixed right-6 w-8 h-8 bg-gray rounded-full flex items-center justify-center text-white2 cursor-pointer'>
            <span  onClick={() => navigate(-1)}>
              <CloseIcon/>
            </span>
            <button
              onClick={() => setAiMode(prev => !prev)}
              className={`fixed right-5 top-[4.8rem] z-50  ${aiMode ? 'ai-button w-11 h-11 rounded-full' : 'border border-primary rounded-full bg-white w-11 h-11'}`}
            >
              {aiMode ? <AutoAwesomeIcon style={{ color: "#1B98E0" }}/> : <AutoAwesomeOutlinedIcon style={{ color: "#1B98E0" }}/>}
              
            </button>
           
          </div>
           
           {/* Nombre, market  y logo*/}
          <div className='px-5'>
            <div className='flex flex-col gap-4'>
             <img
                src={data?.logo}
                alt={data?.name}
                className="w-10 h-10 rounded-full"
              />
            <h1 className='text-xl  '>{data?.symbol} | {data?.market ? data?.market : data?.name}
            </h1>
          </div>
          
           {/* Precio y priceChange */}
          <div className='flex mt-2 gap-2 align-baseline ites-center'>
            <h1 className='text-4xl font-bold'> {getCurrencySymbol(data?.currency || "USD")} {convertFromUSD(data?.price ?? 0, data?.currency ?? "USD")}</h1>
            <span
            className={
              change > 0
              ? 'text-[#14B8A6] flex items-end gap-1 text-2xl font-bold'
              : change < 0
              ? 'text-[#F43F5E] flex items-end gap-1 text-2xl font-bold'
              : 'text-gray-500 flex items-end gap-1'
            }
          >
            {changePercent.toFixed(2)}%
            {change > 0 && <ArrowUpward className="w-6 h-6 self-end" />}
            {change < 0 && <ArrowDownward className="w-6 h-6 self-end" />}
            </span>
          </div>

          {/* grafica de precios */}
          {startPrice!= null && data?.price != null && (
            <div className="mt-4 ">
              <SimplePriceChart
                startPrice={startPrice}
                endPrice={data.price}
              />
            </div>
          )}
          <div className="flex gap-6 mt-5 mr-4">
            {["1D", "5D", "1M", "1Y"].map((range) => (
              <span
                key={range}
                onClick={() => setSelectedRange(range as any)}
                className={`cursor-pointer font-bold px-4 py-2 rounded-xl shadow-sm ${
                  selectedRange === range ? "bg-dark text-white2" : "bg-gray text-white2"}`
                }
              >
                {range}
              </span>
            ))
            }
          </div>
         
          {/* Descripcion del producto */}
          <div className='my-6 flex flex-col gap-1'>
            <span className='font-bold mb-1'>Description: </span>
            <span>{data?.description}</span>          
          </div>
          {/* Informacion financiera */}
          <span className="font-bold mb-4">Financial Details:</span>
          <div className="my-4 overflow-x-auto hide-scrollbar">
            <div className="flex gap-6 w-max">
              {columns.map((column, colIndex) => (
              <div
                key={colIndex}
                className="min-w-[290px] flex flex-col gap-4"
              >
                {column.map((metric) => 
                  metric.value !== null && metric.value !== undefined && metric.value !== 0 ? (
                    <AiTerm
                      key={metric.key}
                      label={metric.label}
                      value={metric.value}
                      termKey={metric.key}
                      aiMode={aiMode}
                      onClick={handleTermClick}
                    />
                  ) : null
                )}
              </div>
              ))}
              </div>
            </div>
        </div>
      </div>
        {/* Botones comprar y vender */}
        <div className='fixed bottom-6 flex justify-between w-full p-5 gap-2 '>
          <button 
            onClick={() => setTradeType("sell")}
            className='flex-1 bg-red p-4 text-white2 font-bold text-lg text-left rounded-xl shadow-sm shadow-gray'>Vender</button>
          <button 
            onClick={() => setTradeType("buy")}
            className='flex-1 bg-green p-4 text-white2 font-bold text-lg text-left rounded-xl shadow-sm shadow-gray'>Comprar</button>
        </div>
      </div>
    </div>
    {tradeType && data?.price && ( 
      <TradeAsset 
        tradeType={tradeType}
        setTradeType={setTradeType}
        price={data.price}
        assetId={Number(id)}
        assetSymbol={data.symbol}
        assetLogo={data.logo}
      />
    )}
    {aiOpen && (
      <AiExplanationModal
      onClose={() => setAiOpen(false)}
      loading={aiLoading}
      error={aiError}
      conversation={conversation}
      metrics={metrics.filter(m => m.key !== selectedTerm)}
      usedMetrics={usedMetrics}
      onMetricClick={handleTermClick}
      onSendQuestion={handleUserQuestion}
      />
    )}
  </>
  )
}
