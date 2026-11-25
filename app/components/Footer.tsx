import Link from "next/link";
import { MapPin, ArrowUpRight } from "lucide-react";
import { InstagramIcon, WhatsAppIcon } from "./ui/SocialIcons";
import { whatsappLink } from "@/app/lib/contact";

const columns = [
  {
    title: "Serviços",
    links: [
      { label: "Assessoria de ponta a ponta", href: "#servicos" },
      { label: "Gestão de Tráfego Pago", href: "#servicos" },
      { label: "Conteúdo e Social Media", href: "#servicos" },
      { label: "Estratégia e Comercial", href: "#servicos" },
    ],
  },
  {
    title: "Navegação",
    links: [
      { label: "Método", href: "#metodo" },
      { label: "Resultados", href: "#cases" },
      { label: "Depoimentos", href: "#depoimentos" },
      { label: "FAQ", href: "#faq" },
    ],
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative isolate border-t border-border bg-section pb-10 pt-16 text-foreground md:pt-20">
      <div className="container relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-12">
          {/* Marca */}
          <div className="flex flex-col gap-4 lg:col-span-3">
            <Link
              href="/"
              className="flex items-center gap-1 font-heading text-3xl font-black tracking-widest text-foreground"
            >
              LAGOS
              <span className="h-1.5 w-1.5 rounded-full bg-ink" />
            </Link>
            <p className="max-w-sm text-muted">
              A assessoria de marketing para donos de negócio. Tráfego, conteúdo, estratégia e comercial
              operando como um só ecossistema, com foco em lucro.
            </p>
            <div className="mt-2 flex gap-3">
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted transition-all hover:border-border-strong hover:text-foreground"
                aria-label="Instagram"
              >
                <InstagramIcon size={18} />
              </a>
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title} className={`flex flex-col gap-4 ${col.title === "Serviços" ? "lg:col-span-3" : "lg:col-span-2"}`}>
              <h3 className="font-heading text-base font-semibold text-foreground">{col.title}</h3>
              <ul className="flex flex-col gap-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="group inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-foreground"
                    >
                      {l.label}
                      <ArrowUpRight
                        size={13}
                        className="opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contato */}
          <div className="flex flex-col gap-4 lg:col-span-4">
            <h3 className="font-heading text-base font-semibold text-foreground">Contato</h3>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4 transition-colors hover:border-border-strong"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-white">
                <WhatsAppIcon size={20} />
              </span>
              <span className="leading-tight">
                <span className="block text-xs text-muted">WhatsApp</span>
                <span className="block text-sm font-semibold text-foreground">Falar com a gente</span>
              </span>
            </a>
            <p className="flex items-center gap-2 text-sm text-muted">
              <MapPin size={15} className="shrink-0 text-accent" />
              Atendimento para todo o Brasil
            </p>
          </div>
        </div>

        {/* Barra inferior */}
        <div className="border-t border-border pt-8 text-center text-sm text-muted md:text-left">
          <p>&copy; {currentYear} Lagos Assessoria. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
