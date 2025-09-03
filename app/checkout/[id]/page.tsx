import CheckoutClient from "./checkoutClient";
import { getUser } from "@/lib/supabase/getUser";

// Let TypeScript infer the props type
export default async function CheckoutPage({ params }) {
    const user = await getUser();
    const courseId = params?.id ?? null;

    return <CheckoutClient courseId={courseId} userId={user?.id ?? null} />;
}
