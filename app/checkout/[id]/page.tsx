import CheckoutClient from "./checkoutClient";
import { getUser } from "@/lib/supabase/getUser";

// ✅ No external interface, inline the type directly
export default async function CheckoutPage({
    params,
}: {
    params: { id: string; };
}) {
    const user = await getUser();
    const courseId = params?.id ?? null;

    return <CheckoutClient courseId={courseId} userId={user?.id ?? null} />;
}
