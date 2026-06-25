"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/app/lib/cn";

/** Botão "ligar/desligar a luz" — alterna modo claro/escuro e persiste a escolha. */
export function ThemeToggle({ className = "" }: { className?: string }) {
  const [light, setLight] = useState(false);

  useEffect(() => {
    // sincroniza com a classe aplicada pelo script no-flash do <head>
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLight(document.documentElement.classList.contains("light"));
  }, []);

  const toggle = () => {
    const el = document.documentElement;
    const next = !el.classList.contains("light");
    el.classList.toggle("light", next);
    try {
      localStorage.setItem("lagos-theme", next ? "light" : "dark");
    } catch {}
    setLight(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={light ? "Desligar a luz (modo escuro)" : "Ligar a luz (modo claro)"}
      title={light ? "Modo escuro" : "Modo claro"}
      className={cn(
        "flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-[#0c0c12]/60 text-white backdrop-blur-xl transition-colors hover:bg-[#0c0c12]/85",
        className
      )}
    >
      {light ? <Moon size={17} /> : <Sun size={17} />}
    </button>
  );
}
