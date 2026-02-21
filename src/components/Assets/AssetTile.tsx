import { AssetType, type AssetTileProps } from "../../@types/assets";

import ReactCountryFlag from "react-country-flag";
import { getCountryCodeByMarket } from "../../helpers/marketToCountry";
import { cryptoLogos } from "../../helpers/cryptoLogos";
import vanguardLogo from "../../assets/images/vanguard.png";


// Componente que representa un "tile" o tarjeta de un asset
export function AssetTile({ symbol, name, market, logo, type}: AssetTileProps) {
  const isCrypto = symbol in cryptoLogos;

  let imageSrc;

    if (isCrypto) {
      imageSrc = cryptoLogos[symbol];
    } else if (type === AssetType.ETF) {
      imageSrc = vanguardLogo;
    } else {
      imageSrc = logo;
    }
  return (
  <div className="flex items-center justify-between p-4">
      <div className="flex items-center gap-3">
         <img
          src={imageSrc}
          alt={name}
          className="w-6 h-6 rounded-full"
        />
      <div className="flex flex-col">
        <span className="text-sm font-semibold text-dark">{name}</span>
          <span className="text-xs text-gray font-medium">{symbol} · {market}</span>
      </div>
    </div>
    <div className="flex items-center">
      <ReactCountryFlag
        countryCode={getCountryCodeByMarket(market)}
        svg
        style={{ width: "1.5em", height: "1.5em" }}
      />
    </div>
  </div>
  );
}
