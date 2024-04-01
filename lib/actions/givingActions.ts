"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { SupabaseServerClient } from "../supabase/server";
import { IconTruckReturn } from "@tabler/icons-react";
// type DateObject = {
//   id: string;
//   title: string;
// };
const DateSchema = z.object({
  id: z.string(),
  title: z.string().min(1, {
    message: "Please select a date.",
  }),
});
const CreateDate = DateSchema.omit({ id: true });

export async function createDate(
  title: string
): Promise<{ id: string; title: string }[] | null> {
  const supabase = await SupabaseServerClient();
  const parsedData = CreateDate.parse({
    title,
  });
  const { data, error } = await supabase
    .from("date")
    .insert(parsedData)
    .select("id, title");

  if (error) {
    console.error("Err inserting date", error);
    return null;
  } else {
    return data;
  }
}
export async function deleteDate(dateId: string) {
  const supabase = await SupabaseServerClient();

  const { error } = await supabase.from("date").delete().eq("id", dateId);
  if (error) {
    console.error("Err del date", error);
  }
  revalidatePath("/dashboard/giving");
}

//! CRUD for church member giving form
const GivingSchema = z.object({
  id: z.string(),
  memberId: z.string(),
  amount: z.number(),
  category: z.string().optional(),
  method: z.string().optional(),
  notes: z.string().optional(),
  dateId: z.string(),
});
const CreateGiving = GivingSchema.omit({ id: true });

export async function createGiving(formData: FormData) {
  const supabase = await SupabaseServerClient();
  const parsedData = CreateGiving.parse({
    memberId: formData.get("memberId"),
    amount: formData.get("amount"),
    category: formData.get("category"),
    method: formData.get("method"),
    notes: formData.get("notes"),
  });
  const { data, error } = await supabase
    .from("giving")
    .insert([parsedData])
    .select();
  if(error){
    console.error("Error creating member giving in supabase", error)
  }else{
    console.log(data);
  }
}
