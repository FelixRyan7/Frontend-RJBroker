import { type UseFormRegister, type FieldErrors, type UseFormWatch } from "react-hook-form";
import type { OnboardingFormData } from "../../../schemas/onboardingSchema";
import InputFloatingRHF from "../../Inputs/FloatingInputRhf";
import BasicButton from "../../Buttons/BasicButton";
import AnimatedButton from "../../Buttons/AnimatedButton";
import { CITIES_BY_COUNTRY, EUROPEAN_COUNTRIES } from "../../Lists/Lists";

interface Props {
  register: UseFormRegister<OnboardingFormData>;
  errors: FieldErrors<OnboardingFormData>;
  watch: UseFormWatch<OnboardingFormData>;
  onNext: () => void
  onBefore: () => void
}

export default function Step2Contact({ register, errors, watch, onNext, onBefore }: Props) {

    const selectedCountry = watch("country");
    
    return (
 <div className="max-w-3xl mx-auto px-6">
      <h2 className="text-2xl font-bold text-dark my-6">
        Contacto y residencia
      </h2>

      <InputFloatingRHF
        id="phone"
        label="Teléfono"
        type="tel"
        register={register("phone")}
        value={watch("phone")}
        error={errors.phone?.message}
      />

      <InputFloatingRHF
        id="addressLine"
        label="Dirección"
        register={register("addressLine")}
        value={watch("addressLine")}
        error={errors.addressLine?.message}
      />


      <InputFloatingRHF
        id="country"
        label="País de residencia"
        register={register("country")}
        value={watch("country")}
        list="countries"
        error={errors.country?.message}
      />
      <datalist id="countries">
        {EUROPEAN_COUNTRIES.map((country) => (
            <option key={country} value={country} />
        ))}
      </datalist>

      <InputFloatingRHF
        id="city"
        label="Ciudad"
        type="select"
        register={register("city")}
        value={watch("city")}
        options={selectedCountry ? CITIES_BY_COUNTRY[selectedCountry] : []}
        disabled={!selectedCountry}
        error={errors.city?.message}
      />


      <InputFloatingRHF
        id="postalCode"
        label="Código postal"
        register={register("postalCode")}
        value={watch("postalCode")}
        error={errors.postalCode?.message}
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