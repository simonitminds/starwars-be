import { createPubSub, createYoga } from 'graphql-yoga';
import { createServer } from 'node:http';
import { builder } from './schema';
import { useServer } from 'graphql-ws/lib/use/ws'
import { WebSocketServer } from 'ws'


builder.queryType({});
builder.mutationType({});
builder.subscriptionType({});

const pubsub = createPubSub();
export type PubSub = typeof pubsub

const yoga = createYoga({
  schema: builder.toSchema(),
  context: (req) => ({
    pubSub: pubsub,

  }),
  graphiql: {
    subscriptionsProtocol: 'WS', // Use 'WS' for the graphql-ws protocol
  },
});

const server = createServer(yoga);

const wsServer = new WebSocketServer({
  server: server,
  path: yoga.graphqlEndpoint
})

// Integrate Yoga's Envelop instance and NodeJS server with graphql-ws
useServer(
  {
    execute: (args: any) => args.rootValue.execute(args),
    subscribe: (args: any) => args.rootValue.subscribe(args),
    onSubscribe: async (ctx, msg) => {
      const { schema, execute, subscribe, contextFactory, parse, validate } = yoga.getEnveloped({
        ...ctx,
        req: ctx.extra.request,
        socket: ctx.extra.socket,
        params: msg.payload
      })

      const args = {
        schema,
        operationName: msg.payload.operationName,
        document: parse(msg.payload.query),
        variableValues: msg.payload.variables,
        contextValue: await contextFactory(),
        rootValue: {
          execute,
          subscribe
        }
      }

      const errors = validate(args.schema, args.document)
      if (errors.length) return errors
      return args
    }
  },
  wsServer
)

server.listen(42069);
