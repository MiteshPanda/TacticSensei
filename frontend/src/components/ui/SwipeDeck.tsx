"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SwipeDeckProps {
  label: string;
  children: React.ReactNode[];
}

/**
 * Horizontal swipe deck. Touch/trackpad use native scroll-snap; mouse users
 * can drag, and arrow keys / buttons step through cards.
 */
export default function SwipeDeck({ label, children }: SwipeDeckProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ active: false, startX: 0, startScroll: 0, moved: false });
  const [index, setIndex] = useState(0);
  const count = children.length;

  const goTo = useCallback((next: number) => {
    const track = trackRef.current;
    if (!track) return;
    const clamped = Math.max(0, Math.min(count - 1, next));
    const child = track.children[clamped] as HTMLElement | undefined;
    child?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [count]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => {
      const center = track.scrollLeft + track.clientWidth / 2;
      let best = 0;
      let bestDist = Infinity;
      Array.from(track.children).forEach((el, i) => {
        const c = (el as HTMLElement).offsetLeft + (el as HTMLElement).offsetWidth / 2;
        const d = Math.abs(c - center);
        if (d < bestDist) {
          bestDist = d;
          best = i;
        }
      });
      setIndex(best);
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, []);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const track = trackRef.current;
    if (!track) return;
    drag.current = { active: true, startX: e.clientX, startScroll: track.scrollLeft, moved: false };
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (!drag.current.active || !track) return;
    const dx = e.clientX - drag.current.startX;
    if (Math.abs(dx) > 4) drag.current.moved = true;
    track.style.scrollSnapType = "none";
    track.scrollLeft = drag.current.startScroll - dx;
  };
  const endDrag = () => {
    const track = trackRef.current;
    drag.current.active = false;
    if (track) track.style.scrollSnapType = "";
    goTo(index);
  };

  return (
    <section aria-roledescription="carousel" aria-label={label} className="relative">
      <div
        ref={trackRef}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") { e.preventDefault(); goTo(index + 1); }
          if (e.key === "ArrowLeft") { e.preventDefault(); goTo(index - 1); }
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={() => drag.current.active && endDrag()}
        onClickCapture={(e) => {
          if (drag.current.moved) {
            e.preventDefault();
            e.stopPropagation();
            drag.current.moved = false;
          }
        }}
        className="no-scrollbar flex cursor-grab snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-[max(1rem,calc(50%-9rem))] py-8 active:cursor-grabbing"
      >
        {children.map((child, i) => (
          <div
            key={i}
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${count}`}
            data-active={i === index}
            className="w-72 shrink-0 snap-center transition-[transform,opacity] duration-300 data-[active=false]:scale-[0.92] data-[active=false]:opacity-70"
          >
            {child}
          </div>
        ))}
      </div>

      <div className="mt-2 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => goTo(index - 1)}
          disabled={index === 0}
          aria-label="Previous"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background-card transition-colors hover:border-accent disabled:opacity-40"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <p className="min-w-16 text-center text-sm tabular-nums text-foreground-muted" aria-live="polite">
          {index + 1} / {count}
        </p>
        <button
          type="button"
          onClick={() => goTo(index + 1)}
          disabled={index === count - 1}
          aria-label="Next"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background-card transition-colors hover:border-accent disabled:opacity-40"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </section>
  );
}
