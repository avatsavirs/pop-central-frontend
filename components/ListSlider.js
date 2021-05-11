import {XCircleIcon} from '@heroicons/react/solid';
import {gql} from 'graphql-request';
import {useQueryClient, useMutation} from 'react-query'
import useAuth from 'hooks/useAuth';
import {authRequest} from 'utils';
import Image from 'next/image';
import Link from 'next/link';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export default function ListSlider({data, listId}) {
  const responsive = {
    desktop: {
      breakpoint: {max: 3000, min: 1300},
      items: 5,
      paritialVisibilityGutter: 60
    },
    tablet: {
      breakpoint: {max: 1300, min: 375},
      items: 3,
      paritialVisibilityGutter: 50
    },
    mobile: {
      breakpoint: {max: 375, min: 0},
      items: 1,
      paritialVisibilityGutter: 30
    }
  };
  const {removeListItem} = useRemoveListItem();
  return (
    <Carousel
      ssr
      deviceType={"desktop"}
      responsive={responsive}
      itemClass="slider-item"
      css={{
        width: '100%',
        '@media(max-width: 375px)': {
          width: '80%',
          margin: '0 auto'
        }
      }}
    >
      {data.map(item => {
        return (
          <div
            key={item.id}
            css={{
              display: 'relative',
              ':hover': {
                'a div>div': {
                  transform: 'translateY(0)'
                },
                'a div>img': {
                  transform: 'scale(1.05)'
                }
              },
            }}>
            <button css={{
              position: 'absolute',
              zIndex: 100,
              background: 'none',
              border: 'none',
              right: 10,
              color: '#fff',
              opacity: '0.5',
              ':hover, :focus': {
                opacity: '1',
                cursor: 'pointer',
                color: 'red'
              }
            }}
              onClick={() => {removeListItem({listId, listItemId: item.id})}}>
              <XCircleIcon width="3rem" />
            </button>
            <Link href={`/${item.mediaType}/${item.externalId}`} passHref>
              <a css={{
                ':focus': {
                  'div>div': {
                    transform: 'translateY(0)',
                  },
                  'div>img': {
                    transform: 'scale(1.05)'
                  }
                }
              }}>
                <div css={{
                  backgroundColor: 'white',
                  color: 'black',
                  height: '35rem',
                  position: 'relative',
                }} >
                  <Image css={{transition: 'transform 0.3s ease-in-out'}} src={item.image} layout="fill" objectFit="cover" />
                  <div css={{
                    zIndex: 100,
                    position: 'absolute',
                    background: 'linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.9),rgba(0, 0, 0, 1));',
                    bottom: '0',
                    width: '100%',
                    padding: '5px 0',
                    transform: 'translateY(100%)',
                    transition: 'transform 0.3s ease-in-out',
                    transformOrigin: '0 100%',
                    fontSize: 'var(--h3)',
                  }}>
                    <h3 css={{color: 'white', }}>{item.title}</h3>
                  </div>
                </div>
              </a>
            </Link>
          </div>
        );
      })}
    </Carousel>
  );
}

function useRemoveListItem() {
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
