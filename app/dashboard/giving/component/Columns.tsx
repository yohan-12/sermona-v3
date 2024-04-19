"use client";
import { Icons } from "@/components/icons";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreVertical } from "lucide-react";
import EditGivingForm from "./EditGivingForm";
export type Giving = {
  id: string;
  memberName: string;
  amount: number;
  category: string | null;
  method: string | null;
  notes: string | null;
};

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteGiving } from "@/lib/actions/givingActions";
import { use, useState } from "react";

type handleFormSubmit = (dateId: string) => Promise<void>;

export const getColumns = (
  handleFormSubmit: handleFormSubmit
): ColumnDef<Giving>[] => [
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
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [isSheetOpen, setIsSheetOpen] = useState(false);


      const giving = row.original;
      return (
        <>
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
                className="hover:font-bold"
                onClick={() => setIsSheetOpen(true)}
              >
                정보 수정
              </DropdownMenuItem>
              <DropdownMenuItem
                className="relative h-[30px] w-40 overflow-hidden bg-white text-red-500 shadow-2xl transition-all before:absolute before:left-0 before:top-0 before:h-full before:w-0 before:duration-500 after:absolute after:right-0 after:top-0 after:h-full after:w-0 after:duration-500 hover:text-white hover:shadow-red-500 hover:before:w-2/4 hover:before:bg-red-500 hover:after:w-2/4 hover:after:bg-red-500"
                // className="hover:bg-red-500 hover:text-white"
                onClick={async (): Promise<void> => {
                    const dateID = await deleteGiving(giving.id);
                    handleFormSubmit(dateID);
                }}
              >
                  <span className="relative z-10">삭제</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetContent className="p-4">
              <SheetHeader>
                <SheetTitle className="text-lg font-bold">
                  기록 수정 하기
                </SheetTitle>
              </SheetHeader>
              <EditGivingForm
                giving={giving}
                onClose={() => setIsSheetOpen(false)}
                handleFormSubmit={handleFormSubmit}
              />
            </SheetContent>
          </Sheet>
        </>
      );
    },
  },
];
