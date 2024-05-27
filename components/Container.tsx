"use client";

import { Typography } from "@mui/material";
import Image, { StaticImageData } from "next/image";

type Props = {
  children: React.ReactNode;
  title?: string;
  titleIcon?: StaticImageData;
};

function Container({ children, title, titleIcon }: Props) {
  return (
    <>
      <div className="flex flex-row flex-wrap justify-between mb-3">
        <div className="grid grid-cols-12 gap-4 w-full">
          <div className="col-span-2">
            <div className="flex flex-row items-center space-x-1">
              {!!titleIcon && (
                <div className="relative h-8 w-8">
                  <Image
                    className="object-cover"
                    src={titleIcon}
                    alt="img"
                    fill
                    sizes="(min-width: 25px) 25px, 25px"
                    style={{
                      objectFit: "cover", // cover, contain, none
                    }}
                  />
                </div>
              )}
              {!!title && (
                <div className="flex flex-row space-x-3 items-end">
                  <Typography variant="title">{title}</Typography>
                </div>
              )}
            </div>
          </div>
          <div className="col-span-10">{children}</div>
        </div>
      </div>
      <hr className="my-3" />
    </>
  );
}

export default Container;
