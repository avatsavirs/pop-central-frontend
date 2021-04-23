import {gql} from 'graphql-request';
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import {request} from 'utils';
import jwt from 'jsonwebtoken';

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
      const {accessToken, dbUser, refreshToken} = await signup(providerUser);
      user.accessToken = accessToken;
      user.dbUser = dbUser;
      user.refreshToken = refreshToken;
      return true;
    },
    async jwt(token, user) {
      if (user) {
        token.accessToken = user.accessToken;
        token.dbUser = user.dbUser;
        token.refreshToken = user.refreshToken;
      } else if (isAccessTokenExpired(token.accessToken)) {
        const {newAccessToken, newRefreshToken} = await refreshAccessToken(token.accessToken, token.refreshToken);
        // console.debug({newAccessToken});
        token.accessToken = newAccessToken;
        token.refreshToken = newRefreshToken;
      }
      return token;
    },
    session(session, token) {
      session.accessToken = token.accessToken;
      session.dbUser = token.dbUser;
      session.refreshToken = token.refreshToken;
      // console.debug({'session.accessToken': session.accessToken})
      return session;
    }
  }
})

function isAccessTokenExpired(accessToken) {
  const decodedAccessToken = jwt.decode(accessToken);
  const accessTokenExpTime = decodedAccessToken?.exp * 1000;
  const currentTime = Date.now();
  return currentTime >= accessTokenExpTime;
}

async function signup(user) {
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
      refreshToken
    }
  }
  `;

  const {signIn: signInResponse} = await request(SIGN_IN, {input: user});
  return {accessToken: signInResponse.accessToken, dbUser: signInResponse.user, refreshToken: signInResponse.refreshToken}
}

async function refreshAccessToken(accessToken, refreshToken) {
  const REFRESH_TOKENS = gql`
    mutation getRefreshTokens($accessToken: String!, $refreshToken: String!) {
      refreshTokens(accessToken:$accessToken, refreshToken: $refreshToken) {
        code
        message
        accessToken
        refreshToken
      }
    }
  `;
  try {
    const {refreshTokens: {accessToken: newAccessToken, refreshToken: newRefreshToken}} = await request(REFRESH_TOKENS, {accessToken, refreshToken});
    return {newAccessToken, newRefreshToken};
  } catch (error) {
    console.error({error});
    return null;
  }
}
