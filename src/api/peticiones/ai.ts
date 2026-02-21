import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import apiWallet from "../axiosWallet";
import type { AiPortfolioAnalysisRequest, AiPortfolioAnalysisResponse, AiPortfolioQuestionRequest, AiQuestionRequest } from "../../@types/ai";

// DTO del request
export interface AiTermRequest {
  termKey: string;
  value: string | number | undefined;
  assetName: string;
  assetSymbol: string;
  price: number;
}

// DTO del response
export interface AiTermResponse {
  explanation: string;
}


export const fetchAiTerm = async (payload: AiTermRequest): Promise<AiTermResponse> => {
  const { data } = await apiWallet.post("/api/ai/asset/term", payload);
  return data;
};

// Custom hook para usar en tus componentes
export const useAiTerm = () => {
  return useMutation({
    mutationFn: fetchAiTerm,
  });
};

export const fetchAiQuestion = async (payload: AiQuestionRequest): Promise<AiTermResponse> => {
  const { data } = await apiWallet.post("/api/ai/asset/question", payload);
  return data;
};

// Custom hook para usar en tus componentes
export const useAiQuestion = () => {
  return useMutation({
    mutationFn: fetchAiQuestion,
  });
};

export const fetchAiPortfolioAnalisis = async (payload: AiPortfolioAnalysisRequest): Promise<AiTermResponse> => {
  const { data } = await apiWallet.post("/api/ai/portfolio/Analysis", payload);
  return data;
};

// Custom hook para usar en tus componentes
export const useAiPortfolioAnalisis = () => {
  return useMutation({
    mutationFn: fetchAiPortfolioAnalisis,
  });
};

export const fetchAiQuestionFromPortfolio = async (payload: AiPortfolioQuestionRequest): Promise<AiTermResponse> => {
  const { data } = await apiWallet.post("/api/ai/portfolio/question", payload);
  return data;
};

// Custom hook para usar en tus componentes
export const useAiQuestionFromPortfolio = () => {
  return useMutation({
    mutationFn: fetchAiQuestionFromPortfolio,
  });
};

