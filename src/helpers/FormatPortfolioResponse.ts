import type { AiPortfolioAnalysisResponse } from "../@types/ai";

// helpers o arriba del componente
export const formatPortfolioResponse = (res: AiPortfolioAnalysisResponse) => {
  const { summary, composition, risksAndBenefits, educationalNotes } = res;
  let text = summary + "\n\n";

  if (composition) {
    text += "Composición:\n";
    if (composition.byType) {
      text += Object.entries(composition.byType)
        .map(([k, v]) => `- Tipo: ${k} ${v}%`)
        .join("\n") + "\n";
    }
    if (composition.bySector) {
      text += Object.entries(composition.bySector)
        .map(([k, v]) => `- Sector: ${k} ${v}%`)
        .join("\n") + "\n";
    }
    if (composition.byGeography) {
      text += Object.entries(composition.byGeography)
        .map(([k, v]) => `- Geografía: ${k} ${v}%`)
        .join("\n") + "\n";
    }
  }

  if (risksAndBenefits) {
    text += "\nRiesgos y beneficios:\n";
    text += Object.entries(risksAndBenefits)
      .map(([k, v]) => `- ${k}: ${v}`)
      .join("\n") + "\n";
  }

  if (educationalNotes && educationalNotes.length) {
    text += "\nNotas importantes:\n";
    text += educationalNotes.map((note) => `- ${note}`).join("\n");
  }

  return text;
};
