"use server";
import { FormFields } from "@/app/dashboard/giving/component/DateForm";
import { GivingFormData } from "@/app/dashboard/giving/component/GivingForm";
import { revalidatePath } from "next/cache";
import { SupabaseServerClient } from "../supabase/server";

interface updateProps {
  amount: number;
  category: string | null;
  givingId: string;
  memberId: string;
  method: string | null;
  notes: string | null;
}
export async function createDate(formData: FormFields) {
  const supabase = await SupabaseServerClient();
  const { error } = await supabase
    .from("date")
    .insert(formData)
    .select("title, description");
  if (error) {
    console.error("Error inserting date", error);
  } else {
    revalidatePath("/dashboard/giving");
  }
}
export async function editDate(
  id: string,
  title: string,
  description: string | undefined
) {
  const supabase = await SupabaseServerClient();
  console.log(id, title, description);
  const { data, error } = await supabase
    .from("date")
    .update({ title, description })
    .eq("id", id)
    .select();
  if (error) {
    console.error("Err updating date", error);
  } else {
    revalidatePath("/dashboard/giving");
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

export async function createGiving(givingData: GivingFormData) {
  const supabase = await SupabaseServerClient();
  const { data, error } = await supabase
    .from("giving")
    .insert(givingData)
    .select();
  if (error) {
    console.error("Error creating member giving in supabase", error);
  } else {
    console.log(data);
  }
  revalidatePath("/dashboard/giving");
}

export async function getDateId(givingId: string): Promise<string> {
  const supabase = await SupabaseServerClient();
  let { data, error } = await supabase
    .from("giving") // Assuming the table name is 'givings'
    .select("dateId")
    .eq("id", givingId)
    .single();

  if (error) {
    console.error("Error fetching dateId:", error);
    return "";
  }
  return data?.dateId;
}

export async function updateGiving({
  amount,
  category,
  givingId,
  memberId,
  method,
  notes,
}: updateProps) {
  const supabase = await SupabaseServerClient();
  const dateID = await getDateId(givingId);
  const { error } = await supabase
    .from("giving")
    .update({ amount, category, memberId, method, notes })
    .eq("id", givingId)
    .select();
  if (error) {
    console.error("err in updating giving ", error);
  } else {
    console.log("Success giving update");
  }
  return dateID;
  revalidatePath("/dashboard/giving");
}

export async function deleteGiving(givingId: string) {
  const supabase = await SupabaseServerClient();
  const dateID = await getDateId(givingId);
  const { error } = await supabase.from("giving").delete().eq("id", givingId);
  if (error) {
    throw new Error("err deleting giving");
  }
  return dateID;
  revalidatePath("/dashboard/giving");
}
