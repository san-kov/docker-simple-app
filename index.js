import { GraphQLServer } from 'graphql-yoga';
import { createClient } from 'then-redis';
import 'babel-polyfill';

const client = createClient({
  host: 'redis-server'
});

const typeDefs = `  
  type Query {
    visits: Int!
  }
`;

const resolvers = {
  Query: {
    visits: async () => client.get('visits')
  }
};

const server = new GraphQLServer({ typeDefs, resolvers });

server.start({ playground: '/' }, () =>
  console.log('Server is running on localhost:4000')
);
