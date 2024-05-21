// import { handlers } from "@/auth" // Referring to the auth.ts we just created
// export const { GET, POST } = handlers
// // export const runtime = "edge" // optional

import { authConfig } from "@/auth";
import NextAuth from "next-auth/next";

const handler = NextAuth(authConfig);

export { handler as GET, handler as POST };