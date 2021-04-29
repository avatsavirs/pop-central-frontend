import styled from '@emotion/styled';
import Dialog from '@reach/dialog';
import {XIcon, PlusIcon} from '@heroicons/react/solid';
import {useMutation, useQuery, useQueryClient} from 'react-query';
import {authRequest} from 'utils';
import useAuth from 'hooks/useAuth';
import {gql} from 'graphql-request'

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

const CREATE_LIST = gql`
mutation($title:String!) {
  createList(title:$title) {
    code
    message
    success
  }
}
`;

const ADD_LIST_ITEM = gql`
mutation($input:AddListItemInput!) {
  addListItem(input:$input) {
    code
    success
    message
    list {
      title
      listItems {
        id
        title
        image
      }
    }
  }
}
`;

const REMOVE_LIST_ITEM = gql`
mutation ($listId:ID!, $listItemId:ID!){
  deleteListItem(listId:$listId, listItemId:$listItemId) {
    code
    success
    message
    list {
      id
      title
      listItems {
        id
        title
        image
      }
    }
  }
}
`;

export default function AddToListModal({open, setOpen, itemData}) {
  const {lists, error, isLoading, isError, isSuccess, isIdle} = useLists();
  const {addListItem} = useAddListItem();
  const {removeListItem} = useRemoveListItem();
  const {createList} = useCreateList();

  function handleSubmit(event) {
    event.preventDefault();
    createList({listTitle: event.target.listTitle.value})
    event.target.reset();
  }

  if (isLoading || isIdle) {
    if (open)
      return <div>Loading...</div>
    return null;
  }
  if (isError) {
    if (open)
      return <div role="error">{error.message}</div>
    return null;
  }
  if (isSuccess) {
    return (
      <StyledDialog aria-label="add to list" isOpen={open} onDismiss={() => setOpen(false)}>
        <button onClick={() => {setOpen(false)}}><XIcon /></button>
        <h3>Add To List</h3>
        <ul>
          {lists.map(list => {
            const listItem = list.listItems.find(listItem => listItem.externalId === itemData.externalId);
            const isInList = Boolean(listItem);
            return (
              <li
                role="button"
                aria-label="add to list"
                key={list.id}
                css={{fontWeight: isInList ? 'bold' : 'normal'}}
                onClick={() => isInList ? removeListItem({listId: list.id, listItemId: listItem.id}) : addListItem({listId: list.id, title: itemData.title, image: itemData.image, externalId: itemData.externalId, mediaType: itemData.mediaType})}>
                {list.title}
              </li>
            )
          })}
        </ul>
        <form onSubmit={handleSubmit}>
          <input type="text" id="listTitle" placeholder="Create a new List..." />
          <button aria-label="create list" type="submit"><PlusIcon /></button>
        </form>
      </StyledDialog>
    )
  }
}

function useCreateList() {
  const {accessToken, refreshToken} = useAuth();
  const queryClient = useQueryClient();
  const {mutate: createList} = useMutation(async ({listTitle}) => {
    await authRequest(CREATE_LIST, {title: listTitle}, accessToken, refreshToken);
  }, {
    onMutate: async ({listTitle}) => {
      queryClient.cancelQueries('lists');
      const prevLists = queryClient.getQueryData('lists');
      queryClient.setQueryData('lists', (oldLists) => {
        return [...oldLists, {id: 'newList', title: listTitle, listItems: []}]
      });
      return prevLists;
    },
    onError: async (error, {listTitle}, context) => {
      queryClient.setQueryData('lists', context.prevLists)
    },
    onSettled: async () => {
      queryClient.invalidateQueries('lists');
    }
  });
  return {createList}
}

function useLists() {
  const {isSessionLoading, accessToken, refreshToken} = useAuth();
  const {data: lists, error, isLoading, isError, isSuccess, isIdle} = useQuery('lists', async () => {
    const response = await authRequest(LISTS, null, accessToken, refreshToken);
    return response.lists;
  }, {enabled: !isSessionLoading});
  return {lists, error, isLoading, isError, isSuccess, isIdle};
}

function useAddListItem() {
  const queryClient = useQueryClient();
  const {accessToken, refreshToken} = useAuth();
  const {mutate: addListItem} = useMutation(async ({listId, title, image, externalId, mediaType}) => {
    await authRequest(ADD_LIST_ITEM, {
      input: {
        listId: listId,
        title: title,
        image: image,
        externalId: externalId,
        mediaType: mediaType
      }
    }, accessToken, refreshToken);
  }, {
    onMutate: async ({listId, externalId}) => {
      queryClient.cancelQueries('lists')
      const prevLists = queryClient.getQueryData('lists');
      queryClient.setQueryData('lists', (oldLists) => {
        const oldListsCopy = [...oldLists];
        const oldList = oldListsCopy.find(oldList => oldList.id === listId);
        oldList.listItems.push({id: 'newListItem', externalId: externalId})
        return oldListsCopy;
      })
      return prevLists;
    },
    onError: (error, listId, context) => {
      queryClient.setQueryData('lists', context.prevLists);
    },
    onSettled: () => {
      queryClient.invalidateQueries('lists');
    }
  });
  return {addListItem}
}

function useRemoveListItem() {
  const queryClient = useQueryClient();
  const {accessToken, refreshToken} = useAuth()
  const {mutate: removeListItem} = useMutation(async ({listId, listItemId}) => {
    const res = await authRequest(REMOVE_LIST_ITEM, {
      listId: listId,
      listItemId: listItemId
    }, accessToken, refreshToken);
  }, {
    onMutate: async ({listId, listItemId}) => {
      queryClient.cancelQueries('lists')
      const prevLists = queryClient.getQueryData('lists');
      queryClient.setQueryData('lists', (oldLists) => {
        const oldListsCopy = [...oldLists];
        const oldList = oldListsCopy.find(oldList => oldList.id === listId);
        oldList.listItems = oldList.listItems.filter(listItem => listItem.id !== listItemId);
        return oldListsCopy;
      })
      return prevLists;
    },
    onError: (error, {listId, listItemId}, context) => {
      queryClient.setQueryData('lists', context.prevLists);
    },
    onSettled: () => {
      queryClient.invalidateQueries('lists');
    }
  });
  return {removeListItem}
}

const StyledDialog = styled(Dialog)({
  '&[data-reach-dialog-content]': {
    width: '20vw',
    height: '70vh',
    margin: '15vh auto',
    background: 'white',
    padding: '2rem',
    outline: 'none',
    display: 'flex',
    color: 'var(--primary-inverse)',
    flexDirection: 'column',
    overflowY: 'auto',
    borderRadius: '10px',
    button: {
      placeSelf: 'flex-end',
      background: 'transparent',
      border: 'none',
      cursor: 'pointer',
      svg: {
        width: '3rem',
        height: '3rem'
      }
    },
    ul: {
      paddingTop: '4rem',
      listStyle: 'none',
      li: {
        fontSize: 'var(--h4)',
        cursor: 'pointer',
      }
    },
    form: {
      display: 'flex',
      input: {
        width: '100%',
        border: 'none',
        borderBottom: '1.5px solid black',
        background: 'transparent',
        padding: '0.25rem 1rem',
        margin: '1rem 0',
        transition: 'border-color 235ms ease-out',
        fontSize: 'var(--h4)',
        ':focus': {
          borderColor: 'var(--secondary)',
          outline: 'none'
        }
      },
      button: {
        margin: 'auto 0'
      }
    },
    '@media(max-width: 640px)': {
      width: '90vw',
    }
  },
})
