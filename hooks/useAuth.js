import {useSession, signIn, signOut} from 'next-auth/client'

export default function useAuth() {
  const [session, isSessionLoading] = useSession();
  const isLoggedIn = Boolean(session);
  const isLoggedOut = !isLoggedIn;
  const accessToken = session?.accessToken;
  const user = session ? session.dbUser : null;
  return {user, accessToken, isLoggedIn, isLoggedOut, user, isSessionLoading, signIn, signOut};
}
