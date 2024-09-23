import { User } from "@prisma/client";
import { builder, prisma } from "../builder";
import { sign, verify } from "jsonwebtoken";

builder.queryType({
  fields: (t) => ({
    //Get all users
    users: t.prismaField({
      type: ["User"],
      resolve: (_, args, { db }) => {
        return prisma.user.findMany();
      },
    }),
    //Get all items
    items: t.prismaField({
      type: ["Item"],
      resolve: (hj, _, args, { user }) => {
        return prisma.item.findMany();
      },
    }),

    //Get a user by id
    item: t.prismaField({
      type: "Item",
      args: {
        id: t.arg.int({ required: true }),
      },
      resolve: (p, _, args, ctx) => {
        return prisma.item.findUnique({
          where: {
            id: args.id,
          },
        });
      },
    }),
  }),
});

export const omega_token_secret =
  process.env.JWT_SECRET || "omega_token_secret";

export const a = builder.mutationType({
  fields: (t) => ({
    //Create a new user
    createUser: t.prismaField({
      type: "User",
      args: {
        name: t.arg.string({ required: true }),
      },
      resolve: (q, _, args, {}) => {
        return prisma.user.create({
          data: args,
        });
      },
    }),

    //Create a new item
    createItem: t.prismaField({
      type: "Item",
      args: {
        name: t.arg.string({ required: true }),
        type: t.arg.string({ required: true }),
        price: t.arg.float({ required: true }),
        description: t.arg.string({ required: true }),
        userId: t.arg.int({ required: true }),
      },
      resolve: async (q, _, p) => {
        console.log(q);
        return prisma.item.create({
          data: {
            ...p,
          },
        });
      },
    }),
  }),
});
