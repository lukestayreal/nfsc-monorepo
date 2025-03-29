"use client";
import Link from "next/link";
import React from "react";
import { PlusGrid, PlusGridItem, PlusGridRow } from "./plus-grid";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Bars2Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { motion } from "motion/react";
import Logo from "./logo";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/company", label: "Company" },
  { href: "/contact", label: "Contact" },
];

export const DesktopNav = () => {
  const { data: session } = useSession();

  return (
    <nav className="relative hidden lg:flex">
      {navLinks?.map((item) => (
        <PlusGridItem key={item?.href} className="flex">
          <Link
            href={item?.href}
            className="px-4 py-3 text-base font-medium text-gray-950 bg-blend-multiply hover:bg-red-600/[9.5%]"
          >
            {item?.label}
          </Link>
        </PlusGridItem>
      ))}
      <PlusGridItem className="flex">
        {session?.user ? (
          <button
            onClick={() => signOut()}
            className="flex items-center gap-2 px-4 py-3 text-base font-medium text-gray-950 bg-blend-multiply hover:bg-red-600/[9.5%]"
          >
            <Image
              src={session?.user?.image as string}
              width={50}
              height={50}
              className="w-8 h-8 rounded-full object-cover"
              alt="userImage"
            />
            <p>{session?.user?.name}</p>
          </button>
        ) : (
          <Link
            href={"/login"}
            className="px-4 py-3 text-base font-medium text-gray-950 bg-blend-multiply hover:bg-red-600/[9.5%]"
          >
            Login
          </Link>
        )}
      </PlusGridItem>
    </nav>
  );
};

const MobileNavButton = ({ open }: { open: boolean }) => {
  return (
    <DisclosureButton className="flex size-12 items-center justify-center self-center rounded-lg data-[hover]:bg-black/5 lg:hidden duration-300">
      {open ? (
        <XMarkIcon className="size-6 text-gray-950" />
      ) : (
        <Bars2Icon className="size-6 text-gray-950" />
      )}
    </DisclosureButton>
  );
};

export const MobileNav = () => {
  const { data: session } = useSession();
  return (
    <DisclosurePanel className="lg:hidden">
      <div className="flex flex-col gap-6 py-4">
        {navLinks?.map((item, index) => (
          <motion.div
            initial={{ opacity: 0, rotateX: -90 }}
            animate={{ opacity: 1, rotateX: 0 }}
            transition={{
              duration: 0.15,
              ease: "easeInOut",
              rotateX: { duration: 0.3, delay: index * 0.1 },
            }}
            key={item?.href}
          >
            <Link
              href={item?.href}
              className="text-base font-medium text-gray-700 hover:text-gray-950 hover:underline underline-offset-2 decoration-[1px]"
            >
              {item?.label}
            </Link>
          </motion.div>
        ))}
        <motion.div
          initial={{ opacity: 0, rotateX: -90 }}
          animate={{ opacity: 1, rotateX: 0 }}
          transition={{
            duration: 0.15,
            ease: "easeInOut",
            rotateX: { duration: 0.3, delay: 0.4 },
          }}
        >
          {session?.user ? (
            <button
              onClick={() => signOut()}
              className="flex items-center gap-2 group"
            >
              <Image
                src={session?.user?.image as string}
                width={50}
                height={50}
                className="w-8 h-8 rounded-full object-cover"
                alt="userImage"
              />
              <p className="text-base font-medium text-gray-700 group-hover:text-gray-950 group-hover:underline underline-offset-2 decoration-[1px]">
                {session?.user?.name}
              </p>
            </button>
          ) : (
            <Link
              href={"/login"}
              className="text-base font-medium text-gray-700 hover:text-gray-950 hover:underline underline-offset-2 decoration-[1px]"
            >
              Login
            </Link>
          )}
        </motion.div>
      </div>
    </DisclosurePanel>
  );
};

export default function Navbar() {
  return (
    <Disclosure as="header" className="pt-5">
      {({ open }) => (
        <>
          <PlusGrid>
            <PlusGridRow className="relative flex justify-between">
              <div>
                <PlusGridItem className="py-3 hover:bg-red-600/[9.5%] group duration-300">
                  <Logo />
                </PlusGridItem>
              </div>
              <DesktopNav />
              <MobileNavButton open={open} />
            </PlusGridRow>
          </PlusGrid>
          <MobileNav />
        </>
      )}
    </Disclosure>
  );
}
