import Link from "next/link";
import { Mail, MapPin, Phone, ArrowUpRight } from "lucide-react";
import { InstagramIcon, LinkedinIcon } from "./ui/SocialIcons";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-border bg-section pb-10 pt-20 md:pt-28">
      <div className="container relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-10 lg:gap-12">
          {/* Marca */}
          <div className="flex flex-col gap-4 md:col-span-4 lg:col-span-5">
            <Link
              href="/"
              className="flex items-center gap-1 font-heading text-3xl font-black tracking-widest text-foreground"
            >
              LAGOS
              <span className="h-1.5 w-1.5 rounded-full bg-ink" />
            </Link>
            <p className="mt-2 max-w-sm text-muted">
              A assessoria de marketing feita por quem entende de loja de verdade. Especialistas em
              e-commerce e varejo físico.
            </p>
            <div className="mt-4 flex gap-3">
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-muted transition-all hover:border-ink/30 hover:text-ink"
                aria-label="Instagram"
              >
                <InstagramIcon size={18} />
              </a>
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-muted transition-all hover:border-ink/30 hover:text-ink"
                aria-label="LinkedIn"
              >
                <LinkedinIcon size={18} />
              </a>
            </div>
          </div>

          {/* Contato */}
          <div className="flex flex-col gap-4 md:col-span-4 lg:col-span-4">
            <h3 className="font-heading text-lg font-semibold text-foreground">Contato</h3>
            <ul className="mt-2 flex flex-col gap-3">
              <li className="flex items-center gap-3 text-muted">
                <Phone size={18} className="text-accent" />
                <a href="https://wa.me/5514999999999" className="transition-colors hover:text-ink">
                  (14) 99999-9999
                </a>
              </li>
              <li className="flex items-center gap-3 text-muted">
                <Mail size={18} className="text-accent" />
                <a
                  href="mailto:contato@lagosassessoria.com.br"
                  className="transition-colors hover:text-ink"
                >
                  contato@lagosassessoria.com.br
                </a>
              </li>
              <li className="flex items-start gap-3 text-muted">
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
            <h3 className="font-heading text-lg font-semibold text-foreground">Navegação</h3>
            <ul className="mt-2 flex flex-col gap-3">
              {[
                { label: "Método Maré", href: "#metodo" },
                { label: "Nossos Serviços", href: "#servicos" },
                { label: "Cases de Sucesso", href: "#cases" },
                { label: "Os Sócios", href: "#time" },
                { label: "FAQ", href: "#faq" },
              ].map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="group inline-flex items-center gap-1 text-muted transition-colors hover:text-ink"
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
        <div className="flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <div className="text-sm text-muted">
            <p>&copy; {currentYear} Lagos Assessoria. Todos os direitos reservados.</p>
            <p className="mt-1">CNPJ: 65.728.805/0001-00</p>
          </div>
          <div className="text-sm">
            <Link href="#" className="text-muted transition-colors hover:text-ink">
              Política de Privacidade
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
