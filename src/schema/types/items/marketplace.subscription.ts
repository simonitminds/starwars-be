import { builder, prisma } from "../..";
import { itemObject } from "./item";

builder.subscriptionFields((t) => ({
  incrementedCount: t.field({
    type: [itemObject],
    subscribe: (_parent, _args, ctx) => ctx.pubSub.subscribe('ITEMS_UPDATE'),
    resolve: () => prisma.item.findMany(),
  }),
}));
