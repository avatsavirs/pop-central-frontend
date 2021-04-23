import {useSession, signIn, signOut} from 'next-auth/client'

export default function useAuth() {
  const [session, isSessionLoading] = useSession();
  if (session) {
    var accessToken = session.accessToken;
    var refreshToken = session.refreshToken;
  } else {
    var accessToken = undefined;
    var refreshToken = undefined;
  }
  if (accessToken && refreshToken) {
    var isLoggedIn = true;
    var isLoggedOut = !isLoggedIn;
    var user = session.dbUser;
  } else {
    if (session) signOut();
    var isLoggedIn = false;
    var isLoggedOut = true;
    var user = null;
  }
  return {user, accessToken, isLoggedIn, isLoggedOut, user, isSessionLoading, signIn, signOut, refreshToken};
}
