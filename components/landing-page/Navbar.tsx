 import Link from 'next/link';
import React from 'react'
 
 function Navbar() {
   return (
     <div>
       <nav className="relative z-10 flex items-center justify-between max-w-2xl mx-3 md:mx-auto bg-black/40 border border-accent-violet/20 rounded-xl px-4 py-3 shadow shadow-glass-shadow ">
        <div className="flex items-center gap-2">
          {/* <div className="w-8 h-8 rounded-lg bg-linear-to-b from-accent-violet to-accent-violet-deep flex items-center justify-center">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </div> */}
          <Link href="/">
          <span className="text-xl font-bold tracking-tight">Aura Sync</span>
          </Link>
      
        </div>
        <a
          href="#waitlist"
          className="btn-accent-lime-violet text-sm font-medium hover:from-accent-pink hover:to-accent-lime transition-colors"
        >
          Join the Waitlist
        </a>
      </nav>
     </div>
   )
 }
 
 export default Navbar
 
 
 
 