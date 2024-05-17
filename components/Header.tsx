"use client"
import React, { useEffect, useState } from "react";
import MenuIcon from "./MenuIcon";
import { headerItems } from "@/constants/headerItems";
import Image from "next/image";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-20 ${isScrolled ? 'bg-white text-black' : 'bg-transparent text-white'}`} >
      <nav className="flex items-center justify-between px-5 py-3 text-black uppercase">
        <MenuIcon headerItems={headerItems} isScrolled={isScrolled} />

        <div className="flex justify-center items-center lg:justify-start lg:flex-none transition duration-300 hover:text-orange-500">
          <Image src="/company/logo/logo.svg" alt="logo" className="w-20" width={20} height={20} />
        </div>

        <div className="hidden lg:flex lg:flex-grow lg:justify-center">
          <ul className="flex items-center space-x-6">
            {headerItems.map((item, index) => (
              <li
                key={index}
                className={`navItem cursor-pointer transition duration-300 ${isScrolled ? 'text-black hover:text-orange-500' : 'text-white hover:text-orange-500'}`}
              >
                <a href={item.link}>{item.label}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:flex lg:justify-end">
          <button
            id="btnStart"
            className={`px-4 py-2 border rounded-full transition duration-300 focus:outline-none focus:ring ${isScrolled ? 'text-black border-black hover:bg-orange-500 hover:text-white hover:shadow-lg focus:ring-orange-500' : 'text-white border-white hover:bg-orange-500 hover:text-white hover:shadow-lg focus:ring-orange-500'}`}
          >
            Start Now
          </button>
        </div>
      </nav>
    </header>
  );
}
