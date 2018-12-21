"use strict";

var _graphqlYoga = require("graphql-yoga");

var typeDefs = "\n  type Query {\n    hello(name: String): String!\n  }\n";
var resolvers = {
  Query: {
    hello: function hello(_, _ref) {
      var name = _ref.name;
      return "Hello ".concat(name || 'World');
    }
  }
};
var server = new _graphqlYoga.GraphQLServer({
  typeDefs: typeDefs,
  resolvers: resolvers
});
server.start({
  playground: '/'
}, function () {
  return console.log('Server is running on localhost:4000');
});