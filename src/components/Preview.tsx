import { useCVStore } from "../cvStore";
import { CV } from "./CV";

export function Preview() {
  const info = useCVStore((state) => state);
  console.log(info);
  return (
    <div>
      <CV info={info} />
    </div>
  );
}
