import { sign } from "jsonwebtoken";
import { builder, prisma } from "../builder";
import { User } from "@prisma/client";

interface AuthInputObject {
  user: User;
  token: string;
  wallet: number;
  role: string;
}

export const AuthObject = builder.objectRef<AuthInputObject>("AuthObject");

AuthObject.implement({
  fields: (t) => ({
    user: t.prismaField({
      type: "User",
      resolve: (q, parent) => {
        return parent.user;
      },
    }),
    token: t.exposeString("token"),
  }),
});

builder.mutationField("login", (t) =>
  t.field({
    type: AuthObject,
    args: {
      username: t.arg.string({ required: true }),
    },
    resolve: async (_, args, ctx) => {
      let user = await prisma.user.findUnique({
        where: { name: args.username },
      });
      if (!user) {
        user = await prisma.user.create({
          data: { name: args.username, wallet: 10000, role: "USER" },
        });
      }

      const token = sign({ sub: user.id }, "secret");

      return { user, token, wallet: user.wallet, role: user.role };
    },
  })
);
