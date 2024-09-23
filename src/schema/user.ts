import { builder } from "../builder";

builder.prismaObject("User", {
  description: "A user",
  name: "AuthInputObject",
  fields: (t) => ({
    id: t.exposeID("id"),
    name: t.exposeString("name"),
    items: t.relation("items"),
  }),
});
