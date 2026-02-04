// marketToCountry.ts
export const MARKET_TO_COUNTRY: Record<string, string> = {
  NASDAQ: "US",
  NYSE: "US",
  AMEX: "US",
  LSE: "GB",
  XETRA: "DE",
  BME: "ES",
  TSX: "CA",
  TSE: "JP",
  HKEX: "HK",
  EURONEXT: "EU",
  EURONEXT_PARIS: "FR",
  CME: "US",
  NYMEX: "US" 
};

/**
 * Devuelve el código de país ISO 2 letras según el market.
 * Si no encuentra nada, devuelve undefined
 */
export function getCountryCodeByMarket(market: string): string {
  return MARKET_TO_COUNTRY[market.toUpperCase()];
}
