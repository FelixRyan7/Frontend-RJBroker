type Option = { value: string; label: string };

export const EUROPEAN_NATIONALITIES = [
  "Spain",
  "France",
  "Germany",
  "Italy",
  "Portugal",
  "Netherlands",
  "Belgium",
  "Sweden",
  "Norway",
  "Denmark",
  "Finland",
  "Ireland",
  "Austria",
  "Switzerland",
  "Poland",
] as const;

export const EUROPEAN_COUNTRIES = [
  "Spain",
  "France",
  "Germany",
  "Italy",
  "Portugal",
  "Netherlands",
  "Belgium",
  "Sweden",
  "Norway",
  "Denmark",
  "Finland",
  "Ireland",
  "Austria",
  "Switzerland",
  "Poland",
] as const;

export const EMPLOYMENT_STATUS_OPTIONS = [
  { value: "EMPLOYED", label: "Empleado" },
  { value: "SELF_EMPLOYED", label: "Autónomo" },
  { value: "STUDENT", label: "Estudiante" },
  { value: "UNEMPLOYED", label: "Desempleado" },
  { value: "OTHER", label: "Otro" },
];

export const INCOME_RANGE_OPTIONS = [
  { value: "<20000", label: "Menos de 20.000" },
  { value: "20000-50000", label: "20.000 - 50.000" },
  { value: "50000-100000", label: "50.000 - 100.000" },
  { value: ">100000", label: "Más de 100.000" },
  { value: "PREF_NO_SAY", label: "Prefiero no decir" },
];

export const CITIES_BY_COUNTRY: Record<string, Option[]> = {
  Spain: [
    { value: "Madrid", label: "Madrid" },
    { value: "Barcelona", label: "Barcelona" },
    { value: "Valencia", label: "Valencia" },
    { value: "Sevilla", label: "Sevilla" },
  ],
  France: [
    { value: "Paris", label: "Paris" },
    { value: "Lyon", label: "Lyon" },
    { value: "Marseille", label: "Marseille" },
  ],
  // Resto de países...
};

export const INVESTMENT_EXPERIENCE_OPTIONS = [
  { value: "NONE", label: "Sin experiencia" },
  { value: "BASIC", label: "Experiencia básica" },
  { value: "INTERMEDIATE", label: "Experiencia intermedia" },
  { value: "ADVANCED", label: "Experiencia avanzada" },
];

export const RISK_TOLERANCE_OPTIONS = [
  { value: "LOW", label: "Bajo riesgo" },
  { value: "MEDIUM", label: "Riesgo medio" },
  { value: "HIGH", label: "Alto riesgo" },
];

export const BASE_CURRENCY_OPTIONS = [
  { value: "EUR", label: "Euro (EUR)" },
  { value: "USD", label: "Dólar estadounidense (USD)" },
  { value: "GBP", label: "Libra esterlina (GBP)" },
  { value: "CHF", label: "Franco suizo (CHF)" },
  { value: "DKK", label: "Corona Danesa (DKK)" },
]