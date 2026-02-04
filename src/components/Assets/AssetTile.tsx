import type { AssetTileProps } from "../../@types/assets";

import ReactCountryFlag from "react-country-flag";
import { getCountryCodeByMarket } from "../../helpers/marketToCountry";
import { cryptoLogos } from "../../helpers/cryptoLogos";


// Componente que representa un "tile" o tarjeta de un asset
export function AssetTile({ symbol, name, market }: AssetTileProps) {
  const isCrypto = symbol in cryptoLogos;
  return (
    <div className="flex items-center justify-between p-4 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3">
        {isCrypto ? (
          <img
            src={cryptoLogos[symbol]}
            alt={name}
            className="w-6 h-6 rounded-full"
          />
        ) : (
          <ReactCountryFlag
            countryCode={getCountryCodeByMarket(market)}
            svg
            style={{ width: "1.5em", height: "1.5em" }}
          />
        )
        }
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-gray-900">{name}</span>
            <span className="text-xs text-gray-500 font-medium">{symbol} · {market}</span>
          </div>
      </div>
      <div className="flex items-center">
        <span className="text-lg font-bold text-green-600">+{"1.24%"}</span>
      </div>
    </div>
  );
}
