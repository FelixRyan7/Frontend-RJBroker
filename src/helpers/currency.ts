export const currencySymbols: Record<string, string> = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  JPY: "¥",
  AUD: "A$",
  CAD: "C$",
  CHF: "CHF",
  CNY: "¥",
  KRW: "₩",
  // Añade más monedas según necesites
};

/**
 * Devuelve el símbolo de la moneda a partir del código ISO.
 * @param currency - código de moneda, ej. 'USD'
 */
export function getCurrencySymbol(currency: string) {
  return currencySymbols[currency] ?? currency; // Si no encuentra, devuelve el código
}