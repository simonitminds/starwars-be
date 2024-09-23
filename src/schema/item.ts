import { builder, prisma } from "../builder";

builder.prismaObject("Item", {
  description: "An item for sale",
  fields: (t) => ({
    id: t.exposeID("id"),
    name: t.exposeString("name"),
    type: t.exposeString("type"),
    price: t.exposeFloat("price"),
    description: t.exposeString("description"),
    user: t.relation("user"),
  }),
});

interface ItemInputObject {
  name: string;
  type: string;
  price: number;
  description: string;
  userId: number;
}

const itemInputRef = builder.inputType("ItemInput", {
  fields: (t) => ({
    id: t.int({ required: true }),
    name: t.string({ required: true }),
    type: t.string({ required: true }),
    price: t.float({ required: true }),
    description: t.string({ required: true }),
    userId: t.int({ required: true }),
  }),
});

builder.mutationField("updateItem", (t) =>
  t.prismaField({
    type: "Item",
    args: {
      item: t.arg({ type: itemInputRef, required: true }),
    },
    resolve: async (q, _, { item }) => {
      return prisma.item.update({
        where: {
          id: item.id,
        },
        data: {
          ...item,
        },
      });
    },
  })
);
