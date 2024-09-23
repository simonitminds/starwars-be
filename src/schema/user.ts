import { builder } from "../builder";

builder.prismaObject("User", {
  description: "A user",
  name: "AuthInputObject",
  fields: (t) => ({
    id: t.exposeInt("id"),
    name: t.exposeString("name"),
    items: t.relation("items"),
    wallet: t.exposeFloat("wallet"),
    role: t.exposeString("role"),
  }),
});
