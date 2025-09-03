import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  let next = searchParams.get("next") ?? "/auth/signup-success-page";

  if (!next.startsWith("/")) next = "/";

  if (!code) {
    return NextResponse.redirect(`${origin}/auth/auth-code-error`);
  }

  const supabase = createClient();

  // Exchange the OAuth code for a session
  const { data, error: sessionError } = await supabase.auth.exchangeCodeForSession(code);

  if (sessionError || !data.session?.user) {
    console.error("OAuth exchange error:", sessionError);
    return NextResponse.redirect(`${origin}/auth/auth-code-error`);
  }

  const user = data.session.user;

  // Insert into public.users if not exists
  const { data: existingUser } = await supabase
    .from("users")
    .select("id")
    .eq("id", user.id)
    .maybeSingle();

  if (!existingUser) {
    await supabase.from("users").insert({
      id: user.id,
      email: user.email,
      first_name: user.user_metadata?.full_name?.split(" ")[0] || "",
      last_name: user.user_metadata?.full_name?.split(" ")[1] || "",
      role: "student",
      profile_picture: user.user_metadata?.avatar_url || "",
    });
  }

  return NextResponse.redirect(`${origin}${next}`);
}
