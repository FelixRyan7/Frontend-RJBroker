export const AssetType = {
  STOCK: "STOCK",
  ETF: "ETF",
  CRYPTO: "CRYPTO",
  COMMODITY: "COMMODITY",
  REIT: "REIT",
} as const;

export type AssetType = typeof AssetType[keyof typeof AssetType];

export interface Asset {
  id: number;
  symbol: string;
  name: string;
  type: AssetType;
  market: string;
  logo:string
  currency: string;
  category: string;
  decimals: number;
  isin: string | null;
  active: boolean;
}

export type AssetTileProps = Pick<
  Asset,
  "symbol" | "name" | "market" | "logo" | "type"
>;

export type AssetRowProps = {
  assets: Asset[];
};

export type AssetSectionProps = {
  type: string;
  assets: Asset[];
  onToggle?: () => void;

};

export type DashboardAssets = Record<AssetType, Asset[]>;

export type FilterPanelType = "country" | "market" | "sector" | null;

export type AssetDetailsDto = {
  id: number;
  name: string;
  symbol: string;
  market: string;
  logo:string
  currency: string,
  price: number;
  open: number;
  change: number;
  changePercent: number;
  description: string;
  dividendAmount: number; 
  marketCap: number;
  peRatio: number;
  eps: number;
  ebitda: number;
  netIncome: number;
  open5D: number;
  open1M: number;
  open1Y: number
};

export interface AssetDTO {
  id: number;
  symbol: string;
  name: string;
  logo: string;
  type: string;
  quantity: number;
  averagePrice: number;
  currentPrice: number;
  category: string
}
 export interface AssetFromApiDTO {
  id: number;
  symbol: string;
  name: string;
  logo: string;
  type: string;
  currentPrice: number;
  category: string;
}