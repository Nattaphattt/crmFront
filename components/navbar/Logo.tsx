"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {};

function Logo({ }: Props) {
  const router = useRouter();

  return (
    <div onClick={() => router.push("/")}>
      <Image
        alt="logo"
        className="hidden md:block cursor-pointer"
        src={"/assets/protoss-logo.png"}
        sizes="25vw"
        width={200}
        height={50}
        blurDataURL={"/assets/protoss-logo.png"}
      />
    </div>
  );
}

export default Logo;
