import type { Metadata } from "next";
import { Inter, Inter_Tight, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { WhatsAppFloat } from "./components/WhatsAppFloat";
import { SmoothScroll } from "./components/SmoothScroll";
import { GoogleTagManager } from "./components/GoogleTagManager";

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
  title: "Lagos Assessoria | Marketing que vira lucro para o seu negócio",
  description: "Assessoria de marketing de ponta a ponta para donos de negócio: tráfego pago, conteúdo, estratégia e comercial operando como um só ecossistema, com foco em lucro.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${interTight.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <head>
        {/* Meta Pixel Code */}
        <script
          dangerouslySetInnerHTML={{
            __html: `!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '2236261557301574');
fbq('track', 'PageView');`,
          }}
        />
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            alt=""
            src="https://www.facebook.com/tr?id=2236261557301574&ev=PageView&noscript=1"
          />
        </noscript>
        {/* End Meta Pixel Code */}
        {/* Meta Pixel: evento Contact nos cliques em links de WhatsApp */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.addEventListener('click', function (e) {
  var link = e.target.closest('a[href*="wa.me"], a[href*="api.whatsapp.com"], a[href*="whatsapp.com/send"]');
  if (!link || typeof fbq !== 'function') return;
  fbq('track', 'Contact');
  // se o link abre na mesma aba, segura 300ms para o evento sair antes do WhatsApp abrir
  if (link.target !== '_blank') {
    e.preventDefault();
    setTimeout(function () { window.location.href = link.href; }, 300);
  }
}, true);`,
          }}
        />
        {/* Microsoft Clarity */}
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `(function(c,l,a,r,i,t,y){
    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "z80dxjrvhc");`,
          }}
        />
        {/* End Microsoft Clarity */}
      </head>
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground overflow-x-hidden selection:bg-accent/30">
        <GoogleTagManager />
        <SmoothScroll />
        {children}
        <WhatsAppFloat />
      </body>
    </html>
  );
}
