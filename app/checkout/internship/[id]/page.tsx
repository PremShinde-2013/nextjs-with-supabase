import CheckoutInternshipClient from "../checkoutInternshipClient";
import { getUser } from "@/lib/supabase/getUser";

export default async function CheckoutInternshipPage({ params }: { params: { id: string; }; }) {
    const user = await getUser();

    return <CheckoutInternshipClient internshipId={params.id} userId={user?.id ?? null} />;
}
