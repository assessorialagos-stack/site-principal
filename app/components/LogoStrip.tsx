"use client";

import { ClientLogos } from "./ui/ClientLogos";

/** Faixa fina de logos dos clientes logo abaixo do hero (como a da referência). */
export function LogoStrip() {
  return (
    <section className="border-y border-border bg-background py-6">
      <div className="container mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 sm:px-6 md:flex-row md:gap-8 lg:px-8">
        <p className="shrink-0 text-center font-mono text-[0.7rem] uppercase leading-relaxed tracking-[0.22em] text-muted md:text-left">
          Marcas que
          <br className="hidden md:block" /> confiam na Lagos
        </p>
        <ClientLogos rows={1} size="sm" className="w-full min-w-0 flex-1" />
      </div>
    </section>
  );
}
