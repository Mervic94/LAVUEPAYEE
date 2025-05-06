
// src/schemas/registerSchemas.ts existant, à modifier pour retirer captchaToken

import { z } from "zod";

// Sous-schemas réutilisables
const nameSchema = z
  .string()
  .min(2, "Le nom doit comporter au moins 2 caractères.")
  .max(50, "Le nom est trop long.");

const usernameSchema = z
  .string()
  .min(3, "Le nom d'utilisateur doit comporter au moins 3 caractères.")
  .max(20, "Le nom d'utilisateur ne doit pas dépasser 20 caractères.")
  .regex(/^[a-zA-Z0-9_-]+$/, "Le nom d'utilisateur ne peut contenir que des lettres, chiffres, tirets et underscores.");

const passwordSchema = z
  .string()
  .min(8, "Le mot de passe doit comporter au moins 8 caractères.")
  .max(100, "Le mot de passe ne doit pas dépasser 100 caractères.")
  .regex(/[A-Z]/, "Le mot de passe doit contenir au moins une lettre majuscule.")
  .regex(/[a-z]/, "Le mot de passe doit contenir au moins une lettre minuscule.")
  .regex(/[0-9]/, "Le mot de passe doit contenir au moins un chiffre.");

const phoneSchema = z
  .string()
  .min(10, "Veuillez entrer un numéro de téléphone valide.");

const emailSchema = z
  .string()
  .email("Veuillez entrer une adresse email valide.");

const daySchema = z
  .string()
  .min(1, "Jour requis")
  .max(2, "Format de jour invalide")
  .refine((val) => !isNaN(Number(val)) && Number(val) >= 1 && Number(val) <= 31, {
    message: "Jour invalide (1-31)",
  });

const monthSchema = z
  .string()
  .min(1, "Mois requis")
  .max(2, "Format de mois invalide")
  .refine((val) => !isNaN(Number(val)) && Number(val) >= 1 && Number(val) <= 12, {
    message: "Mois invalide (1-12)",
  });

const yearSchema = z
  .string()
  .min(4, "Année requise (YYYY)")
  .max(4, "Format d'année invalide")
  .refine((val) => {
    const year = Number(val);
    const currentYear = new Date().getFullYear();
    return !isNaN(year) && year >= 1900 && year <= currentYear - 13;
  }, {
    message: "Vous devez avoir au moins 13 ans",
  });

const accountTypeSchema = z
  .enum(["consumer", "advertiser", "admin"], {
    required_error: "Type de compte requis",
  });

const termsSchema = z
  .boolean()
  .refine((val) => val === true, {
    message: "Vous devez accepter les conditions d'utilisation",
  });

// Schema pour l'inscription par email
export const emailRegisterSchema = z
  .object({
    firstName: nameSchema,
    lastName: nameSchema,
    username: usernameSchema,
    email: emailSchema,
    phone: z.string().optional(),
    password: passwordSchema,
    sponsorUsername: z.string().optional(),
    birthDay: daySchema,
    birthMonth: monthSchema,
    birthYear: yearSchema,
    accountType: accountTypeSchema,
    termsAccepted: termsSchema,
  });

export type EmailRegisterFormValues = z.infer<typeof emailRegisterSchema>;

// Schema pour l'inscription par téléphone
export const phoneRegisterSchema = z
  .object({
    firstName: nameSchema,
    lastName: nameSchema,
    username: usernameSchema,
    email: z.string().optional(),
    phone: phoneSchema,
    password: passwordSchema,
    sponsorUsername: z.string().optional(),
    birthDay: daySchema,
    birthMonth: monthSchema,
    birthYear: yearSchema,
    accountType: accountTypeSchema,
    termsAccepted: termsSchema,
  });

export type PhoneRegisterFormValues = z.infer<typeof phoneRegisterSchema>;
