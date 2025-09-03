import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(req: Request, context: { params: { id: string } }) {
  const supabase = await createClient(); // await is required

  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .eq("id", context.params.id)
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  if (!data) return NextResponse.json({ error: "Course not found" }, { status: 404 });

  return NextResponse.json(data);
}
