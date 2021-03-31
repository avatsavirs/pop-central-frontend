import {gql, GraphQLClient} from 'graphql-request';
import {QueryClient, useQuery} from 'react-query';
import {dehydrate} from 'react-query/hydration';
import {useCurrentTheme} from 'styled-components/ThemeProvider';

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
  const [_, toggleTheme] = useCurrentTheme();
  return (
    <div css={{
      fontSize: '1.25rem',
    }}>
      <h1> Hello World </h1>
      <h2> Hello World </h2>
      <h3> Hello World </h3>
      <h4> Hello World </h4>
      <h5> Hello World </h5>
      <h6> Hello World </h6>
      <p> Fo foo boo baa ma moo kaa koo </p>
      <small> Hello World </small>
      <button onClick={() => toggleTheme()}> Toggle Theme </button>
    </div>
  )
}
