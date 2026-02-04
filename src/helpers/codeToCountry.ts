const COUNTRY_NAMES: Record<string, string> = {
  US: "United States",
  ES: "Spain",
  FR: "France",
  DE: "Germany",
  IT: "Italy",
  CN: "China",
  JP: "Japan",
  GB: "Great Britain"
  // agrega todos los que necesites...
};

// Función para obtener el nombre del país
export function getCountryName(code: string): string {
  return COUNTRY_NAMES[code.toUpperCase()] || code; // si no encuentra, devuelve el código
}