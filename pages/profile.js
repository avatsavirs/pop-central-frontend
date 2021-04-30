import {gql} from 'graphql-request';
import useAuth from 'hooks/useAuth';
import {QueryClient, useMutation, useQuery, useQueryClient} from 'react-query';
import {dehydrate} from 'react-query/hydration';
import {authRequest} from 'utils';
import {getSession} from 'next-auth/client'
import Head from 'next/head';
import ListSlider from 'components/ListSlider';
import {TrashIcon} from '@heroicons/react/solid';

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
        mediaType
      }
    }
  }
`;

const DELETE_LIST = gql`
  mutation($listId:ID!) {
    deleteList(listId: $listId) {
      code
      message
      success
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
  const {data: lists, error, isLoading, isError, isIdle, isSuccess} = useQuery('lists', async () => {
    const response = await authRequest(LISTS, null, accessToken, refreshToken)
    return response.lists;
  }, {enabled: !isSessionLoading});
  const {deleteList} = useDeleteList();
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
              <div key={list.id} css={{
                ':hover': {
                  button: {
                    opacity: 1
                  }
                }
              }}>
                <div css={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem'}}>
                  <h3>{list.title}</h3>
                  <button css={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--primary-text)',
                    opacity: '0',
                    cursor: 'pointer',
                    transition: 'opacity 0.1s ease-in-out, color 0.1s ease-in-out',
                    ':hover': {
                      color: 'red'
                    }
                  }}
                    onClick={() => {deleteList({listId: list.id})}}><TrashIcon width='2rem' height='2rem' /></button>
                </div>
                {list.listItems.length > 0 ? <ListSlider data={list.listItems} /> : <small>No Items in this list</small>}
              </div>
            ))
          }
        </div>
      </>
    )
  }
}

function useDeleteList() {
  const queryClient = useQueryClient();
  const {accessToken, refreshToken} = useAuth();
  const {mutate} = useMutation(async ({listId}) => {
    await authRequest(DELETE_LIST, {listId}, accessToken, refreshToken);
  }, {
    onMutate: ({listId}) => {
      queryClient.cancelQueries('lists');
      const prevLists = queryClient.getQueryData('lists');
      queryClient.setQueryData('lists', (oldLists) => {
        return oldLists.filter(oldList => oldList.id !== listId);
      })
      return prevLists;
    },
    onError: (_, __, context) => {
      queryClient.setQueryData('lists', context.prevLists);
    },
    onSettled: () => {
      queryClient.invalidateQueries('lists');
    }
  });
  return {deleteList: mutate};
}
