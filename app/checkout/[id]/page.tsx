// app/checkout/[id]/page.tsx
import CheckoutClient from "./checkoutClient";
import { getUser } from "@/lib/supabase/getUser";

export default async function CheckoutPage({ params }: { params: { id: string; }; }) {
    const user = await getUser();

    return <CheckoutClient courseId={params.id} userId={user?.id ?? null} />;
}
