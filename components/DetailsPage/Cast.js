import Image from 'next/image';
import Link from 'next/link';
import {CardImage} from 'styled-components';
import {Card} from 'styled-components';

export default function Cast({cast}) {
  cast = cast.map(c => ({role: c.role, ...c.artist})).slice(0, 10);
  return (
    <div css={{
      display: 'flex',
      gap: '3rem',
      flexWrap: 'wrap',
      justifyContent: 'center',
    }} tabIndex={-1}>
      {cast.map(person => (
        <Link key={person.id} href={`/person/${person.id}`} passHref>
          <a css={{
            textDecoration: 'none',
            color: 'var(--primary-text)',
            ':focus, :hover': {
              color: 'var(--secondary)',
              outline: '1px solid var(--secondary)',
              '--muted-text': 'var(--secondary)'
            },
          }}>
            <Card width="15rem" height="29rem">
              <CardImage portion="80%" >
                <Image src={person.photo || '/img/profile.png'} layout="fill" objectFit="cover" />
              </CardImage>
              <div css={{
                flexBasis: '20%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                textAlign: 'center'
              }}>
                <p> {person.name} </p>
                <p css={{
                  fontSize: 'var(--small)',
                  color: 'var(--muted-text)'
                }}> {person.role} </p>
              </div>
            </Card>
          </a>
        </Link>
      ))}
    </div>
  )
}
