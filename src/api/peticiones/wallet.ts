import type { GenerateReportRequest } from "../../@types/wallet";
import apiWallet from "../axiosWallet";

export type PortfolioSnapshotDto = {
  id: number;
  userId: number;
  snapshotDate: string; // string ISO del backend
  totalValue: number;
  cash: number;
};

//Función para obtener los snapshots de un user
export const fetchPortfolioSnapshots = async (): Promise<PortfolioSnapshotDto[]> => {
  const { data } = await apiWallet.get("/api/portfolio/snapshots");
  return data;
}

export const PortfolioReport = async (payload: GenerateReportRequest) => {
  const { data } = await apiWallet.post("/api/portfolio/report", payload);
  return data;
}