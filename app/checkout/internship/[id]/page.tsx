import CheckoutInternshipClient from "../checkoutInternshipClient";
import { getUser } from "@/lib/supabase/getUser";

// Let TypeScript infer props; do NOT type { params: { id: string } }
export default async function CheckoutInternshipPage({ params }) {
    const user = await getUser();
    const internshipId = params?.id ?? null;

    return (
        <CheckoutInternshipClient
            internshipId={internshipId}
            userId={user?.id ?? null}
        />
    );
}
