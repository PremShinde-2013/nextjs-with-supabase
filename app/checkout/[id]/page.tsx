import CheckoutClient from "./checkoutClient";
import { getUser } from "@/lib/supabase/getUser";

interface PageProps {
    params: { id: string; }; // id from the dynamic route
}

export default async function CheckoutPage(props: PageProps) {
    // Destructure params inside the function body, not inline
    const { params } = props;
    const courseId = params.id;

    const user = await getUser();

    return <CheckoutClient courseId={courseId} userId={user?.id ?? null} />;
}
