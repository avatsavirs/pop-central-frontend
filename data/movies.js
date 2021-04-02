import {gql} from 'graphql-request'
import {request} from 'utils'

const POPULAR_MOVIES = gql`
  query {
    popularMovies {
      id
      title 
      poster(imgSize: M)
      overview
    }
  }
`;

export async function getPopularMovies() {
  try {
    const data = await request(POPULAR_MOVIES);
    return data.popularMovies.slice(0, 5);
  } catch (error) {
    console.log(error);
    return []
  }
}
