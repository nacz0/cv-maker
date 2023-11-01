import { create } from "zustand";
import { CV } from "./schemas/CVSchema";

export interface CVState {
  personal: CV["personalInfo"];
  about: CV["about"];
  education: CV["education"];
  experience: CV["experience"];
  languages: CV["languages"];
  skills: CV["skills"];
  hobbies: CV["hobbies"];
  certificates: CV["certificates"];
  consentForPersonalDataProcessing: CV["consentForPersonalDataProcessing"];
  setPersonal: (personal: CV["personalInfo"]) => void;
  setAbout: (about: CV["about"]) => void;
  setEducation: (education: CV["education"]) => void;
  setExperience: (experience: CV["experience"]) => void;
  setLanguages: (languages: CV["languages"]) => void;
  setSkills: (skills: CV["skills"]) => void;
  setHobbies: (hobbies: CV["hobbies"]) => void;
  setCertificates: (certificates: CV["certificates"]) => void;
  setConsentForPersonalDataProcessing: (
    consentForPersonalDataProcessing: CV["consentForPersonalDataProcessing"]
  ) => void;
}

export const useCVStore = create<CVState>((set) => ({
  personal: {
    name: "",
    surname: "",
    email: "",
    phone: "",
    city: null,
    dateOfBirth: null,
    image: "",
  },
  about: { text: "" },
  education: {
    education: [],
  },
  experience: {
    experience: [],
  },
  languages: {
    languages: [],
  },
  skills: { skills: [] },
  hobbies: { hobbies: [] },
  certificates: {
    certificates: [],
  },
  consentForPersonalDataProcessing: {
    text: "",
    company: "",
  },
  setPersonal: (personal) => set({ personal }),
  setAbout: (about) => set({ about }),
  setEducation: (education) => set({ education }),
  setExperience: (experience) => set({ experience }),
  setLanguages: (languages) => set({ languages }),
  setSkills: (skills) => set({ skills }),
  setHobbies: (hobbies) => set({ hobbies }),
  setCertificates: (certificates) => set({ certificates }),
  setConsentForPersonalDataProcessing: (consentForPersonalDataProcessing) =>
    set({ consentForPersonalDataProcessing }),
}));
