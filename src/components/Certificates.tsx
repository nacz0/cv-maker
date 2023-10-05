import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useCVStore } from "../cvStore";
import { CV, certificateSchema } from "../schemas/CVSchema";
import { MonthInput, TextInput } from "./Inputs";

export function Certificates() {
  const defaultValues = useCVStore((state) => state.certificates);
  const setExperience = useCVStore((state) => state.setCertificates);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CV["certificates"]>({
    resolver: zodResolver(certificateSchema),
    defaultValues: defaultValues,
  });
  const { fields } = useFieldArray({
    control,
    name: "certificates",
  });

  const redirect = useNavigate();
  return (
    <form
      onSubmit={handleSubmit((data) => {
        console.log(data);
        setExperience(data);
        redirect("/creator/languages");
      })}
    >
      {fields.map((item, index) => {
        return (
          <div key={item.id}>
            <TextInput
              register={register}
              name={`certificates.${index}.name`}
              text={"Name"}
            />
            <TextInput
              register={register}
              name={`certificates.${index}.organization`}
              text={"Organization"}
            />
            <MonthInput
              register={register}
              name={`certificates.${index}.date`}
              text={"Date"}
            />
            <TextInput
              register={register}
              name={`certificates.${index}.description`}
              text={"Description"}
            />
          </div>
        );
      })}
      <button type="submit">Submit</button>
    </form>
  );
}
