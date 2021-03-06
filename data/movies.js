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

export async function getMovieById(movieId) {
  const data = await request(gql`
      query {
        movie(movieId: ${movieId}) {
          id
          title 
          overview
          tagline
          backdropImage
          poster(imgSize: M)
          rating
          releaseDate
          directors {
            name
          }
          genres
          runtime
          credits {
            person {
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
            mediaType
          }
        }
      }
    `)
  return data.movie;
}
