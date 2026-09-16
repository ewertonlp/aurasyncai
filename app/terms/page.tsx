import Footer from "@/components/landing-page/Footer";
import Navbar from "@/components/landing-page/Navbar";

export default function TermsOfUse() {
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
               Terms of Use
              </h1>
              <p className="text-sm text-slate-500">
                <strong>Last updated:</strong> September 15, 2026
              </p>
            </div>

            <p>
              Welcome to AuraSync AI. These Terms of Use govern your participation in our waitlist. By signing up, you agree to the terms below.
            </p>

            <h2 className="mb-4 mt-10 font-semibold text-2xl text-white">
              1. Nature of the Waitlist
            </h2>
            <p>
              Joining the AuraSync AI waitlist demonstrates your interest in using the platform in the future. It does not guarantee immediate access to the software, nor does it create any commercial relationship, purchase obligation, or service provision at the time of registration.
            </p>
            

            <h2 className="mb-4 mt-10 font-semibold text-2xl text-white">
              2. Communication
            </h2>
            <p>By registering, you authorize the receipt of email communications regarding the product launch, Beta access invitations, development updates, and special membership offers.</p>

          

            <h2 className="mb-4 mt-10 font-semibold text-2xl text-white">
              3. Intellectual Property
            </h2>

            <p>
              All content presented on the waitlist page (texts, images, logos, and the AuraSync AI brand) is the exclusive property of Ewerton Lopes Pereira and is protected by copyright laws.
            </p>

            <h2 className="mb-4 mt-10 font-semibold text-2xl text-white">
              4. Limitation of Liability
            </h2>
            <p className="mb-6">
             AuraSync AI and its developers are not responsible for any unavailability of the registration page or temporary failures in sending email confirmations. The final product described on the landing page is under development, and its official features may change prior to launch.
            </p>

            <h2 className="mb-4 mt-10 font-semibold text-2xl text-white">
              5. Changes to the Terms
            </h2>
            <p>We may revise these Terms of Use at any time. Once the service transitions from the waitlist phase to the official launch, new Terms of Use and a SaaS Service Agreement will be presented for your acceptance when creating a definitive account.</p>

          

            

           
          </div>
        </section>
      </main>

      {/* Rodapé no Fundo */}
      <Footer />
    </div>
  );
};


