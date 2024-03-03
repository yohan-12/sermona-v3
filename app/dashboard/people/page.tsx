import { DataTable } from "@/components/people/data-table";
import { fetchChurchMember } from "@/lib/data";
import { columns } from "@/lib/people/columns";
import { notFound } from "next/navigation";
export default async function DemoPage() {
  const data = await fetchChurchMember()
  if(!data){
    notFound();
  }
  return (
    <div className=" w-[90%] mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
