import { builder } from "../..";

builder.scalarType("Date", {
  serialize: (value) => value.toISOString(),
  parseValue: (value) => {
    if (typeof value === "string") {
      return new Date(value);
    }
    return new Date()
  },
  parseLiteral: (value) => {
    if (typeof value === "string") {
      return new Date(value);
    }
    return new Date()
  },
})
