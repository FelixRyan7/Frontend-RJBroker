import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { OnboardingSchema, type OnboardingFormData } from "../../schemas/onboardingSchema";
import Step1Personal from "./steps/Step1Personal";
import ProgressBar from "./ProgressBar";
import { useContext, useState } from "react";
import Step2Contact from "./steps/Step2Contact";
import Step3Identity from "./steps/Step3Identity";
import Step4Financial from "./steps/Step4Financial";
import type { UserProfileResponse } from "../../@types/userProfile";
import api from "../../api/axios";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";


export default function MultiStepForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    trigger
  } = useForm<OnboardingFormData>({
    resolver: zodResolver(OnboardingSchema),
    mode: "onBlur",
  });

  const [currentStep, setCurrentStep] = useState(1);
  const token = localStorage.getItem("jwtToken")

 const { setUser } = useContext(AuthContext);

 const navigate = useNavigate();
  
  const handleNextStep = async () => {
  const isStep1Valid = await trigger(["fullName", "dateOfBirth", "nationality"]);
 
  if (isStep1Valid && currentStep === 1) {
    setCurrentStep(currentStep + 1);
  }
  if (currentStep === 2) {
     const isStep2Valid = await trigger(["phone", "addressLine", "city", "postalCode", "country"]);
     if(isStep2Valid){
      setCurrentStep(currentStep + 1);
     }
  }
  if (currentStep === 3) {
     const isStep3Valid = await trigger(["employmentStatus", "incomeRange"]);
     if(isStep3Valid){
      setCurrentStep(currentStep + 1);
     }
  }

};

const onSubmit = async (data: OnboardingFormData) => {
  console.log("FORM DATA FINAL:", data);
  try{
    const response = await api.post<UserProfileResponse>("/api/user-profile",data, {
  headers: {
    Authorization: `Bearer ${token}`,
    
  },})
    setUser((prev:any) => ({
      ...prev,
      fullName: response.data.fullName,
      userLevel: response.data.userLevel,
      hasPersonalData: true,
    }));
    console.log(response.data)
    navigate("/dashboard")

  } catch(error: any){
      console.log(error)
  }

};

const handlePreviousStep = async () => {
    setCurrentStep(currentStep - 1);
};

  return (
    <>
    <form onSubmit={handleSubmit(onSubmit)}>
    <div className="py-10">
      <ProgressBar step={currentStep} total={4} />

      {currentStep === 1 && (
        <Step1Personal
          register={register}
          watch={watch}
          errors={errors}
          onNext={handleNextStep} 
        />
      )}

      {currentStep === 2 && (
        <Step2Contact
          register={register}
          watch={watch}
          errors={errors}
          onNext={handleNextStep}
          onBefore={handlePreviousStep}
        />
      )}

      {currentStep === 3 && (
        <Step3Identity
          register={register}
          watch={watch}
          errors={errors}
          onNext={handleNextStep}
          onBefore={handlePreviousStep}
        />
      )}

      {currentStep === 4 && (
        <Step4Financial
          register={register}
          watch={watch}
          errors={errors}
          onBefore={handlePreviousStep}
        />
      )}
    </div>
    </form>
    </>
  );
}

