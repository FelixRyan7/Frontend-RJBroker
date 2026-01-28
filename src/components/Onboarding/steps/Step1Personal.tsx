import type { UseFormRegister, FieldErrors, UseFormWatch } from "react-hook-form";
import type { OnboardingFormData } from "../../../schemas/onboardingSchema";
import InputFloatingRHF from "../../Inputs/FloatingInputRhf";
import BasicButton from "../../Buttons/BasicButton";
import { EUROPEAN_NATIONALITIES } from "../../Lists/Lists";

interface Props {
  register: UseFormRegister<OnboardingFormData>;
  errors: FieldErrors<OnboardingFormData>;
  watch: UseFormWatch<OnboardingFormData>;
  onNext: () => void
}

export default function Step1Personal({ register, errors, watch, onNext }: Props) {
  return (
    <div className="max-w-3xl mx-auto px-6">
      <h2 className="text-2xl font-bold text-dark mb-6">
        Datos personales
      </h2>

      <InputFloatingRHF
        id="fullName"
        label="Nombre completo"
        register={register("fullName")}
        value={watch("fullName")}
        error={errors.fullName?.message}
      />

      <InputFloatingRHF
        id="dateOfBirth"
        label="Fecha de nacimiento"
        type="date"
        register={register("dateOfBirth")}
        value={watch("dateOfBirth")}
        error={errors.dateOfBirth?.message}
      />

      <InputFloatingRHF
        id="nationality"
        label="Nacionalidad"
        register={register("nationality")}
        value={watch("nationality")}
        list="nationalities"
        error={errors.nationality?.message}
      />

      <datalist id="nationalities">
        {EUROPEAN_NATIONALITIES.map((country) => (
        <option key={country} value={country} />
        ))}
      </datalist>

      <InputFloatingRHF
        id="id_number"
        label="Numero identificacion"
        register={register("idNumber")}
        value={watch("idNumber")}
        error={errors.idNumber?.message}
      />

      <BasicButton
        onClick={onNext}
        color="dark"
        className="w-full md:w-1/3 md:ml-auto"
      >
        Next Step
      </BasicButton>
    </div>
  );
}
