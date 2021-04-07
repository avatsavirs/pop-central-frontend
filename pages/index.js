import PopularMovies from 'components/PopularMovies';
import {QueryClient} from 'react-query';
import {dehydrate} from 'react-query/hydration';
import {getPopularMovies} from 'data/movies'
import {getPopularTv} from 'data/tv'
import PopularTv from 'components/PopularTv';
import Head from 'next/head'
import SearchBar from 'components/SearchBar';

export async function getStaticProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery('movies', getPopularMovies)
  await queryClient.prefetchQuery('tv', getPopularTv)
  return {
    props: {
      dehydrateState: dehydrate(queryClient)
    }
  }
}

export default function Home() {
  return (
    <>
      <Head>
        <title> Welcome | Pop Central </title>
      </Head>
      <div css={{
        flexBasis: 'var(--content-width)',
        padding: '3rem 0'
      }}>
        <SearchBar/>
        <PopularMovies />
        <PopularTv />
      </div>
    </>
  )
}
