import { UseFormRegister, FieldPath } from "react-hook-form";
import { CV } from "../schemas/CVSchema";

export function TextInput(props: {
  register: UseFormRegister<CV[keyof CV]>;
  name: FieldPath<CV[keyof CV]>;
}) {
  const { register, name } = props;
  return <input {...register(name)} key={name} name={name}></input>;
}
