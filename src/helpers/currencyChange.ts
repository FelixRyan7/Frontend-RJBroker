

// Tipos de cambio fijos respecto a USD (puedes actualizarlos cuando quieras)
const EXCHANGE_RATES: Record<string, number> = {
  USD: 1,     // dólares → dólares
  EUR: 0.84,  // dólares → euros
  GBP: 0.73,  // dólares → libras
  CHF: 0.77,  // dólares → francos suizos
};

/**
 * Convierte una cantidad en USD a la moneda deseada
 * @param amountUSD cantidad en dólares
 * @param currency moneda de destino (wallet.currency)
 * @returns número redondeado a 2 decimales
 */
export function convertFromUSD(amountUSD: number, currency: string): number {
  const rate = EXCHANGE_RATES[currency] ?? 1; // default a 1 si moneda desconocida
  return Math.round(amountUSD * rate * 100) / 100;
}

/**
 * Convierte USD a moneda y devuelve string formateado
 */
export function formatCurrency(amountUSD: number, currency: string): string {
  const amount = convertFromUSD(amountUSD, currency);
  const symbol = getCurrencySymbol(currency);
  return `${symbol}${amount.toFixed(2)}`;
}

export function convertFromUSDForCalc(amountUSD: number, currency: string): number {
  const rate = EXCHANGE_RATES[currency] ?? 1;
  return amountUSD * rate;
}

/**
 * Devuelve el símbolo de la moneda
 */
function getCurrencySymbol(currency: string) {
  switch (currency) {
    case "EUR": return "€";
    case "GBP": return "£";
    case "CHF": return "CHF ";
    case "USD":
    default: return "$";
  }
}
