import Link from "next/link";
import { Mail, MapPin, Phone, ArrowUpRight } from "lucide-react";
import { InstagramIcon, LinkedinIcon } from "./ui/SocialIcons";
import { Backdrop } from "./ui/Backdrop";
import { whatsappLink, WHATSAPP_DISPLAY } from "@/app/lib/contact";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative isolate grain overflow-hidden bg-dark pb-10 pt-20 text-white md:pt-28">
      <Backdrop variant="dark-section" />
      <div className="container relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-10 lg:gap-12">
          {/* Marca */}
          <div className="flex flex-col gap-4 md:col-span-4 lg:col-span-5">
            <Link
              href="/"
              className="flex items-center gap-1 font-heading text-3xl font-black tracking-widest text-white"
            >
              LAGOS
              <span className="h-1.5 w-1.5 rounded-full bg-white" />
            </Link>
            <p className="mt-2 max-w-sm text-white/70">
              A assessoria de marketing feita por quem entende de loja de verdade. Especialistas em
              e-commerce e varejo físico.
            </p>
            <div className="mt-4 flex gap-3">
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-dark-border text-white/70 transition-all hover:border-dark-border-strong hover:text-white"
                aria-label="Instagram"
              >
                <InstagramIcon size={18} />
              </a>
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-dark-border text-white/70 transition-all hover:border-dark-border-strong hover:text-white"
                aria-label="LinkedIn"
              >
                <LinkedinIcon size={18} />
              </a>
            </div>
          </div>

          {/* Contato */}
          <div className="flex flex-col gap-4 md:col-span-4 lg:col-span-4">
            <h3 className="font-heading text-lg font-semibold text-white">Contato</h3>
            <ul className="mt-2 flex flex-col gap-3">
              <li className="flex items-center gap-3 text-white/70">
                <Phone size={18} className="text-accent" />
                <a href={whatsappLink()} className="transition-colors hover:text-white">
                  {WHATSAPP_DISPLAY}
                </a>
              </li>
              <li className="flex items-center gap-3 text-white/70">
                <Mail size={18} className="text-accent" />
                <a
                  href="mailto:contato@lagosassessoria.com.br"
                  className="transition-colors hover:text-white"
                >
                  contato@lagosassessoria.com.br
                </a>
              </li>
              <li className="flex items-start gap-3 text-white/70">
                <MapPin size={18} className="mt-1 shrink-0 text-accent" />
                <span>
                  Bauru, SP
                  <br />
                  Atendimento para todo o Brasil
                </span>
              </li>
            </ul>
          </div>

          {/* Navegação */}
          <div className="flex flex-col gap-4 md:col-span-4 lg:col-span-3">
            <h3 className="font-heading text-lg font-semibold text-white">Navegação</h3>
            <ul className="mt-2 flex flex-col gap-3">
              {[
                { label: "Método Maré", href: "#metodo" },
                { label: "Nossos Serviços", href: "#servicos" },
                { label: "Cases de Sucesso", href: "#cases" },
                { label: "FAQ", href: "#faq" },
              ].map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="group inline-flex items-center gap-1 text-white/70 transition-colors hover:text-white"
                  >
                    {l.label}
                    <ArrowUpRight
                      size={14}
                      className="opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Barra inferior */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-dark-border pt-8 md:flex-row">
          <div className="text-sm text-white/40">
            <p>&copy; {currentYear} Lagos Assessoria. Todos os direitos reservados.</p>
            <p className="mt-1">CNPJ: 65.728.805/0001-00</p>
          </div>
          <div className="text-sm">
            <Link href="#" className="text-white/40 transition-colors hover:text-white">
              Política de Privacidade
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
