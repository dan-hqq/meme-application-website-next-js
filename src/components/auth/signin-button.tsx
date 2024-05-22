"use client";

import { signIn } from "next-auth/react"
import Image from "next/image";
 
export function SignInButton() {
  const handleClick = () => {
    signIn("github");
  };

  return (
    <button 
      onClick={handleClick}
      className="w-full flex items-center font-semibold justify-center h-14 px-6 mt-4
        text-xl transition-colors duration-300 bg-white border-2 border-black text-black
        rounded-lg focus:shadow-outline hover:bg-slate-200
      "
    >
      <Image src="/githublogo.png" alt="GitHub Logo" width={30} height={30} />
      <span className="ml-4">Continue with GitHub</span>
    </button>
  )

} 