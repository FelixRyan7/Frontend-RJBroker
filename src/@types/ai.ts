import type { AssetType } from "./assets";

export interface AiTermRequest {
  termKey: string;
  value: number | null | undefined;
  assetName: string;
  assetSymbol: string;
  price: number;
}

export interface AiTermResponse {
  explanation: string;
}

export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

 export type AiQuestionRequest = {
  question: string;
  assetName: string;
  assetSymbol: string;
  price: number;
};

export type PortfolioAsset = {
  symbol: string;                 // Ej: 'AAPL'
  name: string;                   // Ej: 'Apple Inc.'
  type: string; // según tu API
  quantity: number;               // cantidad de unidades
  averagePrice: number; 
  currentPrice:number 
  allocationPercent: number         // precio promedio
  value:number
};

export interface AiPortfolioAnalysisRequest {
  assetCount: number;                        // cantidad total de activos
  assets: PortfolioAsset[];                  // array de assets
  cash: number;                              // efectivo disponible
  totalValueInLocalCurrency: number;         // valor total del portafolio
  typeCount: number;                         // cantidad de tipos distintos de activos
  currency?: string;                         // opcional, para símbolos de divisa
}

export interface AiPortfolioAnalysisResponse {
  summary: string; 
  composition: {
    byType: Record<string, number>; 
    bySector?: Record<string, number>; 
    byGeography?: Record<string, number>; 
  };
  risksAndBenefits: Record<string, string>; 
  educationalNotes: string[];
}

export interface AiPortfolioQuestionRequest {
  question: string;
  portfolio: AiPortfolioAnalysisRequest;
}
