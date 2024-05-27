"use client";

import { Fragment } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useState } from "react";
import { Menu, Transition, MenuProps } from "@headlessui/react";
import { IMenuResponse } from "#/types/other/IMenu";
import { MenuIcons } from "./MenuIcons";
import { Typography } from "@mui/material";

type Props = {
  icon: string | null | undefined;
  label?: string;
  selected?: boolean;
  items: IMenuResponse;
  isLastItem: boolean
};

function CategoryBox({ icon: Icon, label, selected, items, isLastItem }: Props) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button
        className={`grid grid-rows-1 grid-flow-col place-items-center place-content-center p-2 border-b-2 hover:text-neutral-800 transition cursor-pointer ${selected ? "border-b-neutral-800" : "border-transparent"
          } ${selected ? "text-neutral-800" : "text-neutral-500"} mx-5`}
      >
        <MenuIcons
          name={`${!!Icon ? Icon : "Default"}`}
          className="row-span-1 h-6 w-6 fill-ats-icon"
        />
        <div className="row-span-1 font-medium text-xs text">{label}</div>
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute z-30 right-0 mt-0 w-auto max-h-[50rem] origin-center divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {items?.child?.map((module: IMenuResponse) => {
            return (
              <div key={module.menuId} className="px-1 py-1 ">
                <Menu.Item>
                  {({ active }) => (
                    <Menu
                      as="div"
                      className="relative inline-block text-left w-full origin-top-right divide-y focus:outline-none"
                    >
                      <Menu.Button
                        // onMouseEnter={() => setOpen("EDIT")}
                        // onMouseLeave={() => setOpen("")}
                        onClick={() =>
                          module.flagNewTab == "Y"
                            ? open(module.urlLink)
                            : window.location.replace(module.urlLink)
                        }
                        className={`${active ? "bg-violet-500 text-white" : "text-gray-900"
                          } group flex w-full items-center rounded-md px-4 py-2 text-sm`}
                      >
                        {active ? (
                          <EditActiveIcon
                            className="mr-2 h-5 w-5"
                            aria-hidden="true"
                          />
                        ) : (
                          <EditInactiveIcon
                            className="mr-2 h-5 w-5"
                            aria-hidden="true"
                          />
                        )}
                        {module.title}
                      </Menu.Button>
                      {!!module.child && (
                        <Transition
                          as={Fragment}
                          show={active}
                          enter="transition duration-200"
                          enterFrom="opacity-0"
                          enterTo="opacity-100"
                          leave="transition duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <Menu.Items className={`absolute z-10 origin-top ${isLastItem ? "-translate-x-full" : `translate-x-full mx-[-6.5rem]`} w-max top-0 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none`}>
                            {module?.child?.map((feature: IMenuResponse) => {
                              return (
                                <div
                                  key={feature.menuId}
                                  className="px-1 py-1 w-full"
                                >
                                  <Menu.Item>
                                    {({ active }) => (
                                      <Menu
                                        as="div"
                                        className="relative inline-block text-left w-full origin-top-right divide-y"
                                      >
                                        <Menu.Button
                                          onClick={() =>
                                            feature.flagNewTab == "Y"
                                              ? open(feature.urlLink)
                                              : window.location.replace(feature.urlLink)
                                          }
                                          className={`${active
                                            ? "bg-violet-500 text-white"
                                            : "text-gray-900"
                                            }  grid grid-cols-12 gap-2 w-full items-center rounded-md px-4 py-2 text-sm`}
                                        >
                                          <div className="col-span-2">
                                            {active ? (
                                              <EditActiveIcon
                                                className="h-5 w-5"
                                                aria-hidden="true"
                                              />
                                            ) : (
                                              <EditInactiveIcon
                                                className="h-5 w-5"
                                                aria-hidden="true"
                                              />
                                            )}
                                          </div>
                                          <div className="col-span-10">
                                            <Typography className="whitespace-nowrap">{feature?.title}</Typography>
                                          </div>
                                        </Menu.Button>
                                        {!!feature?.child && (
                                          <Transition
                                            as={Fragment}
                                            show={active}
                                            enter="transition duration-200"
                                            enterFrom="opacity-0"
                                            enterTo="opacity-100"
                                            leave="transition duration-100"
                                            leaveFrom="opacity-100"
                                            leaveTo="opacity-0"
                                          >
                                            <Menu.Items className="origin-top absolute translate-x-full w-max top-0 rounded-md shadow-lg m-[0.0025rem] bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                              {feature?.child?.map(
                                                (func: IMenuResponse) => {
                                                  return (
                                                    <div
                                                      key={func.menuId}
                                                      className="px-1 py-1 "
                                                    >
                                                      <Menu.Item>
                                                        {({ active }) => (
                                                          <button
                                                            onClick={() =>
                                                              func.flagNewTab == "Y"
                                                                ? open(func.urlLink)
                                                                : window.location.replace(func.urlLink)
                                                            }
                                                            className={`${active
                                                              ? "bg-violet-500 text-white"
                                                              : "text-gray-900"
                                                              } group flex w-full items-center rounded-md px-4 py-2 text-sm`}
                                                          >
                                                            {active ? (
                                                              <DuplicateActiveIcon
                                                                className="mr-2 h-5 w-5"
                                                                aria-hidden="true"
                                                              />
                                                            ) : (
                                                              <DuplicateInactiveIcon
                                                                className="mr-2 h-5 w-5"
                                                                aria-hidden="true"
                                                              />
                                                            )}
                                                            {func?.title}
                                                          </button>
                                                        )}
                                                      </Menu.Item>
                                                    </div>
                                                  );
                                                }
                                              )}
                                            </Menu.Items>
                                          </Transition>
                                        )}
                                      </Menu>
                                    )}
                                  </Menu.Item>
                                </div>
                              );
                            })}
                          </Menu.Items>
                        </Transition>
                      )}
                    </Menu>
                  )}
                </Menu.Item>
              </div>
            );
          })}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

function EditInactiveIcon(
  props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 13V16H7L16 7L13 4L4 13Z"
        fill="#EDE9FE"
        stroke="#A78BFA"
        strokeWidth="2"
      />
    </svg>
  );
}

function EditActiveIcon(
  props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 13V16H7L16 7L13 4L4 13Z"
        fill="#8B5CF6"
        stroke="#C4B5FD"
        strokeWidth="2"
      />
    </svg>
  );
}

function DuplicateInactiveIcon(
  props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 4H12V12H4V4Z"
        fill="#EDE9FE"
        stroke="#A78BFA"
        strokeWidth="2"
      />
      <path
        d="M8 8H16V16H8V8Z"
        fill="#EDE9FE"
        stroke="#A78BFA"
        strokeWidth="2"
      />
    </svg>
  );
}

function DuplicateActiveIcon(
  props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 4H12V12H4V4Z"
        fill="#8B5CF6"
        stroke="#C4B5FD"
        strokeWidth="2"
      />
      <path
        d="M8 8H16V16H8V8Z"
        fill="#8B5CF6"
        stroke="#C4B5FD"
        strokeWidth="2"
      />
    </svg>
  );
}

export default CategoryBox;
