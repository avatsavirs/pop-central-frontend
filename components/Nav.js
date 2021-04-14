import Link from 'next/link';
import UserMenu from './UserMenu';
import {signIn, useSession} from 'next-auth/client'
import {MoonIcon, SunIcon} from '@heroicons/react/solid';
import useTheme from 'hooks/useTheme';

export default function Nav() {
  const [session, isLoading] = useSession();
  const [theme, switchTheme] = useTheme();
  console.debug({session});
  return (
    <nav css={{
      display: 'flex',
      flexBasis: '12rem',
      borderBottom: '1px solid var(--border-color)',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 1rem'
    }}>
      <Link href="/" passHref>
        <a css={{
          fontFamily: 'Nanum Pen Script',
          fontSize: '6.4rem',
          fontWeight: '700',
          textDecoration: 'none',
          color: 'var(--primary-text)',
          span: {
            color: 'var(--brand)'
          }
        }}>
          <span>P</span>op <span>C</span>entral
        </a>
      </Link>
      <div css={{display: 'flex', gap: '2rem', alignItems: 'center'}}>
        <button aria-label={theme === 'dark' ? 'light-theme' : 'dark-theme'} css={{background: 'transparent', color: 'var(--primary-color)', border: 'none', cursor: 'pointer'}} onClick={switchTheme}>{theme === 'dark' ? <SunIcon css={{width: '3rem', height: '3rem'}} /> : <MoonIcon css={{width: '3rem', height: '3rem'}} />}</button>
        {isLoading ? <div css={{width: '50px'}} /> : (session === null ? <button onClick={() => signIn('google')}>Login</button> : <UserMenu user={session.user} />)}
      </div>
    </nav>
  )
}
