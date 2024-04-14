"use server";
import { FormFields } from "@/app/dashboard/giving/component/DateForm";
import {
  GivingFormData
} from "@/app/dashboard/giving/component/GivingForm";
import { revalidatePath } from "next/cache";
import { SupabaseServerClient } from "../supabase/server";
import { redirect } from "next/navigation";

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
export async function editDate(id: string, title: string, description: string | undefined) {
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

export async function deleteGiving(givingId: string) {
  const supabase = await SupabaseServerClient();
  const { error } = await supabase.from("giving").delete().eq("id", givingId);
  if (error) {
    throw new Error("err del giving");
  }
 
  revalidatePath("/dashboard/giving");
}