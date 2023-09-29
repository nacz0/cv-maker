import { z } from "zod";

const monthRegex = /^\d{4}-(0[1-9]|1[0-2])$/; // yyyy-mm
const phoneRegex = /^(\+\d{2}\s\d{3}\s\d{3}\s\d{3}|\d{3}\s\d{3}\s\d{3}|\d{9})$/; // "+xx xxx xxx xxx", "xxx xxx xxx" and "xxxxxxxxx" are valid phone numbers
const personalInfoSchema = z.object({
  image: z.string().nullish(), //base64
  name: z.string().nonempty(),
  surname: z.string().nonempty(),
  email: z.string().email(),
  phone: z.string().regex(phoneRegex, {
    message: "Invalid phone number",
  }),
  city: z.string().nonempty().nullish(),
  dateOfBirth: z.date().nullish(),
});

const educationSchema = z.object({
  level: z.string().nonempty(),
  school: z.string().nonempty(),
  specialization: z.string().nonempty(),
  startDate: z.string().regex(monthRegex, {
    message: "Invalid date",
  }),
  endDate: z
    .string()
    .regex(monthRegex, {
      message: "Invalid date",
    })
    .nullish(),
  description: z.string().nullish(),
});

const experienceSchema = z.object({
  company: z.string().nonempty(),
  position: z.string().nonempty(),
  localization: z.string().nonempty(),
  startDate: z.string().regex(monthRegex, {
    message: "Invalid date",
  }),
  endDate: z
    .string()
    .regex(monthRegex, {
      message: "Invalid date",
    })
    .nullish(),
  description: z.string().nullish(),
});

const level = z.enum([
  "podstawowy",
  "średni",
  "średniozaawansowany",
  "zaawansowany",
  "ojczysty",
]);

const languageSchema = z.object({
  language: z.string().nonempty(),
  level: level,
});

const consentForPersonalDataProcessingSchema = z
  .object({
    text: z.string().optional(),
    company: z.string().nonempty(),
  })
  .superRefine(({ company, text }, ctx) => {
    if (
      company !== undefined &&
      company !== "" &&
      text !== undefined &&
      text !== ""
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "This shouldn't be possible",
        path: [],
      });
    }
  });

const certificateSchema = z.object({
  name: z.string().nonempty(),
  organization: z.string().nonempty(),
  date: z.string().regex(monthRegex, {
    message: "Invalid date",
  }),
  description: z.string().nullish(),
});

export const cvSchema = z.object({
  personalInfo: personalInfoSchema,
  about: z.string().max(1000).nullish(),
  education: z.array(educationSchema),
  experience: z.array(experienceSchema),
  languages: z.array(languageSchema),
  skills: z.array(z.string().nonempty()),
  hobbys: z.array(z.string().nonempty()),
  certificates: z.array(certificateSchema),
  consentForPersonalDataProcessing: consentForPersonalDataProcessingSchema,
});
