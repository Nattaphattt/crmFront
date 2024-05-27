"use client";
import React from "react";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

export default function page() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  return (
    <div className="h-screen flex items-center justify-center bg-[url('#/public/assets/background.jpg')] bg-cover">
      <div className="max-w-screen-sm bg-white shadow-lg rounded-lg p-5 space-y-4 w-1/2">
        <div className="flex flex-row justify-between">
          <Image
            alt="logo"
            height={25}
            width={25}
            src={"/assets/protoss-logo.png"}
            blurDataURL={"/assets/protoss-logo.png"}
          />
          <div className="flex flex-row">
          <p>See this page in </p>
          <p className="text-ats-blue ml-2">English</p>
          </div>
          
        </div>
        <div className="flex flex-row justify-start items-center pl-10">
          <h1 className="font-bold text-3xl">เข้าสู่ระบบ</h1>
        </div>
        <div className="flex flex-row justify-center items-center">
          <button
            onClick={() => signIn("keycloak", { callbackUrl })}
            className="flex items-center justify-center rounded-lg border-2 border-ats-blue px-20 cursor-pointer py-4 md:py-2 md:px-5"
          >
            <Image
              alt="logo"
              height={25}
              width={25}
              src={"/assets/microsoft_logo.png"}
              blurDataURL={"/assets/microsoft_logo.png"}
            />
            <p className="text-ats-violet ml-2">Sign in with Microsoft</p>
          </button>
        </div>
        <div className="flex flex-row justify-center items-center px-28">
            <div className="bg-black h-[1px] w-full" />
            <p className="m-2">OR</p>
            <div className="bg-black h-[1px] w-full" />
        </div>
        <div className="flex flex-row justify-center items-center">
            <p className="mr-2">ยังไม่มีบัญชี?</p>
            <p className="text-ats-blue">สมัครใช้งาน Microsoft</p>
        </div>
      </div>
    </div>
  );
}
