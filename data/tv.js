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
