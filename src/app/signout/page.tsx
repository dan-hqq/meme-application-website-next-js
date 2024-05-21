// // "use client"

// import { auth } from "@/auth"
// import { SignInButton } from "@/components/auth/signin-button"
// import { SessionProvider } from "next-auth/react"
 
// export default async function SignInPage() {
//   const session = await auth
//   if (session?.user) {
//     // TODO: Look into https://react.dev/reference/react/experimental_taintObjectReference
//     // filter out sensitive data before passing to client.
//     session.user = {
//       name: session.user.name,
//       email: session.user.email,
//       image: session.user.image,
//     }

//     return (
//       <SessionProvider basePath={"/auth"} session={session}>
//         <div></div>
//       </SessionProvider>
//     )
//   }
  
//   return (
//     <div className="flex flex-col gap-2">
//       <SignInButton />
//     </div>
//   )
// }

import Image from "next/image";
import { SignOutButton } from "@/components/auth/signout-button";
import { getServerSession } from "next-auth";
import { authConfig } from "@/auth";
import { redirect } from "next/navigation";
// import { getCsrfToken } from "next-auth/react";

export default async function SignInPage() {
  const session = await getServerSession(authConfig);
  
  if(!session) redirect("/");

  return(
    <div className="w-full flex flex-col items-center justify-center min-h-screen py-2">
      <div className="flex flex-col items-center w-1/3 mt-10 p-10 shadow-md">
        <h1 className="mt-10 mb-4 text-4xl font-bold">Sign Out</h1>
        <SignOutButton />
      </div>
    </div>
  )
}