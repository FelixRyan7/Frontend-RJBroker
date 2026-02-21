export type GenerateReportRequest = {
  startSnapshotDate: string; // YYYY-MM-DD
  netWorth: number;
  cash: number;
  assets: FullAssetData[];
};

export type FullAssetData = {
  id: number;
  name: string;
  symbol: string;
  type: string;
  quantity: number;
  averagePrice: number;
  currentPrice: number;
  logo?: string;
};