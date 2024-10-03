import { builder } from "../..";

export const itemObject = builder.prismaObject("Item", {
  fields: (t) => ({
    id: t.exposeID("id"),
    name: t.exposeString("name"),
    basePrice: t.exposeInt("basePrice"),
    type: t.relation("type"),
  }),
});

export const itemTypeObject = builder.prismaObject("ItemType", {
  fields: (t) => ({
    id: t.exposeID("id"),
    name: t.exposeString("name"),
    weight: t.exposeInt("weight"),
  })
})
