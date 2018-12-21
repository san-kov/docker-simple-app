import { GraphQLServer } from 'graphql-yoga';
import { createClient } from 'then-redis';
import 'babel-polyfill';

const client = createClient({
  host: 'redis-server'
});

const typeDefs = `  
  type Query {
    hello(name: String): String!
    bye: String!
    visits: Int!
  }
`;

const resolvers = {
  Query: {
    hello: (_, { name }) => `Hello ${name || 'World'}`,
    bye: () => 'bye',
    visits: async () => {
      const visits = await client.get('visits');
      await client.set('visits', +visits + 1);
      process.exit(0);

      return visits;
    }
  }
};

const server = new GraphQLServer({ typeDefs, resolvers });

server.start({ playground: '/' }, () =>
  console.log('Server is running on localhost:4000')
);
