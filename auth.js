import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import { writeClient } from "./sanity/lib/write-client";
import { client } from "./sanity/lib/client";
import { AUTHOR_BY_GITHUB_ID_QUERY } from "./sanity/lib/queries";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub],
  callbacks: {
    async signIn({ 
      user: { name, email, image },
      profile: { id, login, bio }
    }){
      const existingUser = await client            // Busca en tu base de datos Sanity un usuario existente por el id de GitHub.
        .fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
          id: id,
        });

      if (!existingUser) {                         // Si no existe, crea un nuevo usuario
        await writeClient.create({
          _type: "author",
          id: id,
          name: name,
          username: login,
          email: email,
          image: image,
          bio: bio || "",
        });
      }

      return true
    },
    async jwt({ token, account, profile }) {       // next-auth generá un token que si es la 1ª vez que se autentica estará vacio
      if (account && profile) {                    // account y profile se obtienen de la respuesta de github y permiten...
        const user = await client                  // ...buscar un usuario en la base de datos en base al id del profile                  
          .fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
            id: profile?.id,
          });

        token.id = user?._id;                      // Esto permite enriquecer el token con el id del usuario de github   
      }

      return token;
    },
    async session({ session, token }) {            // Se recibe el objeto session generado por next-auth y el token anterior
      Object.assign(session, { id: token.id });
      return session;
    },
  }
})