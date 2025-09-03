import CheckoutClient from "./checkoutClient";
import { getUser } from "@/lib/supabase/getUser";
import type { PageProps } from "next"; // ✅ import Next.js type

export default async function CheckoutPage({ params }: PageProps<{ id: string; }>) {
    const user = await getUser();
    const courseId = params.id ?? null;

    return <CheckoutClient courseId={courseId} userId={user?.id ?? null} />;
}
