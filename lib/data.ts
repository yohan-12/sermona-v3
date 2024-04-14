import { SupabaseServerClient } from "./supabase/server";
import { unstable_noStore as noStore } from "next/cache";
export async function fetchChurchMember() {
  noStore();
  const supabase = await SupabaseServerClient();
  const { data: member, error } = await supabase
    .from("member")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("err in fetching member data", error);
    throw new Error("Error in fetching members");
  } else {
    return member;
  }
}
export async function getDate() {
  noStore();
  const supabase = await SupabaseServerClient();

  let { data: date, error } = (await supabase.from("date").select("id, title, description").order("created_at", {
    ascending: false
  }));
  if(error){
    console.error("err in fetching date from supabase", error)
  }else{
    
     return date;
  }
}
export async function fetchMemberById(id: string) {
  const supabase = await SupabaseServerClient();
  //maybeSingle() only return one object instead of return an array of objects
  const { data: member, error } = await supabase
    .from("member")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) {
    console.error("Error selecting user by ID", error);
    throw new Error("Error fetching member by ID");
  } else {
    return member;
  }
}
export async function fetchGiving(){
  noStore();
  const supabase = await SupabaseServerClient();
  let { data: giving, error } = await supabase.from("giving").select("memberId, amount, category, method, notes");
  if(error){
    console.error("Err fetching church member giving data", error)
    throw new Error("Error fetching member giving")
  }
  else {
    console.log(giving);
    return giving
  }
}