import { useState } from "react";
import { Outlet } from "react-router-dom";
import MenuHamburgerIcon from "../svgs/menuHamburger";

export function Creator() {
  return (
    <main className="f-screen h-screen flex ">
      <Menu />
      <div className=" w-1/2 flex justify-center items-center">
        <Outlet />
      </div>
    </main>
  );
}

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
      </div>
    </div>
  );
}
