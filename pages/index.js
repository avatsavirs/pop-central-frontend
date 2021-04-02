import PopularMovies from 'components/PopularMovies';
import {QueryClient, useQuery} from 'react-query';
import {dehydrate} from 'react-query/hydration';
import {getPopularMovies} from 'data/movies'
import {getPopularTv} from 'data/tv'
import PopularTv from 'components/PopularTv';

export async function getStaticProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery('popularMovies', getPopularMovies)
  await queryClient.prefetchQuery('popularTv', getPopularTv)
  return {
    props: {
      dehydrateState: dehydrate(queryClient)
    }
  }
}

export default function Home() {
  return (
    <div css={{
      flexBasis: 'var(--content-width)',
      padding: '3rem 0'
    }}>
      <PopularMovies />
      <PopularTv />
    </div>
  )
}
