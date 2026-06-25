import type { Metadata } from "next";
import { Inter, Inter_Tight, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { WhatsAppFloat } from "./components/WhatsAppFloat";
import { SmoothScroll } from "./components/SmoothScroll";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lagos Assessoria | Marketing para Varejo e E-commerce",
  description: "A assessoria de marketing feita por quem entende de loja de verdade. Especialistas em e-commerce e varejo físico.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${interTight.variable} ${jetbrains.variable} h-full antialiased scroll-smooth`}
    >
      <head>
        {/* Aplica o tema salvo antes da primeira pintura (sem flash). Padrão: escuro. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{var t=localStorage.getItem('lagos-theme');if(t==='light'){document.documentElement.classList.add('light');}}catch(e){}",
          }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground overflow-x-hidden selection:bg-accent/30">
        <SmoothScroll />
        {children}
        <WhatsAppFloat />
      </body>
    </html>
  );
}
