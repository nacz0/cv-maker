import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useCVStore } from "../cvStore";
import { CV, experienceSchema } from "../schemas/CVSchema";
import { MonthInput, TextInput } from "./Inputs";

export function Experience() {
  const defaultValues = useCVStore((state) => state.experience);
  const setExperience = useCVStore((state) => state.setExperience);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CV["experience"]>({
    resolver: zodResolver(experienceSchema),
    defaultValues: defaultValues,
  });
  const { fields } = useFieldArray({
    control,
    name: "experience",
  });

  const redirect = useNavigate();
  return (
    <form
      onSubmit={handleSubmit((data) => {
        console.log(data);
        setExperience(data);
        redirect("/creator/certificates");
      })}
    >
      {fields.map((item, index) => {
        return (
          <div key={item.id}>
            <TextInput
              register={register}
              name={`experience.${index}.company`}
              text={"Company"}
            />
            <TextInput
              register={register}
              name={`experience.${index}.position`}
              text={"Position"}
            />
            <MonthInput
              register={register}
              name={`experience.${index}.startDate`}
              text={"Start Date"}
            />
            <MonthInput
              register={register}
              name={`experience.${index}.endDate`}
              text={"End Date"}
            />
            <TextInput
              register={register}
              name={`experience.${index}.description`}
              text={"Description"}
            />
            <TextInput
              register={register}
              name={`experience.${index}.localization`}
              text={"Localization"}
            />
          </div>
        );
      })}
      <button type="submit">Submit</button>
    </form>
  );
}
