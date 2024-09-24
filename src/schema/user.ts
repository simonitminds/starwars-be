import { User } from "@prisma/client";
import { builder, prisma } from "../builder";

interface Context {
  user: User;
}

const isAdmin = (ctx: Context) => {
  return !ctx.user || ctx.user.role !== "ADMIN";
};
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

builder.queryType({
  fields: (t) => ({
    //Get all users (admin only)
    users: t.prismaField({
      type: ["User"],
      resolve: (_, args, { db }, ctx) => {
        if (isAdmin(ctx)) throw new Error("Not authorized");
        return prisma.user.findMany();
      },
    }),
  }),
});
