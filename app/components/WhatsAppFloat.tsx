import { whatsappLink } from "@/app/lib/contact";
import { WhatsAppIcon } from "./ui/SocialIcons";

export function WhatsAppFloat() {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="group fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_6px_24px_rgba(0,0,0,0.45)] transition-transform duration-300 hover:scale-110 md:bottom-7 md:right-7"
    >
      <span className="absolute inset-0 rounded-full ring-1 ring-white/20" />
      <WhatsAppIcon size={28} className="relative" />
      <span className="pointer-events-none absolute right-16 whitespace-nowrap rounded-lg bg-card px-3 py-2 text-sm font-medium text-foreground opacity-0 shadow-lg border border-border ring-1 ring-white/10 transition-opacity duration-300 group-hover:opacity-100">
        Falar no WhatsApp
      </span>
    </a>
  );
}
