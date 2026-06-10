"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "./ui/SectionHeading";
import { GlowCard } from "./ui/GlowCard";
import { MediaPlaceholder } from "./ui/MediaPlaceholder";
import { InstagramIcon, LinkedinIcon } from "./ui/SocialIcons";

// Sócios — fotos e @ são placeholders; nomes/cargos já são os reais informados.
const team = [
  {
    name: "David Gabriel",
    role: "CEO",
    bio: "Lidera a estratégia e o crescimento. Vivência real no varejo e obcecado por lucro líquido.",
  },
  {
    name: "Rafael Montanha",
    role: "COO",
    bio: "Comanda a operação e a execução. Garante que cada campanha vire processo e resultado.",
  },
  {
    name: "Alexandre Mauricio",
    role: "CCO",
    bio: "À frente do relacionamento e das vendas. Traduz a necessidade da loja em plano de ação.",
  },
];

export function TeamSection() {
  return (
    <section id="time" className="relative overflow-hidden bg-background py-28 text-foreground md:py-36">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Os sócios"
          title="Quem está por trás dos bastidores"
          subtitle="Um time de operadores, não de teóricos. Gente que vive o varejo todos os dias."
          className="mb-16"
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
            >
              <GlowCard className="flex h-full flex-col overflow-hidden">
                <MediaPlaceholder
                  label={`Foto de ${member.name}`}
                  className="aspect-[4/5] w-full rounded-none border-x-0 border-t-0"
                />
                <div className="flex flex-1 flex-col p-7 md:p-8">
                  <h3 className="font-heading text-xl font-bold text-foreground">{member.name}</h3>
                  <span className="mt-1 text-sm font-medium text-accent">
                    {member.role}
                  </span>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-muted">{member.bio}</p>
                  <div className="mt-6 flex gap-3">
                    <a
                      href="#"
                      aria-label={`Instagram de ${member.name}`}
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted transition-colors hover:text-foreground"
                    >
                      <InstagramIcon size={16} />
                    </a>
                    <a
                      href="#"
                      aria-label={`LinkedIn de ${member.name}`}
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted transition-colors hover:text-foreground"
                    >
                      <LinkedinIcon size={16} />
                    </a>
                  </div>
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
