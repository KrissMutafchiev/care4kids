import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  debug: true,

  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "username", type: "text", placeholder: "username" },
        password: { label: "Password", type: "password" },
        csrfToken: { label: 'CSRF Token', type: 'hidden' },

      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied


        const xsrfToken = '086f1196-278d-4485-9f87-af5044aa689c'
      
        console.log('-------->Email:',credentials?.email)
        console.log('-------->Pass:', credentials?.password)
        
        const res = await fetch(
          "http://ec2-3-125-52-214.eu-central-1.compute.amazonaws.com:8080/login",
          {
            method: "POST",
            headers: {
              "X-XSRF-TOKEN": `${credentials.csrfToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: `${credentials?.email}`,
              password: `${credentials?.password}`,
            }),
          }
        );

        const user = await res.json();

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },

    async session({ session, token, user }) {
      session.user = token;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});
