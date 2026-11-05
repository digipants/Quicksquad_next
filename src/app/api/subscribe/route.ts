import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const name: string = typeof body.name === "string" ? body.name.trim() : "";
    const email: string = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";

    if (!name || name.length > 120 || email.length > 254 || !/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ success: false }, { status: 400 });
    }

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      return NextResponse.json({ success: false }, { status: 503 });
    }
    const safeName = name.replace(/[&<>'"”]/g, (character) => `&#${character.charCodeAt(0)};`);
    const safeEmail = email.replace(/[&<>'"”]/g, (character) => `&#${character.charCodeAt(0)};`);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // ================= ADMIN EMAIL =================
const adminMail = {
  from: `"ResolveUS" <${process.env.EMAIL_USER}>`,
  to: "devs@digipants.com",
  subject: "New Subscriber – ResolveUS",
  html: `
  <div style="background:#eaf1ff;padding:40px;font-family:Segoe UI,sans-serif">
    <div style="max-width:650px;margin:auto;background:white;border-radius:16px;overflow:hidden;box-shadow:0 8px 30px rgba(0,0,0,0.12)">

      <div style="background:#1e40af;padding:30px;text-align:center;color:white">
        <h1 style="margin:0;font-size:28px;">🚀 New Subscriber</h1>
        <p style="margin-top:10px;font-size:16px;opacity:0.9">
          Someone just subscribed to ResolveUS
        </p>
      </div>

      <div style="padding:40px;">
        <p style="font-size:18px;margin-bottom:25px;">
          A new user has joined your ResolveUS mailing list:
        </p>

        <div style="background:#f1f5ff;border-radius:12px;padding:25px;text-align:center">
          <p style="font-size:22px;font-weight:700;color:#1e40af;margin:0">
            ${safeName}
          </p>
          <p style="font-size:18px;margin-top:10px;color:#334155">
            📧 ${safeEmail}
          </p>
        </div>

        <p style="margin-top:30px;font-size:16px;color:#334155;">
          This subscriber will now receive updates, practical guidance, and promotions.
        </p>
      </div>

      <div style="background:#f8fafc;padding:18px;text-align:center;font-size:13px;color:#64748b">
        ResolveUS © ${new Date().getFullYear()} • resolve-us.com
      </div>
    </div>
  </div>
  `,
};


    // ================= USER EMAIL =================
const userMail = {
  from: `"ResolveUS" <${process.env.EMAIL_USER}>`,
  to: email,
  subject: "🎉 Welcome to ResolveUS",
  html: `
  <div style="background:#eaf1ff;padding:40px;font-family:Segoe UI,sans-serif">
    <div style="max-width:650px;margin:auto;background:white;border-radius:16px;overflow:hidden;box-shadow:0 8px 30px rgba(0,0,0,0.12)">

      <div style="background:#2563eb;padding:30px;text-align:center;color:white">
        <h1 style="margin:0;font-size:28px;">Welcome to ResolveUS 🚀</h1>
        <p style="margin-top:10px;font-size:16px;opacity:0.9">
          You&apos;re officially part of our ResolveUS community
        </p>
      </div>

      <div style="padding:40px;">
        <p style="font-size:20px;">
          Hi <strong>${safeName}</strong>,
        </p>

        <p style="font-size:18px;margin-top:15px;line-height:1.6;">
          Thank you for subscribing to <strong>ResolveUS</strong>!
          You’ll now receive practical guidance, useful updates,
          and exclusive offers directly in your inbox.
        </p>

        <div style="background:#f1f5ff;border-radius:12px;padding:25px;margin-top:30px">
          <p style="font-size:18px;font-weight:600;color:#1e40af;margin:0;">
            What you’ll receive:
          </p>
          <ul style="margin-top:15px;font-size:16px;color:#334155">
            <li>📘 Clear consultation insights</li>
            <li>💡 Practical everyday guidance</li>
            <li>🎁 Special ResolveUS deals</li>
          </ul>
        </div>

        <p style="margin-top:30px;font-size:18px;">
          Need help right now?
          Visit 👉 <a href="https://resolve-us.com" style="color:#2563eb;font-weight:600">resolve-us.com</a>
        </p>

        <p style="margin-top:30px;font-size:16px;">
          — Team <strong>ResolveUS</strong> 💙
        </p>
      </div>

      <div style="background:#f8fafc;padding:18px;text-align:center;font-size:13px;color:#64748b">
        You subscribed on resolve-us.com
      </div>

    </div>
  </div>
  `,
};


    await transporter.sendMail(adminMail);
    try {
      await transporter.sendMail(userMail);
    } catch {
      console.error("Subscriber confirmation email failed.");
      return NextResponse.json({ success: true, confirmationSent: false, message: "Your subscription was received, but we could not send your confirmation email. Please do not resubmit." });
    }

    return NextResponse.json({ success: true });
  } catch {
    console.error("Subscriber notification email failed.");
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
