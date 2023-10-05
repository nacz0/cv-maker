import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useCVStore } from "../cvStore";
import { CV, languageSchema, level } from "../schemas/CVSchema";
import { TextInput } from "./Inputs";

export function Languages() {
  const defaultValues = useCVStore((state) => state.languages);
  const setExperience = useCVStore((state) => state.setLanguages);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CV["languages"]>({
    resolver: zodResolver(languageSchema),
    defaultValues: defaultValues,
  });
  const { fields, append } = useFieldArray({
    control,
    name: "languages",
  });

  const redirect = useNavigate();
  return (
    <form
      onSubmit={handleSubmit((data) => {
        console.log(data);
        setExperience(data);
        redirect("/creator/skills&hobbies");
      })}
    >
      {fields.map((item, index) => {
        return (
          <div key={item.id}>
            <TextInput
              register={register}
              name={`languages.${index}.language`}
              text={"Name"}
            />
            <select
              {...register(`languages.${index}.level`)}
              key={`languages.${index}.level`}
              name={`languages.${index}.level`}
            >
              {level.options.map((item) => {
                return (
                  <option key={item} value={item}>
                    {item}
                  </option>
                );
              })}
            </select>
          </div>
        );
      })}
      <button type="submit">Submit</button>
      <button
        onClick={() =>
          append({
            language: "",
            level: "średniozaawansowany",
          })
        }
      >
        Append
      </button>
    </form>
  );
}
