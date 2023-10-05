import { FieldPath, FieldValues, UseFormRegister } from "react-hook-form";

export function TextInput<T extends FieldValues>(props: {
  register: UseFormRegister<T>;
  name: FieldPath<T>;
  text: string;
}) {
  const { register, name, text } = props;
  return (
    <div className="flex flex-col justify-center items-center">
      <label htmlFor={name}>{text}</label>
      <input {...register(name)} key={name} name={name}></input>
    </div>
  );
}

export function DateInput<T extends FieldValues>(props: {
  register: UseFormRegister<T>;
  name: FieldPath<T>;
  text: string;
}) {
  const { register, name, text } = props;
  return (
    <div className="flex flex-col justify-center items-center">
      <label htmlFor={name}>{text}</label>
      <input type="date" {...register(name)} key={name} name={name}></input>
    </div>
  );
}

export function MonthInput<T extends FieldValues>(props: {
  register: UseFormRegister<T>;
  name: FieldPath<T>;
  text: string;
}) {
  const { register, name, text } = props;
  return (
    <div className="flex flex-col justify-center items-center">
      <label htmlFor={name}>{text}</label>
      <input type="month" {...register(name)} key={name} name={name}></input>
    </div>
  );
}
