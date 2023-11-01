import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useCVStore } from "../cvStore";
import { CV, hobbiesSchema, skillsSchema } from "../schemas/CVSchema";
import { TextInput } from "./Inputs";
type skillsAndHobbies = Pick<CV, "skills" | "hobbies">;

export function SkillsAndHobbies() {
  const schema = z.object({
    skills: skillsSchema,
    hobbies: hobbiesSchema,
  });
  const defaultValues = {
    skills: useCVStore((state) => state.skills),
    hobbies: useCVStore((state) => state.hobbies),
  };
  const setSkills = useCVStore((state) => state.setSkills);
  const setHobbies = useCVStore((state) => state.setHobbies);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<skillsAndHobbies>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues,
  });
  console.log(errors);
  const skillsFields = useFieldArray({
    control,
    name: "skills.skills",
  });

  const hobbiesFields = useFieldArray({
    control,
    name: "hobbies.hobbies",
  });
  const redirect = useNavigate();
  return (
    <form
      onSubmit={handleSubmit((data) => {
        console.log(data);
        setSkills(data.skills);
        setHobbies(data.hobbies);

        redirect("/creator/about&consent");
      })}
    >
      {skillsFields.fields.map((item, index) => {
        return (
          <div key={item.id}>
            <TextInput
              register={register}
              name={`skills.skills.${index}.text`}
              text={"Skills"}
            />
          </div>
        );
      })}

      <button
        type="button"
        onClick={() =>
          skillsFields.append({
            text: "",
          })
        }
      >
        Append skills
      </button>
      {hobbiesFields.fields.map((item, index) => {
        return (
          <div key={item.id}>
            <TextInput
              register={register}
              name={`hobbies.hobbies.${index}.text`}
              text={"Hobbies"}
            />
          </div>
        );
      })}

      <button
        type="button"
        onClick={() =>
          hobbiesFields.append({
            text: "",
          })
        }
      >
        Append Hobbies
      </button>
      <button type="submit">Submit</button>
    </form>
  );
}
