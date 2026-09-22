"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { toast, Toaster } from "react-hot-toast";
import Navbar from "@/components/landing-page/Navbar";
import Footer from "@/components/landing-page/Footer";

type Status = "idle" | "loading" | "success" | "error";

type WaitlistPayload = {
  email: string;
  productCategory?: string;
  productPhotoUrl?: string;
  instagram?: string;
};

const PRODUCT_CATEGORIES = [
  "Fashion / Apparel",
  "Beauty / Cosmetics",
  "Supplements",
  "Electronics",
  "Home & Living",
  "Jewelry / Accessories",
  "Other",
];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LandingPage() {
  const [email, setEmail] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [instagram, setInstagram] = useState("");
  const [productPhoto, setProductPhoto] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!productPhoto) {
      setPreviewUrl(null);
      return;
    }

    const url = URL.createObjectURL(productPhoto);
    setPreviewUrl(url);

    return () => URL.revokeObjectURL(url);
  }, [productPhoto]);

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file (JPG, PNG or WebP).");
      event.target.value = "";
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error("The image must be smaller than 10MB.");
      event.target.value = "";
      return;
    }

    setProductPhoto(file);
  };

  const removePhoto = () => {
    setProductPhoto(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const submitWaitlist = useCallback(
    async (payload: WaitlistPayload) => {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          data?.error ??
            "We couldn't process your request. Please try again later."
        );
      }

      return data;
    },
    []
  );

  const uploadPhoto = useCallback(async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/upload-product-photo", {
      method: "POST",
      body: formData,
    });

    const data = await response.json().catch(() => null);

    if (!response.ok || !data?.url) {
      throw new Error(
        data?.error ?? "We couldn't upload your product photo. Please try again."
      );
    }

    return data.url;
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (status === "loading") return;

    const normalizedEmail = email.trim().toLowerCase();

    if (!EMAIL_REGEX.test(normalizedEmail)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setStatus("loading");

    try {
      let productPhotoUrl: string | undefined;

      if (productPhoto) {
        productPhotoUrl = await uploadPhoto(productPhoto);
      }

      await submitWaitlist({
        email: normalizedEmail,
        productCategory: productCategory || undefined,
        productPhotoUrl,
        instagram: instagram.trim() || undefined,
      });

      setStatus("success");
      setEmail("");
      setInstagram("");
      setProductCategory("");
      removePhoto();

      toast.success(
        productPhoto
          ? "Got it! We'll send your sample creatives soon."
          : "You're on the list!"
      );
    } catch (error) {
      console.error("Waitlist submission failed:", error);
      setStatus("error");

      toast.error(
        error instanceof Error
          ? error.message
          : "An unexpected error occurred. Please try again."
      );
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gray-950 pt-4 text-white">
      <Toaster position="bottom-center" />

      {/* Ambient background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
      >
        <div className="absolute -left-[10%] -top-[10%] h-[50vw] w-[50vw] rounded-full bg-violet-900/30 blur-[120px]" />
        <div className="absolute -bottom-[10%] -right-[15%] h-[45vw] w-[45vw] rounded-full bg-fuchsia-900/10 blur-[120px]" />
        <div className="absolute left-[30%] top-[20%] h-[40vw] w-[40vw] rounded-full bg-blue-900/15 blur-[150px]" />
      </div>

      <Navbar />

      <main className="relative z-10 mx-auto flex w-full max-w-[90rem] flex-col items-center justify-center gap-y-16 px-4 pb-24 pt-16 lg:flex-row lg:justify-between lg:gap-10">
        {/* Before / After */}
        <div className="order-2 flex w-full flex-col items-center justify-center gap-8 sm:flex-row lg:order-1 lg:w-[45%]">
          <div className="group relative w-1/2 max-w-[260px]">
            <span className="absolute -top-4 left-1/2 z-20 -translate-x-1/2 rounded-full border border-white/20 bg-accent-violet/10 px-4 py-1 text-xs font-bold uppercase tracking-widest text-gray-300 shadow-xl backdrop-blur-md">
              Before
            </span>

            <Image
              src="/camera.png"
              alt="Basic product photo provided by a supplier"
              width={480}
              height={600}
              priority
              className="w-full rounded-2xl border border-white/10 shadow-[0_20px_40px_-12px_rgba(106,95,193,0.8)]"
            />
          </div>

          <div className="group relative w-1/2 max-w-[260px]">
            <span className="absolute -top-4 left-1/2 z-20 -translate-x-1/2 rounded-full border border-accent-lime/50 bg-accent-lime/10 px-4 py-1 text-xs font-bold uppercase tracking-widest text-accent-lime shadow-[0_0_20px_rgba(194,239,78,0.4)] backdrop-blur-md">
              After
            </span>

            <video
              autoPlay
              loop
              muted
              playsInline
              width={480}
              height={600}
              poster="/poster.jpg"
              preload="metadata"
              className="w-full rounded-2xl border border-accent-lime/50 shadow-[0_20px_30px_-12px_rgba(194,239,78,0.5)]"
            >
              <source src="/image-to-video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>

        {/* Hero */}
        <div className="order-1 flex w-full flex-col items-center text-center lg:order-2 lg:w-[55%]">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-accent-violet/70 bg-white/5 px-3 py-1.5 shadow-[0_0_30px_rgba(106,95,193,0.8)] backdrop-blur-md">
            <span className="h-2 w-2 animate-pulse rounded-full bg-accent-violet" />
            <span className="text-xs font-medium uppercase tracking-wider text-gray-300">
              Early access is open
            </span>
          </div>

          <h1 className="mb-6 text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
            Turn one supplier photo into{" "}
            <span className="bg-linear-to-r from-accent-lime to-accent-pink bg-clip-text text-transparent">
              product ads that sell.
            </span>
          </h1>

          <p className="mb-10 max-w-2xl text-lg leading-relaxed text-gray-300 md:text-xl">
            AuraSyncAI transforms basic product photos into studio-style
            images, short vertical videos, and ad-ready variations for
            e-commerce and dropshipping brands.
          </p>

          <div className="w-full max-w-2xl rounded-2xl border border-accent-violet/40 bg-accent-violet/15 p-4 shadow-2xl backdrop-blur-xl sm:p-6">
            {status === "success" ? (
              <div
                aria-live="polite"
                className="animate-in fade-in zoom-in p-4 text-center duration-300"
              >
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-green-500/30 bg-green-500/20">
                  <svg
                    aria-hidden="true"
                    className="h-6 w-6 text-green-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>

                <h2 className="mb-1 text-lg font-bold">
                  {productPhoto ? "Your samples are on the way!" : "You're on the list!"}
                </h2>

                <p className="text-sm text-gray-400">
                  {productPhoto
                    ? "We received your product photo and will send 3 sample creatives to your email."
                    : "We'll notify you when early access is ready."}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="text-left">
                  <label
                    htmlFor="product-photo"
                    className="mb-2 block text-sm font-semibold text-gray-200"
                  >
                    Upload your product photo
                  </label>

                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    <input
                      ref={fileInputRef}
                      id="product-photo"
                      name="product-photo"
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoChange}
                      className="w-full cursor-pointer rounded-xl border border-dashed border-accent-violet/40 bg-black/40 px-4 py-3 text-sm text-gray-300 file:mr-4 file:cursor-pointer file:rounded-lg file:border-0 file:bg-accent-violet/30 file:px-4 file:py-2 file:text-white transition-all focus:outline-none focus:ring-2 focus:ring-accent-pink/50"
                    />

                    {productPhoto && (
                      <button
                        type="button"
                        onClick={removePhoto}
                        className="rounded-xl border border-white/10 px-4 py-3 text-sm text-gray-300 transition hover:border-white/25 hover:text-white"
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  {previewUrl && (
                    <div className="mt-3 flex items-center gap-3 rounded-xl border border-white/10 bg-black/30 p-3">
                      <Image
                        src={previewUrl}
                        alt="Selected product preview"
                        width={72}
                        height={72}
                        unoptimized
                        className="h-18 w-18 rounded-lg object-cover"
                      />

                      <p className="text-xs text-gray-400">
                        {productPhoto?.name}
                      </p>
                    </div>
                  )}
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="text-left">
                    <label
                      htmlFor="product-category"
                      className="mb-2 block text-sm font-semibold text-gray-200"
                    >
                      What do you sell?
                    </label>

                    <select
                      id="product-category"
                      value={productCategory}
                      onChange={(event) =>
                        setProductCategory(event.target.value)
                      }
                      className="w-full rounded-xl border border-accent-violet/20 bg-black/40 px-4 py-3 text-white transition-all focus:outline-none focus:ring-2 focus:ring-accent-pink/50"
                    >
                      <option value="">Select a category</option>
                      {PRODUCT_CATEGORIES.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="text-left">
                    <label
                      htmlFor="instagram"
                      className="mb-2 block text-sm font-semibold text-gray-200"
                    >
                      Instagram or store URL{" "}
                      <span className="text-gray-500">(optional)</span>
                    </label>

                    <input
                      id="instagram"
                      type="text"
                      value={instagram}
                      onChange={(event) => setInstagram(event.target.value)}
                      placeholder="@yourstore"
                      className="w-full rounded-xl border border-accent-violet/20 bg-black/40 px-4 py-3 text-white placeholder-gray-500 transition-all focus:outline-none focus:ring-2 focus:ring-accent-pink/50"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <input
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="Your best email..."
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    aria-label="Email address"
                    className="flex-1 rounded-xl border border-accent-violet/20 bg-black/40 px-4 py-3 text-white placeholder-gray-500 transition-all focus:outline-none focus:ring-2 focus:ring-accent-pink/50"
                  />

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="btn-accent-lime-violet flex cursor-pointer items-center justify-center gap-2 rounded-xl px-6 py-3 font-semibold text-black transition-colors disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {status === "loading" ? (
                      <>
                        <span
                          aria-hidden="true"
                          className="h-5 w-5 animate-spin rounded-full border-2 border-black border-t-transparent"
                        />
                        Processing...
                      </>
                    ) : (
                      "Get 3 Free Creatives"
                    )}
                  </button>
                </div>

                <p className="text-xs text-gray-500">
                  Upload a product photo and receive sample images plus a short
                  video. No credit card required.
                </p>
              </form>
            )}
          </div>
        </div>
      </main>

      {/* How it works */}
      <section className="relative z-10 mx-auto max-w-6xl px-4 py-16">
        <h2 className="mb-10 text-center text-3xl font-bold uppercase tracking-wider md:text-4xl">
          How it works
        </h2>

        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: "1. Upload a product photo",
              description:
                "Send a basic supplier image — no studio, model or designer needed.",
            },
            {
              title: "2. Choose your style",
              description:
                "Select the mood, background and format you want for your store or social media.",
            },
            {
              title: "3. Receive ready-to-post creatives",
              description:
                "Get product images, vertical videos and ad variations ready for Reels, TikTok and Meta Ads.",
            },
          ].map((step) => (
            <Card key={step.title} className="p-6">
              <h3 className="mb-2 text-lg font-bold">{step.title}</h3>
              <p className="text-sm text-gray-400">{step.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className="relative z-10 mx-auto max-w-6xl px-4 py-16">
         <h2 className="mb-10 text-center text-3xl font-bold uppercase tracking-wider md:text-4xl">
          Benefits
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Cinematic backgrounds",
              description:
                "Remove cluttered supplier backgrounds and place your product in clean, premium scenes.",
              color: "lime",
            },
            {
              title: "TikTok-ready videos",
              description:
                "Turn static product photos into short vertical videos designed for Reels, Shorts and TikTok.",
              color: "pink",
            },
            {
              title: "Ad variations",
              description:
                "Generate multiple angles, backgrounds and creative variations to reduce ad fatigue.",
              color: "violet",
            },
          ].map((feature) => (
            <div
              key={feature.title}
              className="rounded-xl bg-linear-to-br from-accent-violet/20 to-transparent p-px"
            >
              <Card className="h-full">
                <h3 className="mb-2 text-lg font-bold">{feature.title}</h3>
                <p className="text-sm text-gray-400">{feature.description}</p>
              </Card>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section id="waitlist" className="relative z-10 mx-auto max-w-4xl px-4 py-16">
        <Card className="p-8 text-center sm:p-12">
          <h2 className="text-3xl font-bold uppercase tracking-wider md:text-4xl">
            Get notified when we launch
          </h2>

          <p className="mt-4 text-gray-300">
            Join early access and be among the first sellers to turn product
            photos into high-converting creatives.
          </p>

          <div className="mx-auto mt-8 max-w-xl">
            {status === "success" ? (
              <p
                aria-live="polite"
                className="rounded-xl border border-green-500/30 bg-green-500/10 p-4 text-sm text-green-300"
              >
                You’re on the list. We’ll be in touch soon.
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="Your main email..."
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  aria-label="Email address"
                  className="w-full rounded-xl border border-accent-violet/20 bg-black/40 px-4 py-3 text-white placeholder-gray-500 transition-all focus:outline-none focus:ring-2 focus:ring-accent-pink/50"
                />

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="btn-accent-lime-violet w-full cursor-pointer rounded-xl px-6 py-3 font-semibold text-black transition disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {status === "loading" ? "Joining..." : "Join the Waitlist"}
                </button>
              </form>
            )}
          </div>
        </Card>
      </section>

      <Footer />
    </div>
  );
}