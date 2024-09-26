import { builder, prisma } from "../..";



builder.mutationField("itemTypeCreate", (t) =>
  t.prismaField({
    type: "ItemType",
    args: {
      name: t.arg.string({ required: true }),
      weight: t.arg.int({ required: true }),
    },
    resolve: (query, _, args) => prisma.itemType.create({ ...query, data: { ...args } }),
  })
);


const inputType = builder.inputType("ItemCreateInput", {
  fields: (t) => ({
    name: t.string({ required: true }),
    basePrice: t.int({ required: true }),
    typeId: t.string({ required: true }),
  }),
})

builder.mutationField("itemCreate", (t) =>
  t.prismaField({
    type: "Item",
    args: {
      item: t.arg({ type: inputType, required: true }),
    },
    resolve: (query, _, args) => prisma.item.create({ ...query, data: { ...args.item } }),
  })
);

builder.mutationField("itemUpdate", (t) =>
  t.prismaField({
    type: "Item",
    args: {
      id: t.arg.id({ required: true }),
      item: t.arg({ type: inputType, required: true }),
    },
    resolve: (query, _, args) => prisma.item.update({ ...query, where: { id: args.id }, data: { ...args.item, id: args.id } }),
  })
);
