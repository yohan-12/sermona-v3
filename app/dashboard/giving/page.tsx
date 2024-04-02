"use client";
import { DatePickerForm } from "@/components/giving/DatePicker";
import { columns } from "@/components/giving/GivingColumns";
import { DataTable } from "@/components/giving/GivingDataTable";
import { fetchGiving } from "@/lib/data";
import { useEffect, useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
type Giving = {
  memberId: string;
  amount: number;
  category: string;
  method: string;
  notes: string;
  // memberName: string
};
const Page = () => {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [dateId, setDateId] = useState<string | null>(null);
  const [givingData, setGivingData] = useState<Giving[] | null>(null);
  const handleDate = (date: string | null, dateId: string | null) => {
    setSelectedDate(date);
    setDateId(dateId);
  };
  async function getGiving() {
    let { data: givings, error } = await supabase
      .from("giving")
      .select("memberId, amount, category, method, notes");
    if (error) {
      console.error("Err fetching church member giving data", error);
      throw new Error("Error fetching member giving");
    } else {
      console.log(givings);
      setGivingData(givings);
    }
 
  }
  useEffect(() => {
    getGiving();
  }, []);
  return (
    // <div className='flex mx-auto p-4'><DatePickerForm/></div>
    <div className="flex mx-auto mt-4 w-4/5">
      <div className="w-1/2">
        <DatePickerForm onDateSelect={handleDate} />
      </div>
      <div className="w-1/2">
        {selectedDate && (
          <DataTable
            columns={columns}
            data={givingData || []}
            selectedDate={selectedDate}
            dateId={dateId}
            getGiving={getGiving}
          />
        )}
      </div>
    </div>
  );
};

export default Page;
