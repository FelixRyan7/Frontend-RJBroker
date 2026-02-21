import Portfoliolist from "../../components/Portfolio/Portfoliolist";

const data = [
  { name: "Crypto", value: 5500 },
  { name: "Stocks", value: 3500 },
  { name: "Cash", value: 1000 }
];

export default function Wallet() {
  return (
    <>
     <h1 className="my-10 mx-4 text-3xl">Assets:</h1>
    <Portfoliolist/>
    
    </>
  )
}
