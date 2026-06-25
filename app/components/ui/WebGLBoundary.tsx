"use client";

import { Component, type ReactNode } from "react";

/**
 * Se o WebGL não estiver disponível (ou o contexto falhar), os fundos 3D
 * simplesmente não renderizam — a seção mantém o fundo escuro e os scrims.
 */
export class WebGLBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { failed: false };
  }

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch() {
    // Silencioso de propósito: degradação graciosa do fundo decorativo.
  }

  render() {
    if (this.state.failed) return null;
    return this.props.children;
  }
}
