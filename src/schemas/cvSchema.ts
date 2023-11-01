import { z } from "zod";

const monthRegex = /^\d{4}-(0[1-9]|1[0-2])$/; // yyyy-mm
const phoneRegex = /^(\+\d{2}\s\d{3}\s\d{3}\s\d{3}|\d{3}\s\d{3}\s\d{3}|\d{9})$/; // "+xx xxx xxx xxx", "xxx xxx xxx" and "xxxxxxxxx" are valid phone numbers
export const personalInfoSchema = z.object({
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

export const educationSchema = z.object({
  education: z.array(
    z.object({
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
    })
  ),
});

export const experienceSchema = z.object({
  experience: z.array(
    z.object({
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
    })
  ),
});

export const level = z.enum([
  "podstawowy",
  "średni",
  "średniozaawansowany",
  "zaawansowany",
  "ojczysty",
]);

export const languageSchema = z.object({
  languages: z.array(
    z.object({
      language: z.string().nonempty(),
      level: level,
    })
  ),
});

export const consentForPersonalDataProcessingSchema = z
  .object({
    text: z.string().optional(),
    company: z.string().optional(),
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

export const certificateSchema = z.object({
  certificates: z.array(
    z.object({
      name: z.string().nonempty(),
      organization: z.string().nonempty(),
      date: z.string().regex(monthRegex, {
        message: "Invalid date",
      }),
      description: z.string().nullish(),
    })
  ),
});

export const skillsSchema = z.object({
  skills: z.array(z.object({ text: z.string().nonempty() })),
});
export const hobbiesSchema = z.object({
  hobbies: z.array(z.object({ text: z.string().nonempty() })),
});

export const aboutSchema = z.object({
  text: z.string().max(1000).nullish(),
});
export const CVSchema = z.object({
  personalInfo: personalInfoSchema,
  education: educationSchema,
  experience: experienceSchema,
  certificates: certificateSchema,
  languages: languageSchema,
  skills: skillsSchema,
  hobbies: hobbiesSchema,
  about: aboutSchema,
  consentForPersonalDataProcessing: consentForPersonalDataProcessingSchema,
});

export type CV = z.infer<typeof CVSchema>;
