import {useSession, signIn, signOut} from 'next-auth/client'
import {useEffect} from 'react';

export default function useAuth() {
  const [session, isSessionLoading] = useSession();
  const accessToken = session?.accessToken;
  const refreshToken = session?.refreshToken;
  const isLoggedIn = Boolean(session) && accessToken && refreshToken;
  const isLoggedOut = !isLoggedIn;
  const user = session ? session.dbUser : null;
  useEffect(() => {
    if (session && (!accessToken || !refreshToken)) {
      signOut();
    }
  }, [session]);
  return {user, accessToken, isLoggedIn, isLoggedOut, user, isSessionLoading, signIn, signOut, refreshToken};
}
