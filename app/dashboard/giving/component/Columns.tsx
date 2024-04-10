"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Giving = {
  memberName: string;
  amount: number;
  category: string | null;
  method: string | null;
  notes: string | null;
};

export const columns: ColumnDef<Giving>[] = [
  {
    accessorKey: "memberName",
    header: "Name",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "method",
    header: "Method",
  },
  {
    accessorKey: "notes",
    header: "Notes",
  },
];
