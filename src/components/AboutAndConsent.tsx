import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useCVStore } from "../cvStore";
import {
  CV,
  aboutSchema,
  consentForPersonalDataProcessingSchema,
} from "../schemas/CVSchema";
import { TextInput } from "./Inputs";
type AboutAndConsent = Pick<CV, "about" | "consentForPersonalDataProcessing">;
export function AboutAndConsent() {
  const schema = z.object({
    about: aboutSchema,
    consentForPersonalDataProcessing: consentForPersonalDataProcessingSchema,
  });
  const defaultValues = {
    about: useCVStore((state) => state.about),
    consentForPersonalDataProcessing: useCVStore(
      (state) => state.consentForPersonalDataProcessing
    ),
  };
  const setAbout = useCVStore((state) => state.setAbout);
  const setConsentForPersonalDataProcessing = useCVStore(
    (state) => state.setConsentForPersonalDataProcessing
  );
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<AboutAndConsent>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues,
  });
  console.log(errors);
  const redirect = useNavigate();
  return (
    <form
      onSubmit={handleSubmit((data) => {
        console.log(data);
        setAbout(data.about);
        setConsentForPersonalDataProcessing(
          data.consentForPersonalDataProcessing
        );
        redirect("/creator/preview");
      })}
    >
      <TextInput register={register} name={`about.text`} text={"About you"} />
      <TextInput
        register={register}
        name={`consentForPersonalDataProcessing.text`}
        text={"Consent for personal data processing"}
      />

      <button type="submit">Submit</button>
    </form>
  );
}
