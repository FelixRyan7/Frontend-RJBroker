import type { UseFormRegister, FieldErrors, UseFormWatch } from "react-hook-form";
import type { OnboardingFormData } from "../../../schemas/onboardingSchema";
import InputFloatingRHF from "../../Inputs/FloatingInputRhf";
import BasicButton from "../../Buttons/BasicButton";
import AnimatedButton from "../../Buttons/AnimatedButton";
import { BASE_CURRENCY_OPTIONS, INVESTMENT_EXPERIENCE_OPTIONS, RISK_TOLERANCE_OPTIONS } from "../../Lists/Lists";

interface Props {
  register: UseFormRegister<OnboardingFormData>;
  errors: FieldErrors<OnboardingFormData>;
  watch: UseFormWatch<OnboardingFormData>;
  onBefore: () => void
}

export default function Step4Financial({ register, errors, watch, onBefore }: Props) {
  return (
    <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-dark my-6">
            Perfil de inversor
          </h2>
    
          <InputFloatingRHF
            id="investmentExperience"
            label="Experiencia Inversora"
            type="select"
            options={INVESTMENT_EXPERIENCE_OPTIONS}
            register={register("investmentExperience")}
            value={watch("investmentExperience")}
            error={errors.investmentExperience?.message}
          />
    
          <InputFloatingRHF
            id="riskTolerance"
            label="Tolerancia al Riesgo"
            type="select"
            options={RISK_TOLERANCE_OPTIONS}
            register={register("riskTolerance")}
            value={watch("riskTolerance")}
            error={errors.riskTolerance?.message}
          />

          <InputFloatingRHF
            id="baseCurrency"
            label="Moneda Base"
            type="select"
            options={BASE_CURRENCY_OPTIONS}
            register={register("baseCurrency")}
            value={watch("baseCurrency")}
            error={errors.baseCurrency?.message}
          />
    
          <BasicButton
            type="submit"
            color="dark"
            className="w-full md:w-1/3 md:ml-auto mt-4"
          > 
             Enviar
          </BasicButton>
    
          <AnimatedButton
            onClick={onBefore}
            className="w-full md:w-1/3 md:ml-auto mt-4"
            color="dark"
          >
            previous Step
          </AnimatedButton>
        </div>
  )
}
