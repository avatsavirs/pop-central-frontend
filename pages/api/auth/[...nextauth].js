import {gql} from 'graphql-request';
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import {request} from 'utils';

export default NextAuth({
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ],
  callbacks: {
    async signIn(user, account) {
      const providerUser = {
        providerId: user.id,
        provider: account.provider,
        name: user.name,
        email: user.email,
        image: user.image
      }
      const {accessToken, dbUser} = await getAccessToken(providerUser);
      user.accessToken = accessToken;
      user.dbUser = dbUser;
      return true;
    },
    jwt(token, user) {
      // jwt callback is called every time session is accessed. 
      // However user object is set only on signIn
      // It is undefined on subsequent calls.
      // We want to set the accessToken only on signIn
      if (user) {
        token.accessToken = user.accessToken;
        token.dbUser = user.dbUser;
      }
      return token;
    },
    session(session, token) {
      session.accessToken = token.accessToken;
      session.dbUser = token.dbUser;
      return session;
    }
  }
})

async function getAccessToken(user) {

  const SIGN_IN = gql`
  mutation createUser($input: SigninInput!) {
    signIn(user: $input) {
      user {
        id 
        name
        image
        email
      }
      accessToken
    }
  }
  `;

  const {signIn: signInResponse} = await request(SIGN_IN, {input: user});
  // return signInResponse.accessToken;
  return {accessToken: signInResponse.accessToken, dbUser: signInResponse.user}
}
