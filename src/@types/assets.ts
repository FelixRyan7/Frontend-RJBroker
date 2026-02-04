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
  currency: string;
  category: string;
  decimals: number;
  isin: string | null;
  active: boolean;
}

export type AssetTileProps = Pick<
  Asset,
  "symbol" | "name" | "market"
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
  isin: string;
  market: string;

  price: number;
  open: number;
  change: number;
  changePercent: number;
};