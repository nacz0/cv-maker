import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useCVStore } from "../cvStore";
import { CV, educationSchema } from "../schemas/CVSchema";
import { MonthInput, TextInput } from "./Inputs";

export function Education() {
  const defaultValues = useCVStore((state) => state.education);
  const setEducation = useCVStore((state) => state.setEducation);
  const {
    register,
    handleSubmit,
    getValues,
    control,
    watch,
    formState: { errors },
  } = useForm<CV["education"]>({
    resolver: zodResolver(educationSchema),
    defaultValues: defaultValues,
  });
  const { fields, append } = useFieldArray({
    control,
    name: "education",
  });
  console.log(errors);
  console.log(watch());
  const redirect = useNavigate();
  return (
    <form
      onSubmit={handleSubmit((data) => {
        console.log(data);
        setEducation(data);
        console.log("submit");
        redirect("/creator/experience");
      })}
    >
      {fields.map((item, index) => {
        return (
          <div key={item.id}>
            <TextInput
              register={register}
              name={`education.${index}.level`}
              text={"Level"}
            />
            <TextInput
              register={register}
              name={`education.${index}.school`}
              text={"School"}
            />
            <TextInput
              register={register}
              name={`education.${index}.specialization`}
              text={"Specialization"}
            />
            <TextInput
              register={register}
              name={`education.${index}.description`}
              text={"Description"}
            />
            <MonthInput
              register={register}
              name={`education.${index}.startDate`}
              text={"Start"}
            />
            <MonthInput
              register={register}
              name={`education.${index}.endDate`}
              text={"End"}
            />
          </div>
        );
      })}
      <button type="submit">Submit</button>
      <button
        onClick={() =>
          append({
            level: "",
            school: "",
            specialization: "",
            description: "",
            startDate: "",
            endDate: "",
          })
        }
      >
        Append
      </button>
    </form>
  );
}
