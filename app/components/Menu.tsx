import {
  IconClose,
  IconCreateToken,
  IconDashBoard,
  IconDocs,
  IconRanking,
} from "@/public/elements/icon";
import { useRouter, usePathname } from "next/navigation";

import React from "react";

interface MenuProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Menu: React.FC<MenuProps> = ({ isOpen, setIsOpen }) => {
  const router = useRouter();
  const pathname = usePathname();

  const checkActive = (path: string) => {
    return pathname === path;
  };

  return (
    isOpen && (
      <div className="fixed top-0 right-0 w-1/2 h-1/2 bg-[#000000E0] z-50 pl-5">
        <div className="flex justify-end mt-6 mr-2">
          <button onClick={() => setIsOpen(!isOpen)}>
            <IconClose />
          </button>
        </div>
        <div
          className="mt-5 flex items-center"
          onClick={() => router.push("/")}
        >
          <IconDashBoard color={checkActive("/") ? "#FFCC00" : "#fff"} />
          <span
            className={`ml-2 text-base font-bold ${
              checkActive("/") ? "text-[#FFCC00]" : "text-[#fff]"
            }`}
          >
            Dashboard
          </span>
        </div>
        <div
          className="mt-5 flex items-center "
          onClick={() => router.push("/ranking")}
        >
          <IconRanking color={checkActive("/ranking") ? "#FFCC00" : "#fff"} />
          <span
            className={`ml-2 text-base font-bold ${
              checkActive("/ranking") ? "text-[#FFCC00]" : "text-[#fff]"
            }`}
          >
            Ranking
          </span>
        </div>
        <div
          className="mt-5 flex items-center"
          onClick={() => router.push("https://x.com/czagents")}
        >
          <IconCreateToken color="#fff" />
          <span className="ml-2 text-base font-bold">Create Agent</span>
        </div>
        <div
          className="mt-5 flex items-center "
          onClick={() => router.push("/docs")}
        >
          <IconDocs color={checkActive("/docs") ? "#FFCC00" : "#fff"} />
          <span
            className={`ml-2 text-base font-bold ${
              checkActive("/docs") ? "text-[#FFCC00]" : "text-[#fff]"
            }`}
          >
            Document
          </span>
        </div>
      </div>
    )
  );
};

export default Menu;
