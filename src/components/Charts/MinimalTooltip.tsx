import type { TooltipProps } from "recharts";

interface MinimalTooltipProps {
  active?: boolean;
  payload?: { value?: number }[];
}

export const MinimalTooltip = ({ active, payload }: MinimalTooltipProps) => {
  if (!active || !payload || payload.length === 0) return null;

  const price = payload[0].value;
  if (price == null) return null;

  return (
    <div className="bg-white2 px-2 py-1 rounded shadow text-sm font-bold text-gray-800">
      ${price.toFixed(2)}
    </div>
  );
};
