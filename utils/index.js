import {GraphQLClient} from 'graphql-request'
export async function request(query) {
  const client = new GraphQLClient("http://localhost:4000");
  const data = await client.request(query);
  return data;
}

