"use client";

import { ColumnDef } from "@tanstack/react-table";

export type Giving = {
  id: string;
  memberName: string;
  amount: number;
  category: string | null;
  method: string | null;
  notes: string | null;
};
import { MoreVertical, ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteGiving } from "@/lib/actions/givingActions";

export const columns: ColumnDef<Giving>[] = [
  {
    accessorKey: "memberName",
    header: "이름",
  },
  {
    accessorKey: "amount",
    // header: "Amount",
    header: ({ column }) => {
      return (
        <Button
          variant="outline"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          금액
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("ko-KR", {
        style: "currency",
        currency: "KRW",
        minimumFractionDigits: 0,
      }).format(amount);

      return <div className="">{formatted}</div>;
    },
  },
  {
    accessorKey: "category",
    header: "종류",
  },
  {
    accessorKey: "method",
    header: "헌금방식",
  },
  {
    accessorKey: "notes",
    header: "노트",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const giving = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>작업</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(giving.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>편집</DropdownMenuItem>
            <DropdownMenuItem
              className="hover:bg-red-500 hover:text-white"
              onClick={async () => await deleteGiving(giving.id)}
            >
              삭제
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
