"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { SupabaseServerClient } from "./supabase/server";

const FormSchema = z.object({
  id: z.string(),
  name: z.string({
    invalid_type_error: "이름을 입력 하세요",
  }),
  familyHead: z.string(),
  address: z.string(),
  gender: z.enum(["남자", "여자"], {
    invalid_type_error: "성별를 선택해 주세요",
  }),
  ssn: z.string(),
  birthday: z.string(),
  solarLunarType: z.enum(["양력", "음력"]),
  dutyInChurch: z.enum(["목사", "장로", "안수집사", "권사", "집사", "전도사"]),
  cellGroup: z.string(),
  phone: z.string(),
  registeredDate: z.string(),
  notes: z.string(),
  created_at: z.date(),
});

const CreateMember = FormSchema.omit({ id: true, created_at: true });

export async function createMember( formData: FormData) {
  const supabase = await SupabaseServerClient();
  const parsedData = CreateMember.parse({
    name: formData.get("name"),
    familyHead: formData.get("familyHead"),
    ssn: formData.get("ssn"),
    gender: formData.get("gender"),
    birthday: formData.get("birthdate"),
    solarLunarType: formData.get("solarLunarType"),
    cellGroup: formData.get("cellgroup"),
    dutyInChurch: formData.get("dutyInChurch"),
    registeredDate: formData.get("registeredDate"),
    phone: formData.get("phone"),
    address: formData.get("address"),
    notes: formData.get("notes"),
  });
  //? This is where we insert data into supabase
  const { data, error } = await supabase
    .from("member")
    .insert([{ ...parsedData }])
    .select();

  if (error) {
    console.error("Error inserting data to supabase:", error);
  } else {
    revalidatePath("/dashboard/people");
    redirect("/dashboard/people");
  }
}
const UpdateMember = FormSchema.omit({ id: true, created_at: true });
export async function updateMember(id: string, formData: FormData) {
  const supabase = await SupabaseServerClient();
  const parsedData = UpdateMember.parse({
    name: formData.get("name"),
    familyHead: formData.get("familyHead"),
    ssn: formData.get("ssn"),
    gender: formData.get("gender"),
    birthday: formData.get("birthdate"),
    solarLunarType: formData.get("solarLunarType"),
    cellGroup: formData.get("cellgroup"),
    dutyInChurch: formData.get("dutyInChurch"),
    registeredDate: formData.get("registeredDate"),
    phone: formData.get("phone"),
    address: formData.get("address"),
    notes: formData.get("notes"),
  });

  //? This is where we insert data into supabase

  const { error } = await supabase
    .from("member")
    .update({ ...parsedData })
    .eq("id", id)
    .select();

  if (error) {
    console.error("Error inserting data to supabase:", error);
  } else {
    revalidatePath("/dashboard/people");
    redirect("/dashboard/people");
  }
}
export async function deleteMember(memberId: string) {
  const supabase = await SupabaseServerClient();
  const { error } = await supabase.from("member").delete().eq("id", memberId);
  if (error) {
    throw new Error("err del object");
    return;
  }
  revalidatePath("/dashboard/people");
}
