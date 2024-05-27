"use client";

import { signIn, signOut } from "next-auth/react";
import { useSearchParams } from "next/navigation";

export const SigninButton = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/profile";
  return (
    <a
      className="inline-flex justify-center rounded-lg text-sm font-semibold py-3 px-4 bg-white/0 ring-1 ring-[#3709db] hover:bg-white/25 hover:ring-[#3709db] text-[#3709db] cursor-pointer"
      onClick={() => signIn("keycloak", { callbackUrl })}
    >
      <span>
        Signin
        <span aria-hidden="true" className="text-[#3709db] sm:inline">
          →
        </span>
      </span>
    </a>
  );
};
