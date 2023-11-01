import { useState } from "react";
import { Outlet } from "react-router-dom";
import { useCVStore } from "../cvStore";
import MenuHamburgerIcon from "../svgs/menuHamburger";
import { CV } from "./CV";

export function Creator() {
  return (
    <main className="f-screen h-screen flex ">
      <Menu />
      <div className=" w-1/2 flex justify-center items-center">
        <Outlet />
      </div>
      <div className="w-1/4">
        <CVPreview />
      </div>
    </main>
  );
}

function CVPreview() {
  const info = useCVStore((state) => state);
  console.log(info);
  return (
    <div>
      <CV info={info} />
    </div>
  );
}
const sections = [
  { name: "Personal", address: "personal" },
  { name: "Education", address: "education" },
  { name: "Experience", address: "experience" },
  { name: "Certificates", address: "certificates" },
  { name: "Languages", address: "languages" },
  { name: "Skills & Hobbies", address: "skills&hobbies" },
  { name: "About & Consent", address: "about&consent" },
  { name: "Preview", address: "preview" },
];
function Menu() {
  const [open, setOpen] = useState(true);
  return (
    <div className="w-1/4">
      <div
        className={`${
          open ? "w-full" : "w-1/4"
        } bg-blue-400 h-full transition-all duration-500`}
      >
        <div className="flex items-end justify-end p-3">
          <button
            onClick={() => setOpen(!open)}
            className="bg-white p-2 rounded-full"
          >
            <MenuHamburgerIcon />
          </button>
        </div>
        <div className="flex flex-col items-center justify-center h-full">
          {sections.map((section) => {
            return (
              <div
                key={section.address}
                className="w-full flex justify-center items-center h-16"
              >
                <a
                  href={`/creator/${section.address}`}
                  className="text-white text-2xl"
                >
                  {section.name}
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
