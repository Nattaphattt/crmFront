"use client";

import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { IHeaderProps } from "#/types/other/IHeader";
import CategoryBox from "./CategoryBox";
import { getMenuApi } from "#/app/api/other/menuApi";
import { IMenuResponse } from "#/types/other/IMenu";

function Categories({ userName }: IHeaderProps) {
  const params = useSearchParams();
  const category = params?.get("category");

  const { isLoading, data: menuList } = useQuery(
    ["getMenu"],
    () => getMenuApi(!!userName ? userName : ""),
    {
      select: (data) => data,
      onError: (error) => {
        if (Array.isArray((error as any).data?.error)) {
          (error as any).data.error.forEach((el: any) =>
            console.error(el.message)
          );
        } else {
          console.error((error as any).data?.message);
        }
      },
      enabled: !!userName,
    }
  );

  return (
    <div className=" w-auto min-h-[50px] flex justify-center mx-auto max-w-screen-2xl space-y-8 px-8">
      <div className={` ${isLoading ? 'animate-pulse' : ''} rounded-lg relative -top-5 bg-white w-full px-2 py-1 min-h-[50px]`}>
        {menuList?.map((items: IMenuResponse, index: number, array: IMenuResponse[]) => {
          const isLastItem = index === array.length - 1;
          return (
            <CategoryBox
              key={index}
              icon={items?.icon}
              label={items?.title} // <ABC />
              selected={category === items?.title}
              items={items}
              isLastItem={isLastItem}
            />
          );
        })}
      </div>
    </div>
  )
}

export default Categories;