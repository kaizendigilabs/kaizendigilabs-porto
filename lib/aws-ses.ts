import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";


const sesClient = new SESClient({
    region: process.env.AWS_REGION || "us-east-1",
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
    },
});

const SENDER_EMAIL = process.env.REPLY_FROM_EMAIL || "hello@kaizendigilabs.com";

interface SendEmailParams {
    to: string[];
    subject: string;
    html: string;
    text?: string;
    replyTo?: string[];
}

export async function sendEmail({ to, subject, html, text, replyTo }: SendEmailParams) {
    if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
        console.warn("AWS Credentials not found. Skipping email sending.");
        return { success: false, error: "Missing AWS Credentials" };
    }

    const command = new SendEmailCommand({
        Source: SENDER_EMAIL,
        Destination: {
            ToAddresses: to,
        },
        Message: {
            Subject: {
                Data: subject,
                Charset: "UTF-8",
            },
            Body: {
                Html: {
                    Data: html,
                    Charset: "UTF-8",
                },
                Text: {
                    Data: text || html.replace(/<[^>]*>?/gm, ""), // Strip tags for text fallback
                    Charset: "UTF-8",
                },
            },
        },
        ReplyToAddresses: replyTo,
    });

    try {
        const response = await sesClient.send(command);
        console.log("Email sent successfully:", response.MessageId);
        return { success: true, messageId: response.MessageId };
    } catch (error) {
        console.error("Failed to send email:", error);
        return { success: false, error };
    }
}

export async function sendNotificationEmail(inquiry: {
    name: string;
    email: string;
    subject: string;
    message: string;
    phone?: string | null;
    company?: string | null;
}) {
    const adminEmail = SENDER_EMAIL; // Admin receives notification at the same email (or configurable)

    const htmlContent = `
    <h2>New Inquiry Received</h2>
    <p><strong>Name:</strong> ${inquiry.name}</p>
    <p><strong>Email:</strong> ${inquiry.email}</p>
    <p><strong>Phone:</strong> ${inquiry.phone || "-"}</p>
    <p><strong>Company:</strong> ${inquiry.company || "-"}</p>
    <p><strong>Subject:</strong> ${inquiry.subject}</p>
    <p><strong>Message:</strong></p>
    <blockquote style="background: #f9f9f9; padding: 10px; border-left: 4px solid #ccc;">
        ${inquiry.message.replace(/\n/g, "<br>")}
    </blockquote>
    <hr />
    <p>Login to dashboard to reply.</p>
    `;

    return sendEmail({
        to: [adminEmail],
        subject: `[New Inquiry] ${inquiry.subject}`,
        html: htmlContent,
        replyTo: [inquiry.email], // So admin can hit reply in their email client if they want
    });
}

export async function sendReplyEmail(toEmail: string, message: string, originalSubject: string) {
    const htmlContent = `
    <div style="font-family: sans-serif; line-height: 1.6;">
        <p>${message.replace(/\n/g, "<br>")}</p>
        <br />
        <hr />
        <p style="color: #666; font-size: 12px;">
            Best Regards,<br/>
            <strong>PT Kaizen Digital Labs</strong><br/>
            <a href="https://kaizendigilabs.com">kaizendigilabs.com</a>
        </p>
    </div>
    `;

    const subject = originalSubject.startsWith("Re:") ? originalSubject : `Re: ${originalSubject}`;

    return sendEmail({
        to: [toEmail],
        subject: subject,
        html: htmlContent,
    });
}
