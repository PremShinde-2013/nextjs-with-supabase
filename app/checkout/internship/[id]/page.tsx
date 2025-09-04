import CheckoutInternshipClient from "../checkoutInternshipClient";
import { getUser } from "@/lib/supabase/getUser";

interface PageProps {
    params: { id: string; };
}

export default async function CheckoutInternshipPage(props: PageProps) {
    const { params } = props;
    const internshipId = params.id;

    const user = await getUser();

    return (
        <CheckoutInternshipClient
            internshipId={internshipId}
            userId={user?.id ?? null}
        />
    );
}
