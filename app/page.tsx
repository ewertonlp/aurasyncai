"use client";

import { Card } from "@/components/ui/card";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import Navbar from "@/components/landing-page/Navbar";
import Footer from "@/components/landing-page/Footer";
import { toast, Toaster } from "react-hot-toast";

export default function LandingPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erro ao conectar com o servidor.");
      }

      setStatus("success");
      setEmail(""); // Limpa o campo após o sucesso
    } catch (error) {
      console.error("Erro ao entrar na fila:", error);
      setStatus("idle");
      toast.error("An error occurred. Please try again.", {
        style: {
          background: "rgba(255, 0, 0, 0.5)", // Fundo escuro glass
          color: "#fff",
          border: "1px solid rgba(255, 255, 255, 0.5)", // Borda violeta
          backdropFilter: "blur(10px)",
        },
      });
    }
  };

  return (
    <div className="bg-gray-950 pt-4">
      <Toaster position="bottom-center" />
      {/* Background Ambient Glows */}
      <div className="absolute top-[-20%] left-[-5%] w-[50%] h-[50%] bg-accent-pink/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="absolute bottom-[-10%] right-[2%] w-[10%] h-[50%] bg-accent-lime/10 blur-[120px] rounded-full pointer-events-none"></div>

      <Navbar />
      {/* Hero Section */}
      {/* Hero Section */}
      <main className="relative z-10 w-full max-w-[90rem] mx-auto pt-16 pb-20 px-4 flex flex-wrap lg:flex-nowrap items-center justify-center lg:justify-between gap-y-12 lg:gap-0">
        {/* --- INÍCIO: MESH GRADIENT PROFUNDO --- */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute -top-[10%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-violet-900/30 blur-[120px]"></div>
          <div className="absolute -bottom-[20%] right-[10%] w-[45vw] h-[45vw] rounded-full bg-fuchsia-900/40 blur-[120px]"></div>
          <div className="absolute top-[20%] left-[30%] w-[40vw] h-[40vw] rounded-full bg-blue-900/15 blur-[150px]"></div>
        </div>
        {/* --- FIM: MESH GRADIENT --- */}

        {/* CONTEÚDO CENTRAL (Textos e Formulário) - Vai para o topo no mobile */}
        <div className="w-full lg:w-1/2 flex flex-col items-center text-center order-1 lg:order-2 z-50">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-accent-violet/70 shadow-[0_0_30px_rgba(106,95,193,0.8)] backdrop-blur-md mb-8">
            <span className="flex h-2 w-2 rounded-full bg-accent-violet animate-pulse"></span>
            <span className="text-xs font-medium text-gray-300 uppercase tracking-wider">
              Early Access Open
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
            Amateur photos don't <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-accent-lime to-accent-pink">
              sell your products.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-on-primary/70 max-w-2xl mb-10 leading-relaxed">
            The first AI marketing employee designed for E-commerce and
            Dropshipping. Turn bad supplier photos and videos into
            high-converting creatives in seconds.
          </p>

          {/* Form Waitlist */}
          <div
            id="waitlist"
            className="w-full max-w-2xl p-2 bg-accent-violet/15 border border-accent-violet/40 backdrop-blur-xl rounded-2xl shadow-2xl"
          >
            {status === "success" ? (
              <div className="p-6 text-center animate-in fade-in zoom-in duration-300">
                <div className="mx-auto w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mb-3 border border-green-500/30">
                  <svg
                    className="w-6 h-6 text-green-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-white mb-1">
                  You're on the list!
                </h3>
                <p className="text-sm text-gray-400">
                  We will notify you as soon as the platform is ready for use.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-2"
              >
                <input
                  type="email"
                  required
                  placeholder="Your best email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-black/40 border border-accent-violet/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent-pink/50 transition-all"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="btn-accent-lime-violet text-black font-semibold rounded-xl px-5 py-2 hover:bg-linear-to-r hover:from-accent-pink hover:to-accent-lime transition-colors disabled:opacity-70 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {status === "loading" ? (
                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    "Join the Waitlist"
                  )}
                </button>
              </form>
            )}
          </div>
          <p className="text-xs text-gray-500 mt-4">
            Join over 300 other sellers on the waiting list.
          </p>
        </div>

        {/* IMAGEM ESQUERDA (Antes) - 50% lado a lado no mobile */}
        <div className="w-1/2 lg:w-1/4 flex justify-center  order-2 lg:order-1 group perspective-distant relative px-2 lg:px-0">
          <div className="absolute -top-3 lg:-top-6 z-20 px-3 py-1 lg:px-4 lg:py-1.5 rounded-full bg-accent-violet/10 backdrop-blur-md border border-white/20 text-gray-300 text-[10px] lg:text-xs font-bold uppercase tracking-widest shadow-xl transform transition-transform group-hover:-translate-y-1">
            Before
          </div>
          <img
            src="/camera.png"
            alt="Camera"
            className="w-full max-w-[160px] lg:max-w-none lg:w-56 rounded-2xl border border-accent-pink/7
            0 shadow-[0_20px_40px_-12px_rgba(106,95,193,0.8)] lg:transform-[rotateY(16deg)_rotateX(8deg)_translateZ(30px)]"
          />
        </div>

        {/* IMAGEM DIREITA (Depois) - 50% lado a lado no mobile */}
        <div className="w-1/2 lg:w-1/4 flex justify-center  order-3 lg:order-3 group perspective-distant relative px-2 lg:px-0">
          <div className="absolute -top-3 lg:-top-6 z-20 px-3 py-1 lg:px-4 lg:py-1.5 rounded-full bg-accent-lime/10 backdrop-blur-md border border-accent-lime/50 text-accent-lime text-[10px] lg:text-sm font-bold uppercase tracking-widest shadow-[0_0_20px_rgba(194,239,78,0.4)] transform transition-transform group-hover:-translate-y-1">
            After
          </div>
          <video
            autoPlay
            loop
            muted
            width="320"
            height="240"
            poster="/poster.jpg"
            preload="none"
             className="w-full max-w-[160px] lg:max-w-none lg:w-56 rounded-2xl border border-accent-lime/50 shadow-[0_20px_30px_-12px_rgba(194,239,78,0.5)] lg:[transform:rotateY(-16deg)_rotateX(8deg)_translateZ(30px)]"
          >
            <source src="/image-to-video.mp4" type="video/mp4" />
          </video>
        </div>
      </main>

      {/* Feature Grid - Visual Proof */}
      <section className="relative z-10 py-16 px-3 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="group rounded-xl p-px bg-linear-to-br from-accent-lime/90 to-accent-lime/5 flex transition-shadow duration-300 hover:shadow-[0_0_24px_-4px_rgba(194,239,78,0.5),0_12px_24px_-8px_rgba(0,0,0,0.5)]">
            <Card className="">
              <div className="w-10 h-10 rounded-lg bg-accent-lime/10 border border-accent-lime/20 flex items-center justify-center mb-4">
                <svg
                  className="w-5 h-5 text-accent-lime"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2">Cinematic Backgrounds</h3>
              <p className="text-sm text-on-primary/70 font-light">
                Remove cluttered supplier backgrounds and apply professional
                settings with one click.
              </p>
            </Card>
          </div>

          {/* Card 2 */}
          <div className="group rounded-xl p-px bg-linear-to-br from-accent-pink/90 to-accent-pink/5 flex transition-shadow duration-300 hover:shadow-[0_0_24px_-4px_rgba(250,127,170,0.5),0_12px_24px_-8px_rgba(0,0,0,0.5)]">
            <Card className="">
              <div className="w-10 h-10 rounded-lg bg-accent-pink/10 border border-accent-pink/20 flex items-center justify-center mb-4">
                <svg
                  className="w-5 h-5 text-accent-pink"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                TikTok Ready Videos
              </h3>
              <p className="text-sm text-gray-400">
                Transform static photos into short, dynamic videos optimized for
                the Shorts and Reels algorithms.
              </p>
            </Card>
          </div>

          {/* Card 3 */}
          <div className="group rounded-xl p-px bg-linear-to-br from-accent-violet/90 to-accent-violet/5 flex transition-shadow duration-300 hover:shadow-[0_0_24px_-4px_rgba(106,95,193,0.5),0_12px_24px_-8px_rgba(0,0,0,0.5)]">
            <Card className="">
              <div className="w-10 h-10 rounded-lg bg-accent-violet/20 border border-accent-violet/20 flex items-center justify-center mb-4">
                <svg
                  className="w-5 h-5 text-accent-violet-mid"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                Ad Fatigue Variations
              </h3>
              <p className="text-sm text-gray-400">
                Generate dozens of different angles and colors to keep your ads
                converting longer.
              </p>
            </Card>
          </div>
        </div>
      </section>

      <section className="relative z-10 py-16 px-3 max-w-6xl mx-auto">
        <div className="group rounded-xl p-px bg-linear-to-br from-accent-violet/90 to-accent-violet/5 flex ">
          <Card className="mx-auto w-full">
            <div className="py-6 flex flex-col items-center justify-center">
              <h2 className="text-3xl text-center tracking-wider uppercase font-bold ">
                Get notified when<br></br> we're launching
              </h2>

              <p className="py-6 text-center text-lg text-on-primary/70 tracking-wide font-light">
                Be Part of the Excitement: Receive Exclusive Launch <br></br>
                Updates and Notifications
              </p>

              {/* Form Waitlist - Glassmorphism */}
              <div
                id="waitlist"
                className="w-full max-w-2xl mt-6 p-2 bg-accent-violet/15 border border-accent-violet/40 backdrop-blur-xl rounded-2xl shadow-2xl"
              >
                {status === "success" ? (
                  <div className="p-6 text-center animate-in fade-in zoom-in duration-300">
                    <div className="mx-auto w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mb-3 border border-green-500/30">
                      <svg
                        className="w-6 h-6 text-green-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-1">
                      You're on the list!
                    </h3>
                    <p className="text-sm text-gray-400">
                      We'll notify you as soon as your access is ready.
                    </p>
                  </div>
                ) : (
                  <form
                    onSubmit={handleSubmit}
                    className="flex flex-col sm:flex-row gap-2"
                  >
                    <input
                      type="email"
                      required
                      placeholder="Your main email..."
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-1 bg-black/40 border border-accent-violet/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all"
                    />
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="btn-accent-lime-violet text-black font-semibold rounded-xl px-5 py-2 hover:bg-linear-to-r hover:from-accent-pink hover:to-accent-lime transition-colors disabled:opacity-70 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {status === "loading" ? (
                        <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        "Join the Waitlist"
                      )}
                    </button>
                  </form>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-4">
                Join over 300 other sellers on the waitlist.
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
