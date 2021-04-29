import {gql} from 'graphql-request';
import useAuth from 'hooks/useAuth';
import {QueryClient, useQuery} from 'react-query';
import {dehydrate} from 'react-query/hydration';
import {authRequest} from 'utils';
import {getSession} from 'next-auth/client'
import Head from 'next/head';
import ListSlider from 'components/ListSlider';

const LISTS = gql`
  query {
    lists {
      id 
      title
      listItems {
        id 
        title
        image
        externalId
      }
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
  await queryClient.prefetchQuery('lists', async () => {
    const response = await authRequest(LISTS, null, session.accessToken, session.refreshToken);
    return response.lists;
  });
  return {
    props: {
      session,
      dehydrateState: dehydrate(queryClient)
    },
  }
}


export default function Profile() {
  const {isSessionLoading, accessToken, refreshToken, user} = useAuth();
  const {data: lists, error, isLoading, isError, isIdle, isSuccess, isStale} = useQuery('lists', async () => {
    const response = await authRequest(LISTS, null, accessToken, refreshToken)
    return response.lists;
  }, {enabled: !isSessionLoading});
  if (isLoading || isIdle) {
    return <div>Loading...</div>
  }
  if (isError) {
    return <div role="error">{error.message}</div>
  }
  if (isSuccess) {
    return (
      <>
        <Head><title>{user.name} | Pop Central</title></Head>
        <div css={{
          width: 'var(--content-width)',
          display: 'flex',
          flexDirection: 'column',
          gap: '5rem',
        }}>
          {
            lists.map(list => (
              <div key={list.id}>
                <h3>{list.title}</h3>
                <ListSlider data={list.listItems} />
              </div>
            ))
          }
        </div>
      </>
    )
  }
}
