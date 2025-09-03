import { Resend } from "resend";
import { NextResponse } from "next/server";
import { EmailTemplate } from "@/components/EmailTemplate";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      email,
      firstName,
      lastName,
      courseName,
      description,
      duration,
      language,
      amount,
      orderId,
      paymentId,
      appUrl,
    } = body;

    const { data, error } = await resend.emails.send({
      from: "YourApp <onboarding@resend.dev>", // ✅ must be verified domain
      to: [email],
      subject: `🎉 Enrollment Confirmed: ${courseName}`,
      react: EmailTemplate({
        firstName,
        lastName,
        courseName,
        description,
        duration,
        language,
        amount,
        orderId,
        paymentId,
        appUrl,
      }),
    });

    if (error) {
      console.error("Resend Error:", error);
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Email send failed:", error);
    return NextResponse.json({ error: "Email send failed" }, { status: 500 });
  }
}
