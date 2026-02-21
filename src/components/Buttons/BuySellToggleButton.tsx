
type ToggleButtonProps = {
  side: "buy" | "sell" | null;
  onChange: (side: "buy" | "sell" ) => void;
};

export default function BuySellToggleButton({side , onChange} : ToggleButtonProps) {
 

  return (
    <div className="flex  rounded-xl bg-gray-100 p-2">
        <button
            onClick={() => onChange("buy")}
            className={` flex-1 px-4 py-2 rounded-l-md text-sm font-semibold transition duration-200
              ${
                side === "buy"
                  ? "bg-green text-white shadow"
                  : "text-white bg-green/30"
              }`}
        >
            Buy
        </button>

      <button
            onClick={() => onChange("sell")}
            className={` flex-1 px-4 py-2 rounded-r-md text-sm font-semibold transition duration-200
              ${
              side === "sell"
                ? "bg-red text-white shadow"
                : "text-white bg-red/30"
              }`}
      >
        Sell
      </button>
    </div>
  );
}
