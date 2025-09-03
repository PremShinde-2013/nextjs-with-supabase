/* eslint-disable @typescript-eslint/no-explicit-any */
import CheckoutInternshipClient from "../checkoutInternshipClient";
import { getUser } from "@/lib/supabase/getUser";

export default async function CheckoutInternshipPage({ params }: { params: any; }) {
    const user = await getUser();
    const internshipId = params?.id ?? null;

    return (
        <CheckoutInternshipClient
            internshipId={internshipId}
            userId={user?.id ?? null}
        />
    );
}
