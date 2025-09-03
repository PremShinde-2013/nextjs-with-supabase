import * as React from "react";

export function EmailTemplate({
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
}: {
    firstName: string;
    lastName: string;
    courseName: string;
    description?: string;
    duration: string;
    language: string;
    amount: number;
    orderId: string;
    paymentId: string;
    appUrl: string;
}) {
    return (
        <div style={{ fontFamily: "Arial, sans-serif", padding: 24 }}>
            <h1 style={{ color: "#6d28d9" }}>
                🚀 Congratulations {firstName} {lastName}!
            </h1>
            <p>You are officially enrolled in:</p>
            <h2>{courseName}</h2>

            <p>{description || "Get ready to start your learning journey!"}</p>

            <ul>
                <li><b>Duration:</b> {duration}</li>
                <li><b>Language:</b> {language}</li>
                <li><b>Amount Paid:</b> ₹{amount}</li>
            </ul>

            <h3>💳 Payment Info</h3>
            <ul>
                <li><b>Order ID:</b> {orderId}</li>
                <li><b>Payment ID:</b> {paymentId}</li>
                <li><b>Status:</b> ✅ Successful</li>
            </ul>

            <a
                href={appUrl}
                style={{
                    display: "inline-block",
                    marginTop: 24,
                    padding: "12px 20px",
                    backgroundColor: "#6d28d9",
                    color: "#fff",
                    borderRadius: 8,
                    textDecoration: "none",
                    fontWeight: "bold",
                }}
            >
                👉 Start Learning Now
            </a>
        </div>
    );
}
