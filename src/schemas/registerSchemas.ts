
import * as z from "zod";

const commonSchema = {
  firstName: z.string().min(2, { message: "Prénom requis" }),
  lastName: z.string().min(2, { message: "Nom de famille requis" }),
  username: z.string().min(3, { message: "Nom d'utilisateur requis (min. 3 caractères)" })
    .regex(/^[a-zA-Z0-9._-]+$/, { message: "Nom d'utilisateur invalide" }),
  sponsorUsername: z.string().optional(),
  password: z
    .string()
    .min(8, { message: "Le mot de passe doit contenir au moins 8 caractères" })
    .regex(/[A-Z]/, { message: "Le mot de passe doit contenir au moins une majuscule" })
    .regex(/[0-9]/, { message: "Le mot de passe doit contenir au moins un chiffre" }),
  birthDay: z.string().min(1, { message: "Jour requis" }),
  birthMonth: z.string().min(1, { message: "Mois requis" }),
  birthYear: z.string().min(4, { message: "Année requise" }),
  accountType: z.enum(["consumer", "advertiser"], {
    required_error: "Veuillez sélectionner un type de compte",
  }),
  termsAccepted: z.boolean().refine(val => val === true, {
    message: "Vous devez accepter les conditions d'utilisation",
  }),
  captchaToken: z.string().min(1, { message: "Veuillez compléter le captcha" }),
};

export const emailRegisterSchema = z.object({
  ...commonSchema,
  email: z.string().email({ message: "Adresse email invalide" }),
  phone: z.string().optional(),
});

export const phoneRegisterSchema = z.object({
  ...commonSchema,
  phone: z.string().min(6, { message: "Numéro de téléphone invalide" }),
  email: z.string().optional(),
});

export type EmailRegisterFormValues = z.infer<typeof emailRegisterSchema>;
export type PhoneRegisterFormValues = z.infer<typeof phoneRegisterSchema>;
