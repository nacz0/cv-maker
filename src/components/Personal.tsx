import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useCVStore } from "../cvStore";
import { CV, personalInfoSchema } from "../schemas/CVSchema";
import { TextInput } from "./Inputs";
export function Personal() {
  const defaultValues = useCVStore((state) => state.personal);
  const setPersonal = useCVStore((state) => state.setPersonal);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<CV["personalInfo"]>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: defaultValues,
  });
  const redirect = useNavigate();
  console.log(errors);
  return (
    <form
      onSubmit={handleSubmit((data) => {
        console.log(data);
        setPersonal(data);
        redirect("/creator/education");
      })}
    >
      <TextInput register={register} name={"name"} text={"Name"} />
      <TextInput register={register} name={"surname"} text={"Surname"} />
      <TextInput register={register} name={"email"} text={"Email"} />
      <TextInput register={register} name={"phone"} text={"Phone"} />
      <TextInput register={register} name={"city"} text={"City"} />

      <input
        type="date"
        {...register("dateOfBirth", { valueAsDate: true })}
        key={"country"}
        name="dateOfBirth"
      ></input>
      <label htmlFor="dateOfBirth">Date of Birth</label>
      <button type="submit">Submit</button>
    </form>
  );
}
