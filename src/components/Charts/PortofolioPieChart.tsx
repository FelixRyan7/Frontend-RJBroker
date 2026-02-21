import { useContext } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { WalletContext } from "../../context/WalletContext";
import { getCurrencySymbol } from "../../helpers/currency";
import { convertFromUSD } from "../../helpers/currencyChange";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

interface ChartDataItem {
  name: string;
  value: number;
}

interface PortfolioPieChartProps {
  data: ChartDataItem[];
  title?: string;
  chartMode: "type" | "asset";
  setChartMode: React.Dispatch<React.SetStateAction<"type" | "asset">>;

}

const COLORS = [
  "#3b82f6",
  "#22c55e",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#14b8a6",
];

export default function PortfolioPieChart({
  data,
  title,
  chartMode,
  setChartMode,
}: PortfolioPieChartProps) {

  const walletContext = useContext(WalletContext);
  if (!walletContext) {
    throw new Error("WalletContext must be used inside WalletProvider");
  }

  const { wallet } = walletContext;

  if (!data || data.length === 0) {
    return (
      <div className="text-center text-gray-400 py-6">
        No data available
      </div>
    );
  }

  const total = data.reduce((sum, item) => sum + item.value, 0);
  const totalInLocalCurrency = data.reduce((acc, item) => {
  if (item.name === "CASH") {
    return acc + item.value; // cash ya está en la moneda local
  } else {
    return acc + convertFromUSD(item.value, wallet.currency); // assets en USD
  }
}, 0);

  return (
    <div className="w-full flex flex-col items-center">

      {title && (
        <>
          <div className="flex h-10 items-center gap-2 cursor-pointer"
              onClick={() =>
              setChartMode(prev => prev === "type" ? "asset" : "type")
              }
          >
          <h2 className="text-lg font-semibold">
            {title} 
          </h2>

          <span className="text-dark text-xs">
          <ArrowForwardIosIcon fontSize="small"/>
          </span>
          </div>
          <span>{totalInLocalCurrency.toFixed(2)} {getCurrencySymbol(wallet.currency)}</span>
        </>
      )}

      {/* Chart */}
      <div className="w-full h-[100px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              cx="50%"
              cy="100%"
              startAngle={180}
              endAngle={0}
              innerRadius={60}
              outerRadius={90}
              paddingAngle={2}
              stroke="none"
            >
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip
              formatter={(value: number | undefined) =>
                (value ?? 0).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })
              }
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Custom legend below */}
      <div className="w-full mt-6 px-10 space-y-3 mb-8">
        {data.map((item, index) => {
          const percent = total > 0
            ? ((item.value / total) * 100).toFixed(1)
            : "0.0";
          return (
            <div
              key={item.name}
              className="flex items-center justify-between text-sm "
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{
                    backgroundColor:
                      COLORS[index % COLORS.length],
                  }}
                />
                <span>{item.name}</span>
              </div>

              <div className="grid grid-cols-[1fr_auto_35px] items-center text-gray">
                <div className="text-right font-medium">
                  {item.name === "CASH"
                    ? item.value // ya está en la moneda local
                    : convertFromUSD(item.value, wallet.currency)}{' '}
                    {getCurrencySymbol(wallet.currency)}
                </div>

                <div className="px-2 text-center">
                  |
                </div>
                <div className="text-right">
                  {percent}%                
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
