"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ColumnDef } from "@tanstack/react-table";
import { Expand, MoreVertical, Pen, XOctagon } from "lucide-react";
import Link from "next/link";
import { deleteMember } from "../actions";

export type Member = {
  id: string;
  created_at: string;
  name: string;
  familyHead?: string | null;
  address?: string | null;
  // gender: "남자" | "여자";
  gender: string | null;
  ssn?: string | null;
  birthday: string | null;
  // solarLunarType: "양력" | "음력";
  solarLunarType: string | null;
  // dutyInChurch?: "장로" | "안수집사" | "권사" | "집사" | "전도사";
  dutyInChurch?: string | null;
  cellGroup?: string | null;
  phone: string | null;
  registeredDate: string | null;
  notes?: string | null;
};

export const columns: ColumnDef<Member>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: () => <div className="whitespace-nowrap">이름</div>,
  },
  {
    accessorKey: "familyHead",
    header: () => <div className="whitespace-nowrap">가족대표</div>,
  },
  {
    accessorKey: "address",
    header: () => <div className="whitespace-nowrap">주소</div>,
    cell: ({ row }) => {
      return <div className="whitespace-nowrap">{row.getValue("address")}</div>;
    },
  },
  {
    accessorKey: "gender",
    header: () => <div className="whitespace-nowrap">성별</div>,
  },
  {
    accessorKey: "ssn",
    header: () => <div className="whitespace-nowrap">주민번호</div>,
  },
  {
    accessorKey: "birthday",
    header: () => <div className="whitespace-nowrap">생년월일</div>,
    // cell: ({ row }) => {
    //   const dateValue = new Date(row.getValue("birthdate"));
    //   const formattedDate = dateValue.toISOString().slice(0, 10);
    //   return formattedDate;
    // },
  },
  {
    accessorKey: "solarLunarType",
    header: () => <div className="whitespace-nowrap">음/양</div>,
  },
  {
    accessorKey: "dutyInChurch",
    header: () => <div className="whitespace-nowrap">현직분</div>,
  },
  {
    accessorKey: "cellGroup",
    header: () => <div className="whitespace-nowrap">구역</div>,
  },
  {
    accessorKey: "phone",
    header: "휴대폰",
  },
  {
    accessorKey: "registeredDate",
    header: () => <div className="whitespace-nowrap">등록일</div>,
    // cell: ({ row }) => {
    //   const dateValue = new Date(row.getValue("registeredDate"));
    //   const formattedDate = dateValue.toISOString().slice(0, 10);
    //   return formattedDate;
    // },
  },
  {
    accessorKey: "notes",
    header: () => <div className="whitespace-nowrap">추가정보</div>,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const member = row.original;
      const fields = [
        { label: "이름", value: member.name, key: "name" },
        { label: "가족대표", value: member.familyHead, key: "familyHead" },
        { label: "주소", value: member.address, key: "address" },
        { label: "성별", value: member.gender, key: "gender" },
        { label: "주민번호", value: member.ssn, key: "ssn" },
        { label: "생년월일", value: member.birthday, key: "birthday" },
        { label: "음/양", value: member.solarLunarType, key: "solarLunarType" },
        { label: "현직분", value: member.dutyInChurch, key: "dutyInChurch" },
        { label: "구역", value: member.cellGroup, key: "cellGroup" },
        { label: "휴대폰", value: member.phone, key: "phone" },
        {
          label: "등록일",
          value: member.registeredDate,
          key: "registeredDate",
        },
        { label: "추가정보", value: member.notes, key: "notes" },
      ];

      return (
        <Dialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>작업</DropdownMenuLabel>
              {/* <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(member.id)}
              >
                Copy payment ID
              </DropdownMenuItem>
              <DropdownMenuSeparator /> */}
              <DropdownMenuItem>
                <DialogTrigger className="flex items-center">
                  <Expand className="mr-2 h-4 w-4" />
                  보기
                </DialogTrigger>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/dashboard/people/${member.id}/edit`}>
                  <>
                    <Pen className="mr-2 h-4 w-4" />
                    편집
                  </>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => deleteMember(member.id)}>
                <XOctagon className="mr-2 h-4 w-4" />
                삭제
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-center">상세 정보</DialogTitle>
              <DialogDescription className="text-center">
                교인 상세 정보를 간편히 보세요
              </DialogDescription>
            </DialogHeader>
            {/* Display member details here */}
            <Card>
              <CardContent>
                <div className="grid w-full items-center gap-4">
                  {fields.map(({ label, value, key }) =>
                    value ? (
                      <div className="flex flex-col space-y-1.5" key={key}>
                        <Label htmlFor={key}>{label}</Label>
                        <Input
                          id={key}
                          value={value || ""}
                          readOnly
                          className="bg-gray-100"
                        />
                      </div>
                    ) : null
                  )}
                </div>
              </CardContent>
            </Card>
            <DialogFooter className="sm:justify-start">
              <DialogClose asChild>
                <Button type="button" variant="default" className="w-full">
                  닫기
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      );
    },
  },
];
