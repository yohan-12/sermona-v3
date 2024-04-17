"use client";

import { Button } from "@/components/ui/button";
import { deleteDate } from "@/lib/actions/givingActions";
import { createBrowserClient } from "@supabase/ssr";
import { Plus, XOctagon } from "lucide-react";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { getColumns } from "./Columns";
import { DataTable } from "./DataTable";
import EditBtn from "./DateEditBtn";
import DateForm from "./DateForm";
interface DateListProps {
  dates:
    | { id: string; title: string; description: string }[]
    | null
    | undefined;
}
interface Member {
  name: string;
}
interface GivingData {
  id: string;
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
  const [dateDescription, setDateDescription] = useState<string | null>(null);
  const [givingData, setGivingData] = useState<GivingData[]>([]);
  const [forceUpdate, setForceUpdate] = useState(0);
  const getGivingData = async (dateId: string) => {
    const { data, error } = await supabase
      .from("giving")
      .select("member: memberId (name), amount, category, method, notes, id")
      .eq("dateId", dateId);
    if (error) {
      console.error("error fetching giving data", error);
      return null;
    }
    console.log(data);
    // Transform data to include member name directly
    const transformedData = data.map((giving) => ({
      id: giving.id,
      amount: giving.amount,
      category: giving.category,
      method: giving.method,
      notes: giving.notes,
      memberName: (giving.member as unknown as Member).name,
    }));
    console.log(transformedData);
    setGivingData(transformedData);
  };
  const handleFormSubmit = async (dateId: string) => {
    setForceUpdate((u) => u + 1);
    await getGivingData(dateId);
  };
  useEffect(() => {
    const fetchData = async () => {
      if(dateId){
        await getGivingData(dateId)
      }
    }
    fetchData()
  }, [forceUpdate]); 
  

  const columns = getColumns(handleFormSubmit);

  const handleClick = async (
    id: string,
    title: string,
    description: string
  ) => {
    await getGivingData(id);
    setDateId(id);
    setDateTitle(title);
    setDateDescription(description);
  };
  const removeDate = async (id: string) => {
    deleteDate(id);
    setDateId(null);
    setGivingData([]);
  };
  return (
    <div className="container mx-auto flex flex-row items-start justify-center">
      <div className="w-2/5 pt-10 mr-10">
        <ul className="max-h-60 overflow-auto ">
          {dates?.map((date, id) => (
            <li
              key={id}
              className="flex space-x-2 justify-between items-center"
            >
              <span className="">{date.title}</span>
              <div className="justify-end">
                <Button
                  variant="outline"
                  onClick={() =>
                    handleClick(date.id, date.title, date.description)
                  }
                >
                  <Plus className="w-4 h-4" />
                </Button>
                <EditBtn
                  id={date.id}
                  title={date.title}
                  description={date.description}
                />
                <Button variant="outline" onClick={() => removeDate(date.id)}>
                  <XOctagon className="w-4 h-4" />
                </Button>
              </div>
            </li>
          ))}
        </ul>
        <DateForm />
      </div>
      <div className="w-3/5">
        {dateId && (
          <DataTable
            columns={columns}
            data={givingData}
            dateId={dateId}
            dateTitle={dateTitle}
            dateDescription={dateDescription}
            handleSubmit={handleFormSubmit}
          />
        )}
      </div>
    </div>
  );
};

export default DateList;
