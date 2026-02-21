import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";

type Props = {
  data: {
    type: "buy" | "sell";
    price: number;
    quantity: number;
    assetSymbol: string;
  };
};

export const SuccesfulTradeComponent = ({ data }: Props) => {
  const { type, price, quantity, assetSymbol } = data;

  return (
    <div
      className="
        fixed inset-0 z-50
        flex items-center justify-center
        bg-primary
        animate-slide-up
      "
    >
      <div className="text-center text-white2 px-6">
        <CheckCircleOutlineOutlinedIcon
          className="mb-4"
          sx={{ fontSize: 80 }}
        />

        <h2 className="text-3xl font-bold bg-white2 p-3 text-primary rounded-lg">
          {type === "buy" ? "Purchase Successful" : "Sale Successful"}
        </h2>

        <p className="mt-3 text-xl text-white2/90">
          {type === "buy" ? "You bought" : "You sold"}{" "}
          <span className="font-semibold">
            {assetSymbol} succesfully <br />
            Quantity: {quantity}
          </span>
        </p>

        <p className="mt-1 text-white2/85 text-xl">
          Price:{" "}
          <span className="font-medium">
            {price.toFixed(2)}
          </span>
        </p>
      </div>
    </div>
  );
};
