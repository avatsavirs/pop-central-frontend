import {getPersonById} from 'data/person';
import {QueryClient, useQuery} from 'react-query'
import {dehydrate} from 'react-query/hydration';
import Image from 'next/image';
import {useRouter} from 'next/router'
import {Card} from 'styled-components';
import {CardImage} from 'styled-components';
import {CardBody} from 'styled-components';
import Link from 'next/link';

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true
  }
}

export async function getStaticProps({params}) {
  const personId = params.id;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery('person', async () => getPersonById(personId));
  return {
    props: {
      dehydrateState: dehydrate(queryClient),
      personId
    }
  }
}

export default function Person({personId}) {
  const router = useRouter();
  const {data: person} = useQuery('person', async () => getPersonById(personId), {enabled: !router.isFallback});
  if (router.isFallback) {
    return (
      <div> Loading ... </div>
    )
  }
  return (
    <div css={{
      width: 'var(--content-width)',
    }}>
      <div css={{
        display: 'flex',
        flexWrap: 'wrap'
      }}>
        <div css={{
          flexBasis: '25%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'start',
          paddingTop: '3rem',
          flexGrow: '1'
        }}>
          <Image src={person.photo} width={300} height={450} />
        </div>
        <div css={{
          flexBasis: '75%',
          padding: '4rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'start',
          gap: '2rem'
        }}>
          <div>
            <h2> {person.name} </h2>
          </div>
          <div>
            <h4> Biography </h4>
            <p> {person.biography} </p>
          </div>
          <div>
            <h4> Known For </h4>
            <p> {person.department} </p>
          </div>
          <div css={{
            display: 'flex',
            gap: '3rem',
            p: {
              fontSize: 'var(--small)'
            }
          }}>
            <div>
              <h5> Gender </h5>
              <p>{person.gender}</p>
            </div>
            <div>
              <h5> Birthday </h5>
              <p > {person.birthday} </p>
            </div>
          </div>
        </div>
      </div>
      <div css={{
        padding: '5rem'
      }}>
        <h3> Works </h3>
        <div css={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '3rem',
          padding: '3rem 0'
        }}>
          {person.credits.map(credit => (
            <Link href={`/${credit.project.mediaType === 'movie' ? 'movies' : 'tv'}/${credit.project.id}`} passHref>
              <a css={{
                textDecoration: 'none',
                color: 'var(--text-color)',
                cursor: 'pointer',
                tabIndex: 0,
                ":hover, :focus": {
                  outline: '1px solid var(--success)',
                  color: 'var(--success)'
                }
              }}>
                <Card key={credit.project.id} width="15rem" height="29rem">
                  <CardImage> <Image src={credit.project.poster || "/img/test.jpg"} layout="fill" objectFit="cover" /> </CardImage>
                  <div css={{
                    flexBasis: '20%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    textAlign: 'center',
                  }}>
                    <p> {credit.project.title} </p>
                    <p css={{
                      fontSize: 'var(--small)',
                      color: 'var(--muted-text)'
                    }}> {credit.role} </p>
                  </div>
                </Card>
              </a>
            </Link>
          ))}
        </div>
      </div>
    </div >
  )
}
