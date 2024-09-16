import { createYoga } from 'graphql-yoga';
import { createServer } from 'node:http';
import { schema } from './schema';
import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();
const yoga = createYoga({
  schema: schema,
  context: (req) => ({
    db: prisma,
  })
});

const server = createServer(yoga);

server.listen(42069);
