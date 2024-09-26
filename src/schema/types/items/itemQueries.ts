import { builder, prisma } from "../..";

// Get items
builder.queryField("items", (t) =>
  t.prismaField({
    type: ["Item"],
    resolve: (query) => prisma.item.findMany(query),
  })
);


// Get item
builder.queryField("item", (t) =>
  t.prismaField({
    type: "Item",
    args: {
      id: t.arg.id({ required: true }),
    },
    resolve: (query, _, args) => prisma.item.findUnique({ ...query, where: { id: args.id } }),
  })
);
