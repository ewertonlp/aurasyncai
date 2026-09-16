promote-with-ai/
├── README.md
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
├── next.config.js
├── .eslintrc.json
├── .gitignore
├── app/
│   ├── layout.tsx
│   ├── page.tsx                  # Landing Page (Public)
│   ├── auth/
│   │   ├── layout.tsx
│   │   ├── login/
│   │   │   └── page.tsx
│   │   └── register/
│   │       └── page.tsx
│   ├── dashboard/
│   │   ├── layout.tsx
│   │   └── page.tsx              # Dashboard Overview
│   ├── studio/
│   │   ├── layout.tsx
│   │   └── page.tsx              # Creation Studio
│   ├── gallery/
│   │   ├── layout.tsx
│   │   └── page.tsx              # Gallery/History
│   └── billing/
│       ├── layout.tsx
│       └── page.tsx              # Billing/Settings
├── components/
│   ├── ui/                       # Reusable UI Components (shadcn/ui or Radix)
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── modal.tsx
│   │   ├── card.tsx
│   │   ├── badge.tsx
│   │   ├── tooltip.tsx
│   │   ├── separator.tsx
│   │   ├── avatar.tsx
│   │   └── toast.tsx
│   └── business/                 # Business-Specific Components
│       ├── ImageGeneratorForm.tsx
│       ├── CreditCounter.tsx
│       ├── UploadZone.tsx
│       ├── ResultComparison.tsx
│       ├── GalleryGrid.tsx
│       ├── PlanSelector.tsx
│       └── AuthProvider.tsx
├── lib/
│   ├── supabase.ts               # Supabase client initialization
│   └── utils.ts                  # Utility functions
├── hooks/
│   ├── useAuth.ts                # Custom auth hook
│   ├── useCredits.ts             # Custom credits hook
│   └── useGeneration.ts          # Custom generation hook
├── styles/
│   └── globals.css               # Global styles (dark mode, glassmorphism)
└── public/
    └── images/
        └── logo.svg