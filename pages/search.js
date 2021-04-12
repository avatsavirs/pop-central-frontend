import {gql} from 'graphql-request'
import {request} from 'utils'
import Head from 'next/head'
import SearchBar from 'components/SearchBar';
import {Card} from 'styled-components';
import {CardImage} from 'styled-components';
import Image from 'next/image';
import {useRouter} from 'next/router';
import Link from 'next/link';

const SEARCH_MOVIES = gql`
  query getMovies($query: String!) {
    result: searchMovie(query: $query) {
      id
      title 
      poster(imgSize: M)
    }
  }
`;

const SEARCH_TV = gql`
  query getTv($query: String!) {
    result: searchTv(query: $query) {
      id
      title 
      poster(imgSize: M)
    }
  }
`;

const SEARCH_PERSON = gql`
  query getPerson($query: String!) {
    result: searchPerson(query: $query) {
      id
      name
      photo(imgSize: M)
    }
  }
`;

export async function getServerSideProps({query}) {
  switch (query.domain) {
    case 'movies':
      var gqlQuery = SEARCH_MOVIES;
      break;
    case 'tv':
      var gqlQuery = SEARCH_TV;
      break;
    case 'person':
      var gqlQuery = SEARCH_PERSON;
      break;
    default:
      throw new Error('Search domain must be movies, tv or preson');
  }
  const results = await request(gqlQuery, {query: query.keyword});
  return {
    props: {results: results.result, searchTerm: query.keyword, domain: query.domain}
  }
}

export default function Search({results, searchTerm, domain}) {
  return (
    <>
      <Head><title>Search | Pop Central</title></Head>
      <div css={{flexBasis: 'var(--content-width)', padding: '3rem 0'}}>
        <SearchBar initialSearchTerm={searchTerm} />
        <SearchResults results={results} domain={domain} />
      </div>
    </>
  )
}

function SearchResults({results, domain}) {
  const router = useRouter();
  return (
    <div css={{display: 'flex', gap: '5rem', flexWrap: 'wrap', justifyContent: 'center', paddingTop: '10rem'}}>
      {
        results.map(result => (
          <Card width="25rem" height="45rem" key={result.id} onClick={() => router.push(`/${domain}/${result.id}`)} css={{cursor: 'pointer'}}>
            <CardImage css={{flexGrow: 1}}><Image src={result.poster || result.photo || '/img/test.jpg'} layout="fill" objectFit="cover" /></CardImage>
            <div css={{textAlign: 'center', padding: '1rem 0'}} >
              <Link passHref href={`/${domain}/${result.id}`}><a css={{textDecoration: 'none', color: 'var(--primary-color)'}}><h4>{result.title || result.name}</h4></a></Link>
            </div>
          </Card>
        ))
      }
    </div>
  )
}
