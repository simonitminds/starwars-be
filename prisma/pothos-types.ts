/* eslint-disable */
import type { Prisma, User, Item } from "@prisma/client";
export default interface PrismaTypes {
    User: {
        Name: "User";
        Shape: User;
        Include: Prisma.UserInclude;
        Select: Prisma.UserSelect;
        OrderBy: Prisma.UserOrderByWithRelationInput;
        WhereUnique: Prisma.UserWhereUniqueInput;
        Where: Prisma.UserWhereInput;
        Create: {};
        Update: {};
        RelationName: "items";
        ListRelations: "items";
        Relations: {
            items: {
                Shape: Item[];
                Name: "Item";
                Nullable: false;
            };
        };
    };
    Item: {
        Name: "Item";
        Shape: Item;
        Include: Prisma.ItemInclude;
        Select: Prisma.ItemSelect;
        OrderBy: Prisma.ItemOrderByWithRelationInput;
        WhereUnique: Prisma.ItemWhereUniqueInput;
        Where: Prisma.ItemWhereInput;
        Create: {};
        Update: {};
        RelationName: "user";
        ListRelations: never;
        Relations: {
            user: {
                Shape: User;
                Name: "User";
                Nullable: false;
            };
        };
    };
}