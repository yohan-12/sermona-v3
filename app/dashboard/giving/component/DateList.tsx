"use client";
import { createBrowserClient } from "@supabase/ssr";
import { Fragment, useState } from "react";
import { DataTable } from "./DataTable";
import { columns } from "./Columns";
import DateForm from "./DateForm";
import {Plus, XOctagon} from "lucide-react"
import { Button } from "@/components/ui/button";
interface DateListProps {
  dates: { id: any; title: any }[] | null | undefined;
}
interface GivingData {
  amount: number;
  category: string;
  memberName: string;
  method: string;
  notes: string;
}

const DateList = ({ dates }: DateListProps) => {
   const supabase = createBrowserClient(
     process.env.NEXT_PUBLIC_SUPABASE_URL!,
     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
   );
  const [dateId, setDateId] = useState<string | null>(null);
  const [dateTitle, setDateTitle] = useState<string | null>(null);
  const [givingData, setGivingData] = useState<GivingData[]>([])
  const handleFormSubmit = async (dateId: string) => {
    await getGivingData(dateId)
  }
  const getGivingData = async (dateId:string) => {
    const { data, error } = await supabase
      .from("giving")
      .select("member: memberId (name), amount, category, method, notes")
      .eq("dateId", dateId);
    if (error) {
      console.error("error fetching giving data", error);
      return null;
    }
    // Transform data to include member name directly
    const transformedData = data.map((giving) => ({
      amount: giving.amount,
      category: giving.category,
      method: giving.method,
      notes: giving.notes,
      memberName: giving.member.name, // Directly include memberName
    }));

    setGivingData(transformedData)
  
  }
  const handleClick = async (id: string, title: string) => {
    await getGivingData(id)
    setDateId(id);
    setDateTitle(title)
  };
  const removeDate = () => {
    setDateId(null)
    setGivingData([])
  }
  return (
    <div className="flex justify-center items-center container mx-auto">
      <div className="flex-1">
        <ul>
          {dates?.map((date, id) => (
            <li key={id}>
              {date.title}
              <Button variant="outline" onClick={() => handleClick(date.id, date.title)}>
                <Plus className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                onClick={()=> removeDate()}
              >
                <XOctagon className="w-4 h-4" />
              </Button>
            </li>
          ))}
        </ul>
        <DateForm />
      </div>
      {dateId && <DataTable columns={columns} data={givingData} dateId={dateId} dateTitle={dateTitle} handleSubmit={handleFormSubmit}/>}
    </div>
  );
};

export default DateList;
