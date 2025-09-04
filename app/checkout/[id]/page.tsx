/* eslint-disable @typescript-eslint/no-explicit-any */
import CheckoutClient from "./checkoutClient";
import { getUser } from "@/lib/supabase/getUser";

export default async function CheckoutPage(props: any) {
    const { params } = props;
    const courseId = params?.id ?? null;

    const user = await getUser();

    return <CheckoutClient courseId={courseId} userId={user?.id ?? null} />;
}
