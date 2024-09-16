import SchemaBuilder from '@pothos/core';
import { PrismaClient } from '@prisma/client';

const builder = new SchemaBuilder<{ Context: { db: PrismaClient } }>({});
type item = {
  id: number,
  name: string
}

const my = builder.objectRef<item>("items")

const prisma = new PrismaClient();

my.implement({
  description: "en liste af mine items",
  fields: (t) => ({
    name: t.exposeString('name'),
    id: t.exposeID("id")
  })
})

builder.queryType({
  fields: (t) => ({
    hello: t.string({
      args: {
        name: t.arg.string(),
      },
      resolve: (parent, { name }) => `hello, ${name || 'World'}`,
    }),
    items: t.field({
      type: [my],
      resolve: (_, args, { db }) => {
        return db.item.findMany()
      }
    })
  }),
});




export const schema = builder.toSchema();
