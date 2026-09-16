import Link from "next/link";
import React from "react";

function Footer() {
  return (
    <div>
      <footer className="border-t border-white/5 bg-black/40 mt-10">
        <div className="max-w-6xl mx-auto px-6 py-6 ">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
                <span className="text-xl font-bold tracking-tight">Aura Sync</span>
            </div>
            <div className="flex gap-4 text-sm text-gray-500">
              <Link
                href="./privacy"
                className="hover:text-white transition"
              >
                Privacy Policy
              </Link>
              <a href="./terms" className="hover:text-white transition">
                Terms of Use
              </a>
            </div>
            <div className="flex gap-4 text-sm text-gray-500">
              <a href="#" className="hover:text-white transition">
                Twitter
              </a>
              {/* <a href="#" className="hover:text-white transition">
                Instagram
              </a> */}
            </div>
          </div>
        <div className="text-xs text-center text-gray-500 pt-6">
          © 2026 Aura Sync. All right reserved.
        </div>
        </div>

      </footer>
    </div>
  );
}

export default Footer;
