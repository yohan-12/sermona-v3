import { SupabaseServerClient } from "./supabase/server";
import { unstable_noStore as noStore } from "next/cache";
export async function fetchChurchMember() {
  noStore();
  const supabase = await SupabaseServerClient();
  const { data: member, error } = await supabase.from("member").select("*").order('created_at');

  if (error) {
    console.error("err in fetching member data", error);
    throw new Error("Error in fetching members");
  } else {
    return member;
  }
}
export async function fetchMemberById(id: string) {
  const supabase = await SupabaseServerClient();
  //maybeSingle() only return one object instead of return an array of objects
  const { data: member, error } = await supabase.from("member").select("*").eq('id', id).maybeSingle();
  if(error){
    console.error('Error selecting user by ID', error)
    throw new Error('Error fetching member by ID')
  }else{
    return member;
  }
}
