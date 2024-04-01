"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, XOctagon, Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createBrowserClient } from "@supabase/ssr";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { createDate, deleteDate } from "@/lib/actions/givingActions";


const FormSchema = z.object({
  dob: z.date(),
});
type DatePickerFormProps = {
  onDateSelect: (date: string | null) => void;
};

export function DatePickerForm({ onDateSelect }: DatePickerFormProps) {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
 useEffect(()=> {
  const fetchDates = async() => {
      let { data: date, error } = await supabase.from("date").select("id, title");
      if(error){
        console.error("err in fetching date from supabase", error)
      }else{
         console.log(date);
      }
    if(date){
      setSelectedDates(date.map(date => ({id:date.id, title:date.title})))
    }
  }
  fetchDates()
 }, [])

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    if (data.dob) {
      const formattedDate = format(data.dob, "yyyy-MM-dd");
      const dateArray = await createDate(formattedDate);
      if (dateArray && dateArray.length>0) {
        const date = dateArray[0]
        addDate({id: date.id, title: date.title});
        form.reset();
      } else {
        console.error("Returned Date from Supabase is null");
      }
    }
  }
  const [selectedDates, setSelectedDates] = useState<{id:string; title:string}[]>([]);

  const addDate = (newDate: {id:string; title:string}) => {
    setSelectedDates((prev) => [...prev, newDate]);
  };

  const removeDate = async (index: number) => {
    const dateId = selectedDates[index].id
    try {
          await deleteDate(dateId);
          setSelectedDates((currentDates) =>
            currentDates.filter((_, i) => i !== index)
          );
          onDateSelect(null);
    } catch (error) {
      console.error("Error deleting date", error)
    }

  };

  return (
    <div className="flex flex-col p-4 space-y-3n">
      <div className="flex flex-col space-y-2">
        {[...selectedDates].reverse().map((date, reversedIndex) => {
          // Calculate the actual index in the original array
          const actualIndex = selectedDates.length - 1 - reversedIndex;

          return (
            <div key={actualIndex} className="flex items-center justify-normal">
              <span className="">{date.title}</span>
              <div className="space-x-1">
                <Button
                  variant="outline"
                  onClick={() => {
                    /* Function to display data for the date */
                    onDateSelect(date.title);
                  }}
                  aria-label="Display data"
                >
                  <Plus className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  onClick={() => removeDate(actualIndex)}
                  aria-label="Delete date"
                >
                  <XOctagon className="w-4 h-4" />
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-5">
          <FormField
            control={form.control}
            name="dob"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>날짜를 선택 하세요.</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                    <div className="flex justify-center mb-3">
                      <Button
                        type="submit"
                        onClick={() => {
                          form.handleSubmit(onSubmit)();
                        }}
                      >
                        선택
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  선택한 날짜에 재정 정보를 추가할 수 있어요.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* <Button type="submit">Submit</Button> */}
        </form>
      </Form>
    </div>
  );
}
