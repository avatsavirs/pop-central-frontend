import {gql} from 'graphql-request'
import {request} from 'utils'

export async function getPersonById(personId) {
  try {
    const data = await request(gql`
      query {
        person(personId: ${personId}) {
          id
          name
          biography
          credits {
            project {
              ... on Movie {
                id
                title
                releaseDate
                mediaType
                poster(imgSize: SM)
              }
                ... on TV {
                  id
                  title
                  releaseDate:firstAirDate
                  mediaType
                poster(imgSize: SM)
                }
            }
            roles
          }
          department
          birthday
          gender
          photo(imgSize: M)
          deathday
        }
      }
    `)
    return data.person;
  } catch (error) {
    console.log(error);
    return null;
  }
}
