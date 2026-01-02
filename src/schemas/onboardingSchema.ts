import { z } from "zod";
import { isAdult } from "../helpers/date";

export const OnboardingSchema = z.object({
    fullName: z.string().min(2, "Debe introducir tu nombre completo"),
    dateOfBirth: z.string().refine(isAdult, "Debes ser mayor de 18 años"),
    nationality: z.string().min(2, "Selecciona la nacionalidad"),
    phone: z.string().min(5, "Teléfono inválido").max(30).optional(),
    addressLine: z.string().min(3, "Dirección incompleta"),
    city: z.string().min(2, "Ciudad requerida"),
    postalCode: z.string().min(2, "Código postal"),
    country: z.string().min(2, "País de residencia requerido"),
    idNumber: z.string().min(3, "Documento requerido"),
    employmentStatus: z.enum(["EMPLOYED", "SELF_EMPLOYED", "STUDENT", "UNEMPLOYED", "OTHER"]),
    incomeRange: z.enum(["<20000", "20000-50000", "50000-100000", ">100000", "PREF_NO_SAY"]),
    investmentExperience: z.enum(["NONE", "BASIC", "INTERMEDIATE", "ADVANCED"]),
    riskTolerance: z.enum(["LOW", "MEDIUM", "HIGH"]),
    baseCurrency: z.string().min(3).max(3, "Código ISO (EUR, USD)"),
})

export type OnboardingFormData = z.infer<typeof OnboardingSchema>;