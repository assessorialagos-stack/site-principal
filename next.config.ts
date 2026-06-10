import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fixa a raiz do Turbopack neste diretório para evitar inferência errada
  // de "workspace root" (que derrubava o dev quando havia arquivos/locks fora do projeto).
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
