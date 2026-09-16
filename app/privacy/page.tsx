import Footer from "@/components/landing-page/Footer";
import Navbar from "@/components/landing-page/Navbar";

export default function PrivacyPolicy() {
  return (
    <div className="flex flex-col min-h-screen bg-primary pt-4">
      {/* Barra de Navegação no Topo */}
      <Navbar />

      {/* Conteúdo Principal (flex-grow empurra o footer para baixo) */}
      <main className="grow">
        <section className="relative pt-20 pb-20 md:pt-40 md:pb-32 overflow-hidden">
          <div className="container mx-auto px-6 relative z-10 space-y-6 text-slate-300 leading-relaxed max-w-4xl">
            <div className="mb-10 border-b border-white/10 pb-6">
              <h1 className="mb-2 font-bold text-3xl md:text-4xl text-white tracking-tight">
                Privacy Policy
              </h1>
              <p className="text-sm text-slate-500">
                <strong>Last updated:</strong> September 15, 2026
              </p>
            </div>

            <p>
              Your privacy is important to us. This Privacy Policy explains how{" "}
              <strong className="italic">Aura Sync AI</strong> ("we", "our", or
              "platform"), operated by Ewerton Lopes Pereira, collects, uses,
              and protects your personal information when you join our waitlist
              through the aurasyncai.com website.
            </p>

            <h2 className="mb-4 mt-10 font-semibold text-2xl text-white">
              1. Data We Collect
            </h2>
            <p>
              For the waitlist, we only collect the strictly necessary data
              entered by you in the form:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-3 mb-6">
              <li>Email address.</li>
              <li>Name (if applicable on the form).</li>
            </ul>

            <h2 className="mb-4 mt-10 font-semibold text-2xl text-white">
              2. How We Use Your Data
            </h2>
            <p>The collected information is used exclusively to:</p>

            <ul className="list-disc pl-6 space-y-2 mt-3 mb-6">
              <li>
                Notify you about the official launch of AuraSync AI and the
                release of your access.
              </li>
              <li>
                Send relevant updates regarding platform development, new
                features, or early access (Beta) offers.
              </li>
            </ul>

            <h2 className="mb-4 mt-10 font-semibold text-2xl text-white">
              3. Legal Basis and Consent
            </h2>

            <p>
              By entering your email on the waitlist, you agree to the
              collection and use of this information in accordance with this
              policy, in compliance with applicable data protection laws (such
              as GDPR and LGPD).
            </p>

            <h2 className="mb-4 mt-10 font-semibold text-2xl text-white">
              4. Data Sharing
            </h2>
            <p className="mb-6">
              We do not sell, rent, or share your personal data with third
              parties. Your data is stored securely in our database
              infrastructure solely for launch communication purposes.
            </p>

            <h2 className="mb-4 mt-10 font-semibold text-2xl text-white">
              5. Your Rights
            </h2>
            <p>At any time, you have the right to:</p>

            <ul className="list-disc pl-6 space-y-2 mt-3 mb-6">
              <li>Request the deletion of your email from our waitlist.</li>
              <li>
                Access the information we hold about you. To exercise these
                rights, simply click the "Unsubscribe" link in any email we
                send, or contact us at: [YOUR CONTACT EMAIL, e.g.,
                contact@aurasyncai.com].
              </li>
            </ul>

            <h2 className="mb-4 mt-10 font-semibold text-2xl text-white">
              7. Changes to this Policy
            </h2>
            <p>
             We may update our Privacy Policy to reflect changes in our practices or for operational, legal, or regulatory reasons. We recommend checking this page periodically.
            </p>

            <h2 className="mb-4 mt-10 font-semibold text-2xl text-white">
              8. Contact
            </h2>
            <p>
              For questions, suggestions, or requests related to your privacy, get in touch via email:{" "}
              <a
                href="mailto:suporte.regenc@gmail.com"
                className="text-blue-400 hover:text-blue-300 hover:underline transition-colors font-medium"
              >
                suporte.regenc@gmail.com
              </a>
              .
            </p>
          </div>
        </section>
      </main>

      {/* Rodapé no Fundo */}
      <Footer />
    </div>
  );
};


