"use client";
import * as React from "react";
import { format } from "date-fns";
import { Pencil } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { createDate, editDate } from "@/lib/actions/givingActions";
interface EditBtnProps {
    id: string;
    title: string;
    description: string;
}
export const dateFormSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
});

export type FormFields = z.infer<typeof dateFormSchema>;

export default function EditBtn({id, title, description}: EditBtnProps) {
  const [date, setDate] = React.useState<Date>();
  const [popoverOpen, setPopoverOpen] = React.useState(false);
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(dateFormSchema),
    defaultValues: {
        title,
        description,
    }
  });
  //! Use setValue function from react-hook to set title field to user selected value
  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setDate(selectedDate);
      setValue("title", format(selectedDate, "yyyy-MM-dd"));
    } else {
      setDate(undefined);
      setValue("title", ""); // Clear the title field
    }
  };

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      await editDate(id, data.title, data.description)
      reset();
      setPopoverOpen(false);
    } catch (error) {
      setError("root", {
        message: "This email is already taken",
      });
    }
  };

  return (
    <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <Pencil className="w-4 h-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateSelect}
            initialFocus
          />
          <Input {...register("title")} type="text" placeholder="제목" />
          <Input
            {...register("description")}
            type="text"
            placeholder="추가 메모"
          />
          <Button disabled={isSubmitting} type="submit">
            {isSubmitting ? "Loading..." : "Submit"}
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  );
}
