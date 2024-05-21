// import NextAuth from "next-auth"
// import GitHub from "next-auth/providers/github"

// export const { handlers, signIn, signOut, auth } = NextAuth({
//   theme: { logo: "https://authjs.dev/img/logo-sm.png" },
//   providers: [
//     GitHub({
  //       clientId: process.env.AUTH_GITHUB_ID!,
//       clientSecret: process.env.AUTH_GITHUB_SECRET!
//     }) 
//   ],
//   callbacks: {
//     // jwt({ token, user }) {
//     //   if (user) { // User is available during sign-in
//     //     token.id = user.id
//     //   }
//     //   return token
//     // },
//     // session({ session, token }) {
//     //   session.user!.id = token.id
//     //   return session
//     // },
//     jwt({ token, trigger, session, account }) {
//       if (trigger === "update") token.name = session.user.name
//       if (account?.provider === "keycloak") {
  //         return { ...token, accessToken: account.access_token }
//       }
//       return token
//     },
//     async session({ session, token }) {
//       if (token?.accessToken) {
  //         session.accessToken = token.accessToken
  //       }
//       return session
//     },
//   },
// })

import { NextAuthOptions, DefaultSession } from "next-auth";
import GitHub from "next-auth/providers/github";
import "next-auth/jwt"
import { sql } from "@vercel/postgres";

export const authConfig: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET as string,
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID as string,
      clientSecret: process.env.AUTH_GITHUB_SECRET as string
    })
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // Mencari atau membuat pengguna dalam database
      const userId = await getUserId(user.email!, user.name!);

      // Menambahkan userId ke session
      user.userId = userId;

      return true;
    },
    jwt({ token, trigger, session, account }) {
      if (trigger === "update") token.name = session.user.name
      if (account?.provider === "keycloak") {
        return { ...token, accessToken: account.access_token }
      }
      return token
    },
    async session({ session, token, user }) {
      if (token?.accessToken) {
        session.accessToken = token.accessToken;
        session.userId = user.userId
      }
      return session
    },
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    }
  }
} satisfies NextAuthOptions;

async function getUserId(email: string, username: string): Promise<string> {
  try {
    // Mencari pengguna berdasarkan email
    // const { rows } = await sql`SELECT * FROM posts WHERE likes > ${likes};`
    const { rows } = await sql`SELECT id FROM users WHERE email = ${email}`;

    // Jika pengguna ditemukan, kembalikan userId
    if (rows.length > 0) {
      console.log(rows[0].id);
      return rows[0].id;
    }

    // Jika pengguna tidak ditemukan, buat pengguna baru dan kembalikan userId
    const createResult = await sql`INSERT INTO users (email, username) VALUES (${email}, ${username}) RETURNING id`;
    console.log(createResult);
    return createResult.rows[0].id;
  } catch (error) {
    console.error("Error getting or creating user:", error);
    throw error;
  }
}

declare module "next-auth" {
  interface User {
    userId?: string
  }
}

declare module "next-auth" {
  interface Session {
    accessToken?: string
    userId?: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string
  }
}

// export async function loginIsRequiredServer() {
//   const session = await getServerSession(authConfig);
//   if (!session) return redirect("/signin");
// }

// export function loginIsRequiredClient() {
//   if (typeof window !== "undefined") {
//     const session = useSession();
//     const router = useRouter();
//     if (!session) router.push("/signin");
//   }
// }