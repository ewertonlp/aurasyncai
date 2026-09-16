// app/api/waitlist/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

// Inicializa o cliente do Resend com a sua chave (certifique-se de criar essa variável no .env.local)
const resend = new Resend(process.env.RESEND_API_KEY);

// Inicializa o Supabase (Server-Side)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // 1. Salvar no Supabase
    const { error: dbError } = await supabase
      .from("waitlist")
      .insert([{ email }]);

    // Se o erro for de duplicação (e-mail já cadastrado), podemos ignorar ou tratar
    if (dbError && dbError.code !== '23505') { 
      console.error("Supabase Error:", dbError);
      throw new Error("Failed to save to database");
    }

    // 2. Disparar o e-mail de Boas-vindas via Resend
    const { error: emailError } = await resend.emails.send({
      from: "AuraSync AI <hello@aurasyncai.com>", // Use o e-mail com o prefixo que preferir
      to: email,
      subject: "You're on the list! Welcome to AuraSync AI 🚀",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
          <h2 style="color: #111;">Welcome to the AuraSync AI Waitlist!</h2>
          <p>Hi there,</p>
          <p>Your spot is officially reserved. We are building the first AI marketing employee designed specifically for E-commerce and Dropshipping, and we're thrilled to have you with us early on.</p>
          <p>While we put the finishing touches on the platform, I have a quick question for you:</p>
          <p><strong>What is your biggest struggle right now when it comes to product photos and creatives?</strong></p>
          <p>Just reply directly to this email. I read every single response and your feedback might directly influence our next feature!</p>
          <br/>
          <p>Talk soon,</p>
          <p><strong>The AuraSync AI Team</strong></p>
        </div>
      `,
    });

    if (emailError) {
      console.error("Resend Error:", emailError);
      throw new Error("Failed to send email");
    }

    // Retorna sucesso para o Frontend
    return NextResponse.json({ success: true, message: "Joined waitlist and email sent." });

  } catch (error: any) {
    console.error("API Error:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}