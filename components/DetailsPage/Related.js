import Link from 'next/link';
import {Card, CardImage} from 'styled-components';
import Image from 'next/image';


export default function Related({related}) {
  return (
    <div css={{
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: '3rem',
      padding: '3rem 0'
    }}>
      {related.map(ri => (
        <Link key={ri.id} href={`/${ri.mediaType === 'movie' ? 'movies' : 'tv'}/${ri.id}`} passHref>
          <a css={{
            textDecoration: 'none',
            color: 'var(--text-color)',
            cursor: 'pointer',
            tabIndex: 0,
            ":hover, :focus": {
              outline: '1px solid var(--outline-color)',
              color: 'var(--outline-color)'
            }
          }}>
            <Card width="15rem" height="29rem">
              <CardImage> <Image src={ri.poster || "/img/test.jpg"} layout="fill" objectFit="cover" /> </CardImage>
              <div css={{
                flexBasis: '20%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                textAlign: 'center',
              }}>
                <p> {ri.title} </p>
              </div>
            </Card>
          </a>
        </Link>
      ))}
    </div>
  )
}
