import {gql, GraphQLClient} from 'graphql-request';
import {QueryClient, useQuery} from 'react-query';
import {dehydrate} from 'react-query/hydration';

const POPULAR_MOVIES = gql`
  query {
    popularMovies {
      id
      title 
      overview
      poster(imgSize: M)
    }
  }
`;

async function request(query) {
  const client = new GraphQLClient("http://localhost:4000");
  const data = await client.request(query);
  return data;
}

export async function getStaticProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery('popularMovies', async () => {
    const data = await request(POPULAR_MOVIES);
    return data.popularMovies;
  });
  return {
    props: {
      dehydrateState: dehydrate(queryClient)
    }
  }
}

export default function Home() {
  const {data: popularMovies} = useQuery('popularMovies', async () => {
    const data = await request(POPULAR_MOVIES);
    return data.popularMovies;
  });
  return (
    <div css={{
      fontSize: '1.25rem',
      backgroundColor: 'yellow'
    }}>
      {JSON.stringify(popularMovies)}
    </div>
  )
}
