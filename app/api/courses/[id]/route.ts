import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import type { RequestEvent } from "next/server";

export async function GET(req: Request, event: RequestEvent) {
  const supabase = await createClient(); // await is required

  const { id } = event.params; // access params here

  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  if (!data) return NextResponse.json({ error: "Course not found" }, { status: 404 });

  return NextResponse.json(data);
}
