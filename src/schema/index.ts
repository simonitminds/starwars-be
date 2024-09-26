import SchemaBuilder from '@pothos/core';
import { PrismaClient } from '@prisma/client';
import PrismaPlugin from '@pothos/plugin-prisma';
import type PrismaTypes from '@pothos/plugin-prisma/generated';

export const prisma = new PrismaClient();
export const builder = new SchemaBuilder<{
  PrismaTypes: PrismaTypes,
  Scalars: {
    Date: {
      Input: Date;
      Output: Date;
    };
  },
  Context: {}
}>({
  plugins: [PrismaPlugin],
  prisma: {
    client: prisma,
  }
});

import "./types"
