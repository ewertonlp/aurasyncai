import '@/styles/globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { SupabaseProvider } from '@/lib/supabase/provider';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: 'AuraSyncAI - Generate Stunning Product Media with AI',
  description: 'Turn product links into professional images and videos using AI. Perfect for e-commerce sellers.',
  icons: {
    icon: '/favicon.ico',
  },
};

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SupabaseProvider>
      <html lang="en" className={inter.className}>
        <body>{children}</body>
      </html>
     
    </SupabaseProvider>
  );
}