import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  ReferenceLine
} from "recharts";
import { MinimalTooltip } from "./MinimalTooltip";

interface SimplePriceChartProps {
  startPrice: number;
  endPrice: number;
}

const MIN_VISUAL_RANGE_RATIO = 0.005; // 0.5%

function getYAxisDomain(
  start: number,
  end: number
): [number, number] {
  const min = Math.min(start, end);
  const max = Math.max(start, end);

  const range = max - min;
  const minVisualRange = min * MIN_VISUAL_RANGE_RATIO;

  if (range < minVisualRange) {
    const mid = (min + max) / 2;
    return [
      mid - minVisualRange / 2,
      mid + minVisualRange / 2
    ];
  }

  return [
    min * 0.88,
    max * 1.1
  ];
}

type ChartPoint = {
  label: string;
  price: number;
};

export default function SimplePriceChart({startPrice, endPrice}: SimplePriceChartProps) {
  const Chartdata: ChartPoint[] = [
    { label: "Start", price: startPrice },
    { label: "2price", price: startPrice * 1.02 },
    { label: "3price", price: startPrice * 1.03 },
    { label: "4price", price: startPrice * 1.01 },
    { label: "5price", price: startPrice * 1.04 },
    { label: "6price", price: startPrice * 0.97 },
    { label: "7price", price: endPrice * 0.95 },
    { label: "End", price: endPrice }
  ];

  const isPositive: boolean = endPrice >= startPrice;
  const color: string = isPositive ? "#14B8A6" : "#F43F5E";
  const [yMin, yMax] = getYAxisDomain(startPrice, endPrice);

  if (startPrice == null || endPrice == null) {
    return (
      <div className="h-[180px] w-full rounded-xl bg-gray-100 flex items-center justify-center">
        <span className="text-gray-400 text-sm">
          Chart no disponible
        </span>
      </div>
    );
  }

  return (
    
    <ResponsiveContainer width="100%" height={180}>
      <LineChart data={Chartdata}>
        <defs>
          <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.8} />
            <stop offset="100%" stopColor={color} stopOpacity={0.25} />
          </linearGradient>
        </defs>

        <XAxis hide />
        <YAxis domain={[yMin, yMax]} hide />

        <Tooltip content={<MinimalTooltip />} />


        <Line
          type="monotone"
          dataKey="price"
          stroke={color}
          strokeWidth={3}
          dot={false}
          isAnimationActive
        />

        {/* Línea horizontal de referencia */}
        <ReferenceLine
          y={startPrice}          // altura de la línea
          stroke="#ADB6C4"        // color de la línea
          strokeDasharray="5 5"   // punteada
          label={{ position: "insideTopLeft", value: startPrice, fill: "#ADB6C4" }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
