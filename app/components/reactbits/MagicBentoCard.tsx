// @ts-nocheck
/* eslint-disable */
"use client";

import { useRef, useEffect, useCallback } from "react";
import { gsap } from "gsap";
import "./MagicBentoCard.css";

const DEFAULT_GLOW_COLOR = "47,107,255";
const DEFAULT_PARTICLE_COUNT = 8;

const prefersReducedMotion = () => {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

const createParticleElement = (x, y, color) => {
  const el = document.createElement("div");
  el.className = "magic-bento-particle";
  el.style.cssText = `
    position: absolute;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: rgba(${color}, 1);
    box-shadow: 0 0 6px rgba(${color}, 0.6);
    pointer-events: none;
    z-index: 4;
    left: ${x}px;
    top: ${y}px;
    will-change: transform, opacity;
  `;
  return el;
};

const MagicBentoCard = ({
  children,
  className = "",
  glowColor = DEFAULT_GLOW_COLOR,
  enableTilt = true,
  enableMagnetism = true,
  enableParticles = true,
  enableBorderGlow = true,
  clickEffect = true,
  particleCount = DEFAULT_PARTICLE_COUNT,
}) => {
  const cardRef = useRef(null);

  // Mutable state kept in refs so handlers stay stable across renders.
  const particlesRef = useRef([]);
  const memoizedParticles = useRef([]);
  const particlesInitialized = useRef(false);
  const timeoutsRef = useRef([]);
  const isHoveredRef = useRef(false);
  const magnetismAnimationRef = useRef(null);

  const initializeParticles = useCallback(() => {
    const card = cardRef.current;
    if (particlesInitialized.current || !card) return;
    const { width, height } = card.getBoundingClientRect();
    memoizedParticles.current = Array.from({ length: particleCount }, () =>
      createParticleElement(Math.random() * width, Math.random() * height, glowColor)
    );
    particlesInitialized.current = true;
  }, [particleCount, glowColor]);

  const clearAllParticles = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    if (magnetismAnimationRef.current) magnetismAnimationRef.current.kill();

    particlesRef.current.forEach((particle) => {
      gsap.to(particle, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: "back.in(1.7)",
        onComplete: () => {
          if (particle.parentNode) particle.parentNode.removeChild(particle);
        },
      });
    });
    particlesRef.current = [];
  }, []);

  const animateParticles = useCallback(() => {
    const card = cardRef.current;
    if (!card || !isHoveredRef.current) return;

    if (!particlesInitialized.current) initializeParticles();

    memoizedParticles.current.forEach((particle, index) => {
      const timeoutId = setTimeout(() => {
        if (!isHoveredRef.current || !cardRef.current) return;

        const clone = particle.cloneNode(true);
        cardRef.current.appendChild(clone);
        particlesRef.current.push(clone);

        gsap.fromTo(
          clone,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.7)" }
        );

        gsap.to(clone, {
          x: (Math.random() - 0.5) * 100,
          y: (Math.random() - 0.5) * 100,
          rotation: Math.random() * 360,
          duration: 2 + Math.random() * 2,
          ease: "none",
          repeat: -1,
          yoyo: true,
        });

        gsap.to(clone, {
          opacity: 0.3,
          duration: 1.5,
          ease: "power2.inOut",
          repeat: -1,
          yoyo: true,
        });
      }, index * 100);

      timeoutsRef.current.push(timeoutId);
    });
  }, [initializeParticles]);

  useEffect(() => {
    const element = cardRef.current;
    if (!element) return;

    const disableAnimations = prefersReducedMotion();
    if (disableAnimations) return;
    // Só em dispositivos com cursor fino (desktop). No touch/mobile, sem tilt/partículas
    // (evita jank e comportamento estranho ao tocar).
    if (typeof window !== "undefined" && window.matchMedia && !window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      return;
    }
    let moveRaf = 0;
    let lastMove = null;

    const handleMouseEnter = () => {
      isHoveredRef.current = true;
      if (enableParticles) animateParticles();

      if (enableTilt) {
        gsap.to(element, {
          rotateX: 5,
          rotateY: 5,
          duration: 0.3,
          ease: "power2.out",
          transformPerspective: 1000,
        });
      }
    };

    const handleMouseLeave = () => {
      isHoveredRef.current = false;
      if (enableParticles) clearAllParticles();

      if (enableTilt) {
        gsap.to(element, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.3,
          ease: "power2.out",
          transformPerspective: 1000,
        });
      }

      if (enableMagnetism) {
        gsap.to(element, { x: 0, y: 0, duration: 0.3, ease: "power2.out" });
      }

      if (enableBorderGlow) {
        element.style.setProperty("--glow-intensity", "0");
      }
    };

    const processMove = () => {
      moveRaf = 0;
      const e = lastMove;
      if (!e) return;
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      if (enableBorderGlow) {
        // Border glow follows the cursor along the card edge.
        const relativeX = (x / rect.width) * 100;
        const relativeY = (y / rect.height) * 100;
        element.style.setProperty("--glow-x", `${relativeX}%`);
        element.style.setProperty("--glow-y", `${relativeY}%`);
        element.style.setProperty("--glow-intensity", "1");
      }

      if (enableTilt) {
        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;
        gsap.to(element, {
          rotateX,
          rotateY,
          duration: 0.1,
          ease: "power2.out",
          transformPerspective: 1000,
        });
      }

      if (enableMagnetism) {
        const magnetX = (x - centerX) * 0.05;
        const magnetY = (y - centerY) * 0.05;
        magnetismAnimationRef.current = gsap.to(element, {
          x: magnetX,
          y: magnetY,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    };

    // throttle: no máximo 1 atualização por frame
    const handleMouseMove = (e) => {
      lastMove = e;
      if (!moveRaf) moveRaf = requestAnimationFrame(processMove);
    };

    const handleClick = (e) => {
      if (!clickEffect) return;

      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const maxDistance = Math.max(
        Math.hypot(x, y),
        Math.hypot(x - rect.width, y),
        Math.hypot(x, y - rect.height),
        Math.hypot(x - rect.width, y - rect.height)
      );

      const ripple = document.createElement("div");
      ripple.className = "magic-bento-ripple";
      ripple.style.cssText = `
        position: absolute;
        width: ${maxDistance * 2}px;
        height: ${maxDistance * 2}px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(${glowColor}, 0.4) 0%, rgba(${glowColor}, 0.2) 30%, transparent 70%);
        left: ${x - maxDistance}px;
        top: ${y - maxDistance}px;
        pointer-events: none;
        z-index: 5;
      `;

      element.appendChild(ripple);

      gsap.fromTo(
        ripple,
        { scale: 0, opacity: 1 },
        {
          scale: 1,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          onComplete: () => ripple.remove(),
        }
      );
    };

    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mouseleave", handleMouseLeave);
    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("click", handleClick);

    return () => {
      isHoveredRef.current = false;
      if (moveRaf) cancelAnimationFrame(moveRaf);
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mouseleave", handleMouseLeave);
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("click", handleClick);
      clearAllParticles();
    };
  }, [
    animateParticles,
    clearAllParticles,
    enableTilt,
    enableMagnetism,
    enableParticles,
    enableBorderGlow,
    clickEffect,
    glowColor,
  ]);

  return (
    <div
      ref={cardRef}
      className={`magic-bento-card${enableBorderGlow ? " magic-bento-card--border-glow" : ""}${
        className ? " " + className : ""
      }`}
      style={{ "--glow-color": glowColor }}
    >
      {children}
    </div>
  );
};

export default MagicBentoCard as any;
