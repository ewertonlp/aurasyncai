// app/api/waitlist/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  }
);

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type WaitlistBody = {
  email?: string;
  productCategory?: string;
  instagram?: string;
  productPhotoUrl?: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as WaitlistBody;

    const email = body.email?.trim().toLowerCase() ?? "";
    const productCategory = body.productCategory?.trim() || null;
    const instagram = body.instagram?.trim() || null;
    const productPhotoUrl = body.productPhotoUrl?.trim() || null;

    if (!email || !EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    // Opcional: evita que alguém envie URLs arbitrárias
    if (
      productPhotoUrl &&
      !productPhotoUrl.startsWith(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/product-photos/`
      )
    ) {
      return NextResponse.json(
        { error: "Invalid product photo URL." },
        { status: 400 }
      );
    }

    const { error: dbError } = await supabaseAdmin
      .from("waitlist")
      .insert({
        email,
        product_category: productCategory,
        instagram,
        product_photo_url: productPhotoUrl,
      });

    if (dbError) {
      if (dbError.code === "23505") {
        return NextResponse.json(
          { error: "This email is already on the waitlist." },
          { status: 409 }
        );
      }

      console.error("Supabase insert error:", dbError);

      return NextResponse.json(
        { error: "We couldn't save your request. Please try again." },
        { status: 500 }
      );
    }

    const isSampleRequest = Boolean(productPhotoUrl);

    const { error: emailError } = await resend.emails.send({
      from: "AuraSync AI <hello@aurasyncai.com>",
      to: email,
      subject: isSampleRequest
        ? "Got your product photo! Here's what happens next"
        : "You're on the list! Welcome to AuraSync AI",
      html: isSampleRequest
        ? `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
            <h2 style="color: #111;">Your product photo was received!</h2>
            <p>Hi there,</p>
            <p>Thanks for sending your product photo to AuraSync AI.</p>
            <p>We’ll review it and send you sample creatives to show how your product could look with professional backgrounds, social-ready visuals, and short video formats.</p>
            <p><strong>What we received:</strong></p>
            <ul>
              <li>Product category: ${productCategory ?? "Not provided"}</li>
              <li>Instagram/store: ${instagram ?? "Not provided"}</li>
            </ul>
            <p>Talk soon,</p>
            <p><strong>The AuraSync AI Team</strong></p>
          </div>
        `
        : `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
            <h2 style="color: #111;">Welcome to the AuraSync AI Waitlist!</h2>
            <p>Hi there,</p>
            <p>Your spot is officially reserved. We're building AI product media for e-commerce and dropshipping brands.</p>
            <p>While we finish the platform, what is your biggest struggle with product photos and creatives?</p>
            <p>Just reply to this email. Your feedback directly influences what we build next.</p>
            <br />
            <p>Talk soon,</p>
            <p><strong>The AuraSync AI Team</strong></p>
          </div>
        `,
    });

    if (emailError) {
      console.error("Resend email error:", emailError);

      // O lead foi salvo; não falhe a requisição apenas por causa do e-mail.
      return NextResponse.json({
        success: true,
        message: "Waitlist saved, but the welcome email could not be sent.",
      });
    }

    return NextResponse.json({
      success: true,
      message: isSampleRequest
        ? "Request received. We'll send your sample creatives soon."
        : "You joined the waitlist successfully.",
    });
  } catch (error) {
    console.error("Unexpected waitlist API error:", error);

    return NextResponse.json(
      { error: "Unexpected server error. Please try again." },
      { status: 500 }
    );
  }
}