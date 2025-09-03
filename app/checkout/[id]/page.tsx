import CheckoutClient from "./checkoutClient";
import { getUser } from "@/lib/supabase/getUser";

// ✅ Explicitly type params for this route
type CheckoutPageProps = {
    params: {
        id: string;
    };
};

export default async function CheckoutPage({ params }: CheckoutPageProps) {
    const user = await getUser();
    const courseId = params.id ?? null;

    return <CheckoutClient courseId={courseId} userId={user?.id ?? null} />;
}
