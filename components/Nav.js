import Link from 'next/link';
import UserMenu from './UserMenu';

export default function Nav() {
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
          color: 'var(--primary-text)'
        }}>
          Pop Central
        </a>
      </Link>
      <UserMenu />
    </nav>
  )
}
