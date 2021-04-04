import Image from 'next/image';
import {CardImage} from 'styled-components';
import {Card} from 'styled-components';

export default function MovieCast({cast}) {
  cast = cast.map(c => ({role: c.role, ...c.artist})).slice(0, 10);
  return (
    <div css={{
      display: 'flex',
      gap: '3rem',
      flexWrap: 'wrap',
      justifyContent: 'center',
    }}>
      {cast.map(person => (
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
      ))}
    </div>
  )
}
