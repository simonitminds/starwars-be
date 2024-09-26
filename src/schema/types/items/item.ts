import { builder } from "../..";

builder.prismaObject("Item", {
  fields: (t) => ({
    id: t.exposeID("id"),
    name: t.exposeString("name"),
    basePrice: t.exposeInt("basePrice"),
    type: t.relation("type"),
  }),
});

builder.prismaObject("ItemType", {
  fields: (t) => ({
    id: t.exposeID("id"),
    name: t.exposeString("name"),
    weight: t.exposeInt("weight"),
  })
})

