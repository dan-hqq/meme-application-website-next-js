
import { getServerSession } from "next-auth"
import { authConfig } from "@/auth";
// import { SessionProvider } from "next-auth/react";
// import { useEffect, useState } from "react";

export default async function SignInPage() {
    
    const session = await getServerSession(authConfig);

    console.log(session);
    
};
