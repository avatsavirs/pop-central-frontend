import Link from 'next/link';
import UserMenu from './UserMenu';
import useAuth from 'hooks/useAuth'
import {MoonIcon, SunIcon} from '@heroicons/react/solid';
import useTheme from 'hooks/useTheme';

export default function Nav() {
  const {signIn, isSessionLoading, isLoggedIn, user} = useAuth();
  const [theme, switchTheme] = useTheme();
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
        {isSessionLoading ? <UserMenuPlaceholder /> : (isLoggedIn ? <UserMenu user={user} /> : <button onClick={() => signIn('google')} css={{
          background: 'none',
          border: 'none',
          color: 'var(--primary-text)',
          fontSize: 'var(--p)',
          cursor: 'pointer'
        }}>Login</button>)}
      </div>
    </nav>
  )
}

function UserMenuPlaceholder() {
  return <div css={{width: '50px'}} />;
}
