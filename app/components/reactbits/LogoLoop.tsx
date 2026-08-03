// @ts-nocheck
/* eslint-disable */
"use client";

import { useCallback, useEffect, useMemo, useRef, useState, memo } from 'react';
import './LogoLoop.css';

// ─────────────────────────────────────────────────────────────────────────────
// POR QUE ISTO NÃO USA MAIS requestAnimationFrame
//
// A versão original movia a esteira no JS: um requestAnimationFrame por quadro
// escrevendo `track.style.transform`. Isso roda na THREAD PRINCIPAL, que é a
// mesma que processa scroll, toque e React. No celular o navegador SUSPENDE o
// requestAnimationFrame enquanto o dedo arrasta a página (o iOS faz isso sempre;
// o Android faz quando a thread está ocupada) — resultado: as logos ficavam
// paradas exatamente quando o usuário estava rolando o site, ou seja, sempre.
//
// Agora a esteira é uma ANIMAÇÃO DECLARATIVA, criada com a Web Animations API
// (`element.animate`). Diferenças que importam:
//
//   • É montada UMA vez, não a cada quadro. Zero JS durante a animação.
//   • Os keyframes usam PIXELS. Transform em pixel é a forma que o navegador
//     consegue delegar para a thread de composição (GPU) — aí a animação
//     continua rodando durante o scroll e mesmo se a thread principal travar.
//     (Porcentagem, ou valor vindo de variável CSS, faz o Chrome desistir de
//     compor e devolver a animação para a thread principal — o problema de novo.)
//   • Não é afetada pela regra global de `prefers-reduced-motion` do
//     globals.css, que zera a duração de QUALQUER animação CSS. Muitos celulares
//     vêm com "reduzir animações" ligado de fábrica.
//
// A esteira tem sempre 2 sequências iguais e anda exatamente uma sequência por
// volta, então a emenda é invisível.
// ─────────────────────────────────────────────────────────────────────────────

const toCssLength = value => (typeof value === 'number' ? `${value}px` : (value ?? undefined));

const useResizeObserver = (callback, elements, dependencies) => {
  useEffect(() => {
    if (!window.ResizeObserver) {
      const handleResize = () => callback();
      window.addEventListener('resize', handleResize);
      callback();
      return () => window.removeEventListener('resize', handleResize);
    }
    const observers = elements.map(ref => {
      if (!ref.current) return null;
      const observer = new ResizeObserver(callback);
      observer.observe(ref.current);
      return observer;
    });
    callback();
    return () => {
      observers.forEach(observer => observer?.disconnect());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [callback, elements, dependencies]);
};

const useImageLoader = (seqRef, onLoad, dependencies) => {
  useEffect(() => {
    const images = seqRef.current?.querySelectorAll('img') ?? [];
    if (images.length === 0) {
      onLoad();
      return;
    }
    let remainingImages = images.length;
    const handleImageLoad = () => {
      remainingImages -= 1;
      if (remainingImages === 0) onLoad();
    };
    images.forEach(img => {
      const htmlImg = img;
      if (htmlImg.complete) {
        handleImageLoad();
      } else {
        htmlImg.addEventListener('load', handleImageLoad, { once: true });
        htmlImg.addEventListener('error', handleImageLoad, { once: true });
      }
    });
    return () => {
      images.forEach(img => {
        img.removeEventListener('load', handleImageLoad);
        img.removeEventListener('error', handleImageLoad);
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onLoad, seqRef, dependencies]);
};

export const LogoLoop = memo(
  ({
    logos,
    speed = 120,
    direction = 'left',
    width = '100%',
    logoHeight = 28,
    gap = 32,
    pauseOnHover,
    hoverSpeed,
    fadeOut = false,
    fadeOutColor,
    scaleOnHover = false,
    renderItem,
    ariaLabel = 'Partner logos',
    className,
    style
  }) => {
    const containerRef = useRef(null);
    const trackRef = useRef(null);
    const seqRef = useRef(null);
    const animRef = useRef(null);

    // Quantas vezes a lista se repete DENTRO de uma sequência. Precisa ser o
    // bastante para uma sequência cobrir a largura visível (senão apareceria um
    // buraco no meio do loop).
    const [repeats, setRepeats] = useState(1);
    const repeatsRef = useRef(1);
    repeatsRef.current = repeats;

    const [seqSize, setSeqSize] = useState(0);

    const isVertical = direction === 'up' || direction === 'down';

    // 'left'/'up' andam no sentido normal do keyframe; 'right'/'down' invertem.
    // speed negativo também inverte (mantém a API antiga).
    const reversed = useMemo(() => {
      const base = direction === 'right' || direction === 'down';
      return speed < 0 ? !base : base;
    }, [direction, speed]);

    const updateDimensions = useCallback(() => {
      const rect = seqRef.current?.getBoundingClientRect();
      if (!rect) return;
      const measured = isVertical ? rect.height : rect.width;
      if (!(measured > 0)) return;

      const unit = measured / Math.max(1, repeatsRef.current); // largura de UMA passada
      const viewport = isVertical
        ? (containerRef.current?.parentElement?.clientHeight ?? containerRef.current?.clientHeight ?? 0)
        : (containerRef.current?.clientWidth ?? 0);

      const needed = Math.max(1, Math.ceil(viewport / unit));
      if (needed !== repeatsRef.current) setRepeats(needed);

      setSeqSize(prev => (Math.abs(prev - measured) > 1 ? Math.ceil(measured) : prev));

      if (isVertical) {
        const parentHeight = containerRef.current?.parentElement?.clientHeight ?? 0;
        if (containerRef.current && parentHeight > 0) {
          const targetHeight = Math.ceil(parentHeight);
          if (containerRef.current.style.height !== `${targetHeight}px`)
            containerRef.current.style.height = `${targetHeight}px`;
        }
      }
    }, [isVertical]);

    // Arrays memoizados: antes eram literais novos a cada render, então o efeito
    // do ResizeObserver se desmontava e remontava em TODO render (desperdício).
    const observed = useMemo(() => [containerRef, seqRef], []);
    const measureDeps = useMemo(
      () => [logos, gap, logoHeight, isVertical, repeats],
      [logos, gap, logoHeight, isVertical, repeats]
    );

    useResizeObserver(updateDimensions, observed, measureDeps);
    useImageLoader(seqRef, updateDimensions, measureDeps);

    // Uma volta completa percorre uma sequência inteira. speed é em px/s.
    const durationSeconds = useMemo(() => {
      const px = Math.abs(speed);
      if (!seqSize || !px) return 0;
      return seqSize / px;
    }, [seqSize, speed]);

    // Cria (ou recria, se a medida mudou) a animação. Roda uma vez, não por quadro.
    useEffect(() => {
      const track = trackRef.current;
      if (!track || !durationSeconds) return;
      if (typeof track.animate !== 'function') return;

      const from = 'translate3d(0px, 0px, 0px)';
      const to = isVertical
        ? `translate3d(0px, ${-seqSize}px, 0px)`
        : `translate3d(${-seqSize}px, 0px, 0px)`;

      // guarda onde a esteira estava, p/ não dar um pulo quando a medida muda
      const anterior = animRef.current?.currentTime ?? 0;
      animRef.current?.cancel();

      const anim = track.animate([{ transform: from }, { transform: to }], {
        duration: durationSeconds * 1000,
        iterations: Infinity,
        easing: 'linear',
        direction: reversed ? 'reverse' : 'normal'
      });
      anim.currentTime = anterior % (durationSeconds * 1000);
      animRef.current = anim;

      return () => {
        anim.cancel();
        if (animRef.current === anim) animRef.current = null;
      };
    }, [durationSeconds, seqSize, isVertical, reversed]);

    const cssVariables = useMemo(
      () => ({
        '--logoloop-gap': `${gap}px`,
        '--logoloop-logoHeight': `${logoHeight}px`,
        ...(fadeOutColor && { '--logoloop-fadeColor': fadeOutColor })
      }),
      [gap, logoHeight, fadeOutColor]
    );

    const pausesOnHover = hoverSpeed === 0 || pauseOnHover !== false;

    // Pausa no hover SÓ onde existe mouse de verdade. Numa tela de toque um
    // "tap" dispara mouseenter sem o mouseleave correspondente — era assim que
    // o carrossel ficava travado parado no celular depois de um toque.
    useEffect(() => {
      if (!pausesOnHover) return;
      const el = containerRef.current;
      if (!el) return;
      if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

      const enter = () => animRef.current?.pause();
      const leave = () => animRef.current?.play();
      el.addEventListener('mouseenter', enter);
      el.addEventListener('mouseleave', leave);
      return () => {
        el.removeEventListener('mouseenter', enter);
        el.removeEventListener('mouseleave', leave);
      };
    }, [pausesOnHover]);

    const rootClassName = useMemo(
      () =>
        [
          'logoloop',
          isVertical ? 'logoloop--vertical' : 'logoloop--horizontal',
          fadeOut && 'logoloop--fade',
          scaleOnHover && 'logoloop--scale-hover',
          pausesOnHover && 'logoloop--pause-hover',
          className
        ]
          .filter(Boolean)
          .join(' '),
      [isVertical, fadeOut, scaleOnHover, pausesOnHover, className]
    );

    const renderLogoItem = useCallback(
      (item, key) => {
        if (renderItem) {
          return (
            <li className="logoloop__item" key={key} role="listitem">
              {renderItem(item, key)}
            </li>
          );
        }
        const isNodeItem = 'node' in item;
        const content = isNodeItem ? (
          <span className="logoloop__node" aria-hidden={!!item.href && !item.ariaLabel}>
            {item.node}
          </span>
        ) : (
          <img
            src={item.src}
            srcSet={item.srcSet}
            sizes={item.sizes}
            width={item.width}
            height={item.height}
            alt={item.alt ?? ''}
            title={item.title}
            loading="lazy"
            decoding="async"
            draggable={false}
          />
        );
        const itemAriaLabel = isNodeItem ? (item.ariaLabel ?? item.title) : (item.alt ?? item.title);
        const itemContent = item.href ? (
          <a
            className="logoloop__link"
            href={item.href}
            aria-label={itemAriaLabel ?? 'logo link'}
            target="_blank"
            rel="noreferrer noopener"
          >
            {content}
          </a>
        ) : (
          content
        );
        return (
          <li className="logoloop__item" key={key} role="listitem">
            {itemContent}
          </li>
        );
      },
      [renderItem]
    );

    // Conteúdo de UMA sequência (a lista repetida `repeats` vezes).
    const sequenceItems = useMemo(() => {
      const items = [];
      for (let r = 0; r < repeats; r++) {
        logos.forEach((item, i) => items.push(renderLogoItem(item, `${r}-${i}`)));
      }
      return items;
    }, [repeats, logos, renderLogoItem]);

    const containerStyle = useMemo(
      () => ({
        width: isVertical ? (toCssLength(width) === '100%' ? undefined : toCssLength(width)) : (toCssLength(width) ?? '100%'),
        ...cssVariables,
        ...style
      }),
      [width, cssVariables, style, isVertical]
    );

    return (
      <div ref={containerRef} className={rootClassName} style={containerStyle} role="region" aria-label={ariaLabel}>
        <div className="logoloop__track" ref={trackRef}>
          {/* Exatamente 2 sequências iguais: a animação anda uma sequência por
              volta, então quando ela reinicia a segunda cópia já está no lugar
              exato da primeira e a emenda não aparece. */}
          <ul className="logoloop__list" role="list" ref={seqRef}>
            {sequenceItems}
          </ul>
          <ul className="logoloop__list" role="list" aria-hidden="true">
            {sequenceItems}
          </ul>
        </div>
      </div>
    );
  }
);

LogoLoop.displayName = 'LogoLoop';

export default LogoLoop as any;
