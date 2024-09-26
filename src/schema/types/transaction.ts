import { builder } from "..";


builder.prismaObject("Transaction", {
  fields: (t) => ({
    id: t.exposeID("id"),
    amount: t.exposeInt("amount"),
    item: t.relation("item"),
    user: t.relation("user"),
    transactionType: t.exposeString("transactionType"),
    date: t.expose("date", { type: "Date" }),
  })
})
