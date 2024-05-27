"use client";

import Logo from "./Logo";
import { SigninButton } from "#/components/Buttons";
import { IHeaderProps } from "#/types/other/IHeader";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import Image from "next/image";
import { signOut } from "next-auth/react";

function Navbar({ userName,fullName }: IHeaderProps) {
  // console.log(userName)
  return (
    // from-[#9796f0] to-[#fbc7d4]
    // from-[#514A9D] to-[#24C6DC]
    // from-[#614385] to-[#516395]
    // from-[#5f2c82] to-[#49a09d]
    // from-[#B993D6] to-[#8CA6DB]
    <header className="z-30 bg-gradient-to-r from-[#fbc7d4] to-[#9796f0]">
      <div className="max-w-8xl xl:px-16">
        <div className="flex items-center justify-between py-6 sm:px-6 lg:px-8 xl:px-0">
          <Logo />
          {/* {!userName && <SigninButton />} */}
          {/* {userName && } */}
          <div className="w-auto text-right">
            <Menu as="div" className="relative inline-block text-left">
              <div className="flex items-center">
                <Menu.Button className="inline-flex items-center w-full justify-center rounded-full">
                  <p className="px-2 text-[#3c0764] font-light text">
                    {fullName}
                  </p>
                  <Image
                    alt="logo"
                    className="cursor-pointer"
                    src={"/assets/avatar.png"}
                    width={35}
                    height={35}
                    blurDataURL={"/assets/avatar"}
                  />
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute z-40 right-0 mt-1 w-auto origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="px-1 py-1 ">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={`${
                            active ? "bg-[#f28181] text-white" : "text-gray-900"
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                          onClick={() =>
                            signOut({
                              callbackUrl: `${window.location.origin}`,
                            })
                          }
                        >
                          Signout
                          {active ? (
                            <SignoutActiveIcon
                              className="h-5 w-5"
                              aria-hidden="true"
                            />
                          ) : (
                            <SignoutInactiveIcon
                              className="h-5 w-5"
                              aria-hidden="true"
                            />
                          )}
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
      </div>
    </header>
  );
}

function SignoutInactiveIcon(props: any) {
  return (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="#f1caca"
        stroke="#f28181"
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
      />
    </svg>
  );
}

function SignoutActiveIcon(props: any) {
  return (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="#f28181"
        stroke="#d24550"
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
      />
    </svg>
  );
}

export default Navbar;
