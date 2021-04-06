import {gql} from 'graphql-request';
import {request} from 'utils'

const POPULAR_TV = gql`
  query {
    popularTv {
      id
      title 
      poster(imgSize: M)
      overview
    }
  }
`

export async function getPopularTv() {
  try {
    const data = await request(POPULAR_TV);
    return data.popularTv.slice(0, 5);
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getTvById(tvId) {
  try {
    const data = await request(gql`
      query {
        tv(tvId: ${tvId}) {
          id
          title 
          overview
          tagline
          backdropImage
          poster(imgSize: M)
          rating
          firstAirDate
          creadedBy {
            name
          }
          genres
          credits {
            artist {
              id
              name
              photo(imgSize:M)
            }
            role
          }
          related {
            id
            title
            poster(imgSize:M)
          }
        }
      }
    `);
    return data.tv;
  } catch (error) {
    console.log(error);
    return null;
  }
}
