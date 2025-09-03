/* eslint-disable @typescript-eslint/no-explicit-any */
import CheckoutClient from "./checkoutClient";
import { getUser } from "@/lib/supabase/getUser";

export default async function CheckoutPage(props: any) {
    const user = await getUser();

    const courseId = props.params?.id ?? null;

    return <CheckoutClient courseId={courseId} userId={user?.id ?? null} />;
}
