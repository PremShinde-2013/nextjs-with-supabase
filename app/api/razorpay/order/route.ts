/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { amount, currency, receipt } = body;

  try {
    const response = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(
            process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID + ":" + process.env.RAZORPAY_KEY_SECRET
          ).toString("base64"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: amount * 100, // Razorpay expects paise
        currency: currency || "INR",
        receipt: receipt || "receipt#1",
        payment_capture: 1,
      }),
    });

    const order = await response.json();

    // Generate mobile-friendly full-page checkout URL
    const payment_url = `https://checkout.razorpay.com/v1/checkout.js?order_id=${order.id}`;

    return NextResponse.json({ ...order, payment_url });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
