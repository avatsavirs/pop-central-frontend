import {GraphQLClient} from 'graphql-request'
export async function request(query, variables) {
  try {
    const client = new GraphQLClient("http://localhost:4000");
    const data = await client.request(query, variables);
    return data;
  } catch ({response}) {
    throw response.errors[0];
  }
}

