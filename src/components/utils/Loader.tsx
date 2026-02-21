import { BeatLoader, PulseLoader  } from "react-spinners";
import type { CSSProperties } from "react";

type LoaderProps = {
  isLoading?: boolean;
  color: LoaderColor;
};
type LoaderColor = "white" | "primary" | "accent";

const colorMap: Record<LoaderColor, string> = {
  white: "#ffffff",
  primary: "#1B98E0", 
  accent: "#f59e0b", 
};

export const Loader = ({ isLoading, color }: LoaderProps) => {

  if (!isLoading) return null;

  return (
    <PulseLoader 
      color={colorMap[color]}     // blanco
      size={10}            // tamaño
      
    />
  );
};