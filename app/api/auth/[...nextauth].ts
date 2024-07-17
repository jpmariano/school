import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import userData from '@/data/userLogin.json';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',

      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        if (
          userData.email === credentials?.username &&
          userData.password === credentials?.password
        ) {
          return {
            id: userData.id,
            name: userData.firstname,
            firstname: userData.firstname,
            lastname: userData.lastname,
            email: userData.email,
            uid: userData.id,
          };
        } else {
          console.log('not authenticated');
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // the user present here gets the same data as received from DB call  made above -> fetchUserInfo(credentials.opt)
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      return session;
    },
  },
  pages: {
    signIn: '/login',
    signOut: '/login',
    newUser: '/signup',
  },
  debug: process.env.NODE_ENV === 'development',
  session: {
    // Set to jwt in order to CredentialsProvider works properly
    strategy: 'jwt',
  },
  secret: process.env.SECRET, // TODO: Define env variables https://next-auth.js.org/configuration/options
  /*
  session: {
    strategy: "database",
    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 30 * 24 * 60 * 60, // 30 days

    // Seconds - Throttle how frequently to write to database to extend a session.
    // Use it to limit write operations. Set to 0 to always update the database.
    // Note: This option is ignored if using JSON Web Tokens
    updateAge: 24 * 60 * 60, // 24 hours
    
    // The session token is usually either a random UUID or string, however if you
    // need a more customized session token string, you can define your own generate function.
    generateSessionToken: () => {
      return userData.id ?? randomBytes(32).toString("hex")
    }
  }*/
});
