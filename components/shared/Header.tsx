"use client";

import Link from "next/link";
import React from "react";
import { SignedOut, UserButton } from "@clerk/nextjs";
import { navLinks } from "@/constants/constants";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";

const Header = () => {
  return (
    <div className="container mx-auto px-10 mb-8">
      <div className="border-b w-full inline-block border-blue-400 py-8">
        <div className="md:float-left block">
          <Link href="/">
            <span className="cursor-pointer font-bold text-4xl text-white">
              BlogSA
            </span>
          </Link>
        </div>
        <div className="hidden md:float-left md:contents">
          <span className="md:float-right mt-2 align-middle text-white ml-4 font-semibold cursor-pointer">
            <UserButton />
          </span>

          {navLinks.map((cat) => (
            <Link className="" key={cat.title} href={`/blog/${cat.slug}`}>
              <span className="md:float-right mt-2 align-middle text-white ml-4 font-semibold cursor-pointer">
                {cat.title}
              </span>
            </Link>
          ))}
        </div>
        <div className="float-right -mt-8 flex gap-4 md:hidden lg:hidden">
          <UserButton />
          <SignedOut>
            <Link href={"/sign-in"} className="text-white mt-1">
              Login
            </Link>
          </SignedOut>
          <Sheet>
            <SheetTrigger>
              <Image
                src="/images/menu.svg"
                alt="menu"
                width={32}
                height={32}
                className="cursor-pointer"
              />
            </SheetTrigger>
            <SheetContent className="sheet-content sm:w-96 bg-white rounded-l-xl ">
              <>
                <ul className="header-nav_elements flex flex-col gap-20 items-center mt-56 text-2xl">
                  {navLinks.map((link) => {
                    return (
                      <li key={link.slug}>
                        <Link
                          href={`/blog/${link.slug}`}
                          className="sidebar-link cursor-pointer border-b"
                        >
                          {link.title}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
};

export default Header;
