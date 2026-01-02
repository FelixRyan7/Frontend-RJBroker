import type { UseFormRegister, FieldErrors, UseFormWatch } from "react-hook-form";
import type { OnboardingFormData } from "../../../schemas/onboardingSchema";
import InputFloatingRHF from "../../Inputs/FloatingInputRhf";
import BasicButton from "../../Buttons/BasicButton";
import AnimatedButton from "../../Buttons/AnimatedButton";
import { EMPLOYMENT_STATUS_OPTIONS, INCOME_RANGE_OPTIONS } from "../../Lists/Lists";

interface Props {
  register: UseFormRegister<OnboardingFormData>;
  errors: FieldErrors<OnboardingFormData>;
  watch: UseFormWatch<OnboardingFormData>;
  onNext: () => void
  onBefore: () => void
}

export default function Step3Identity({ register, errors, watch, onNext, onBefore }: Props) {
  return (
    <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-dark my-6">
            Situacion Laboral
          </h2>
    
          <InputFloatingRHF
            id="employmentStatus"
            label="Situacion Laboral"
            type="select"
            options={EMPLOYMENT_STATUS_OPTIONS}
            register={register("employmentStatus")}
            value={watch("employmentStatus")}
            error={errors.employmentStatus?.message}
          />
    
          <InputFloatingRHF
            id="incomeRange"
            label="Dirección"
            type="select"
            options={INCOME_RANGE_OPTIONS}
            register={register("incomeRange")}
            value={watch("incomeRange")}
            error={errors.incomeRange?.message}
          />
    
          <BasicButton
            onClick={onNext}
            color="dark"
            className="w-full md:w-1/3 md:ml-auto mt-4"
          >
            Next Step
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
