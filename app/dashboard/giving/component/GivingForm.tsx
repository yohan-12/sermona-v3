"use client";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { createBrowserClient } from "@supabase/ssr";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import { Label } from "../../../../components/ui/label";
import { Icons } from "../../../../components/icons";
import { useEffect, useState } from "react";
import { createGiving } from "@/lib/actions/givingActions";

export type MemberNameId = {
  id: string;
  name: string;
};

export const givingSchema = z.object({
  memberId: z.string(),
  amount: z.number(),
  category: z.string().optional(),
  method: z.string().optional(),
  notes: z.string().optional(),
  dateId: z.string(),
});
export type GivingFormData = z.infer<typeof givingSchema>
interface GivingFormProps {
  dateId: string;
  handleGivingSubmit: (dateId:string) => void | Promise<void>
}
const GivingForm = ({ dateId, handleGivingSubmit }: GivingFormProps) => {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [members, setMembers] = useState<MemberNameId[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [filteredMembers, setFilteredMembers] = useState<MemberNameId[]>([]);
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<GivingFormData>({
    resolver: zodResolver(givingSchema),
  });
  useEffect(() => {
    setValue("dateId", dateId); // This sets the dateId in the form's state
  }, [dateId, setValue]);

  const onSubmit: SubmitHandler<GivingFormData> = async (data) => {
    try {
      await createGiving(data);
      handleGivingSubmit(dateId)
      reset();
      setInputValue("");
      setIsSheetOpen(false);
    } catch (error) {
      console.error("submit action error", error);
    }

  };
  useEffect(() => {
    const fetchMembers = async () => {
      let { data: member, error } = await supabase
        .from("member")
        .select("name, id");

      if (error) {
        console.error("Error fetching members from supabase", error);
      } else {
        setMembers(member || []);
      }
    };
    fetchMembers();
  }, []);
  useEffect(() => {
    if (inputValue) {
      setFilteredMembers(
        members.filter((member) =>
          member.name.toLowerCase().includes(inputValue.toLowerCase())
        )
      );
    } else {
      setFilteredMembers([]);
    }
  }, [inputValue, members]);

  const handleSelectMember = (memberId: string, memberName: string) => {
    setSelectedMemberId(memberId);
    setInputValue(memberName);
    setValue("memberId", memberId);
    setFilteredMembers([]);
  };

  return (
    <>
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetTrigger asChild>
          <Button variant="default">
            <Plus className="w-4 h-4 mr-2" />
            헌금 추가
          </Button>
        </SheetTrigger>
        <SheetContent className="p-4">
          <SheetHeader>
            <SheetTitle className="text-lg font-bold">
              교인 헌금 입력
            </SheetTitle>
          </SheetHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Autocomplete Member Input */}
            <div className="flex items-center space-x-2">
              {/* <AutoInput /> */}
              <Label htmlFor="memberName" className="min-w-[80px]">
                이름
              </Label>

              <Input
                {...register("memberId")}
                id="memberName"
                type="text"
                name="memberId"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="border p-2 rounded-md focus:border-blue-500 focus:outline-none"
                autoComplete="off"
              />
              {filteredMembers.length > 0 && (
                <div className=" w-full mt-1 border border-gray-200 rounded-md bg-white shadow-lg max-h-40 overflow-auto">
                  {filteredMembers.map((member) => (
                    <div
                      key={member.id}
                      className="cursor-pointer hover:bg-gray-100 p-2"
                      onClick={() => handleSelectMember(member.id, member.name)}
                    >
                      {member.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
            {/* Hidden input to store the selected member ID */}
            {/* <input type="hidden" {...register("memberId")} /> */}
            <div className="flex items-center space-x-2">
              <Label htmlFor="amount" className="min-w-[80px]">
                액수
              </Label>
              <Input
                {...register("amount", { valueAsNumber: true })}
                id="amount"
                type="number"
                name="amount"
                className="flex-1 border p-2 rounded-md focus:border-blue-500 focus:outline-none"
              />
            </div>
            {errors.amount && (
              <div className="text-red-500 text-sm">
                {errors.amount.message}
              </div>
            )}
            <div className="flex items-center space-x-2">
              <Label htmlFor="category" className="min-w-[80px]">
                종류
              </Label>
              <Input
                {...register("category")}
                id="category"
                name="category"
                type="text"
                className="flex-1 border p-2 rounded-md focus:border-blue-500 focus:outline-none"
              />
            </div>
            {errors.category && (
              <div className="text-red-500 text-sm">
                {errors.category.message}
              </div>
            )}
            <div className="flex items-center space-x-2">
              <Label htmlFor="method" className="min-w-[80px]">
                지불 방법
              </Label>
              <Input
                {...register("method")}
                id="method"
                name="method"
                type="text"
                className="flex-1 border p-2 rounded-md focus:border-blue-500 focus:outline-none"
              />
            </div>
            {errors.method && (
              <div className="text-red-500 text-sm">
                {errors.method.message}
              </div>
            )}
            <div className="flex items-center space-x-2">
              <Label htmlFor="notes" className="min-w-[80px]">
                메모
              </Label>
              <Input
                {...register("notes")}
                id="notes"
                name="notes"
                type="text"
                className="flex-1 border p-2 rounded-md focus:border-blue-500 focus:outline-none"
              />
            </div>
            {errors.notes && (
              <div className="text-red-500 text-sm">{errors.notes.message}</div>
            )}
            <Input type="hidden" {...register("dateId")} />
            <SheetFooter className="flex justify-center space-x-3">
              <SheetClose asChild>
                <Button variant="outline">닫기</Button>
              </SheetClose>
              <Button disabled={isSubmitting} type="submit" variant="default">
                {isSubmitting && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}{" "}
                저장
              </Button>
            </SheetFooter>{" "}
          </form>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default GivingForm;
