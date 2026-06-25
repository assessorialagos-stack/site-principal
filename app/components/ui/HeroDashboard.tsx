"use client";

import CardSwap, { Card } from "../reactbits/CardSwap";

// Prints reais dos dashboards da Lagos (em public/dashboards)
const dashboards = [
  { src: "/dashboards/dashboard_ecommerce_vendas.png", label: "E-commerce · Vendas" },
  { src: "/dashboards/dashboard_geracao_leads.png", label: "Geração de Leads" },
  { src: "/dashboards/dashboard_reconhecimento_trafego.png", label: "Reconhecimento · Tráfego" },
];

export default function HeroDashboard() {
  return (
    <CardSwap width={600} height={360} cardDistance={56} verticalDistance={58} delay={3800} pauseOnHover>
      {dashboards.map((d) => (
        <Card key={d.src}>
          <div className="flex h-full flex-col">
            <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <span className="ml-3 truncate font-mono text-[0.66rem] text-white/45">
                app.lagos.com · {d.label}
              </span>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={d.src}
              alt={`Dashboard Lagos: ${d.label}`}
              loading="lazy"
              decoding="async"
              draggable={false}
              className="h-full w-full flex-1 object-cover object-top"
            />
          </div>
        </Card>
      ))}
    </CardSwap>
  );
}
