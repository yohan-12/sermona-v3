"use client";

import { ColumnDef } from "@tanstack/react-table";

export type Giving = {
  id: string; 
  createdAt: string;
  memberId: string; 
  name: string,
  amount: number;
  category: string; // The category of the giving, such as "Tithe", "Offering", etc. This could be managed as an enum.
  date: string; 
  method: string | null; // The method of giving, e.g., "Cash", "Check", "Online", which could also be an enum
  notes?: string | null; 
};
// Assuming you have a function to get a member's name by their ID
const getMemberNameById = (memberId: string): string => {
  // Implement the logic to return the member's name based on the memberId
  // This could involve looking up the member in a local state, context, or making an API call
  return "Member Name"; // Placeholder return value
};

export const columns: ColumnDef<Giving>[] = [
  {
    accessorFn: (row) => getMemberNameById(row.memberId),
    id: "memberName", // 'id' is needed for columns created using accessorFn
    header: "이름",
  },
  {
    accessorKey: "amount",
    header: "금액",
  },
  {
    accessorKey: "category",
    header: "종류", //주일헌금, 십일조, 감사헌금, 선교헌금, 구제헌금, 특별헌금 
  },
  {
    accessorKey: "method",
    header: "헌금 방법", // Assuming 'Type' refers to the 'method' of giving
  },
  {
    accessorKey: "notes",
    header: "메모", // Assuming 'Memo' refers to the 'notes'
  },
];