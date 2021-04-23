import {gql} from 'graphql-request';
import useAuth from 'hooks/useAuth';
import {QueryClient, useQuery} from 'react-query';
import {dehydrate} from 'react-query/hydration';
import {authRequest} from 'utils';
import {getSession} from 'next-auth/client'

const LISTS = gql`
  query {
    lists {
      id 
      title
    }
  }
`;

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);
  if (!session || !session.accessToken || !session.refreshToken) {
    ctx.res.writeHead(302, {Location: "/"}).end();
    return {props: {session: null}};
  }
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery('lists', async () => authRequest(LISTS, null, session.accessToken, session.refreshToken));
  return {
    props: {
      session,
      dehydrateState: dehydrate(queryClient)
    },
  }
}


export default function Profile() {
  const {isSessionLoading, accessToken, refreshToken} = useAuth();
  const {data, error, isLoading, isError, isSuccess, isStale} = useQuery('lists', async () => authRequest(LISTS, null, accessToken, refreshToken), {enabled: !isSessionLoading});
  return (
    <div>
      <h1>Profile</h1>
      {isLoading && <p>Loading...</p>}
      stale: {isStale}
      {isSuccess && (
        <div>
          <h1> Lists </h1>
          <p>{JSON.stringify(data)}</p>
        </div>
      )}
      {isError && <p>{JSON.stringify(error)}</p>}
      <p>{accessToken}</p>
      <p>{refreshToken}</p>
    </div>
  )
}
