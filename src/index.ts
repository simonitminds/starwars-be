import { createYoga } from 'graphql-yoga';
import { createServer } from 'node:http';
import { builder } from './schema';


builder.queryType({});
builder.mutationType({});

const yoga = createYoga({
  schema: builder.toSchema(),
  context: (req) => ({})
});

const server = createServer(yoga);

server.listen(42069);
