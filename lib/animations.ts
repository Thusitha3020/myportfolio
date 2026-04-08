import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─── Eases ────────────────────────────────────────────────────────────────────

export const EASE_OUT_EXPO = "expo.out";
export const EASE_OUT_QUART = "quart.out";
export const EASE_IN_OUT_CUBIC = "cubic.inOut";
export const EASE_ELASTIC = "elastic.out(1, 0.5)";

// ─── Duration constants ───────────────────────────────────────────────────────

export const DUR_FAST = 0.3;
export const DUR_BASE = 0.6;
export const DUR_SLOW = 1.0;
export const DUR_XSLOW = 1.4;

// ─── Reusable from-vars ───────────────────────────────────────────────────────

export const FROM_BELOW: gsap.TweenVars = { y: 50, opacity: 0 };
export const FROM_ABOVE: gsap.TweenVars = { y: -50, opacity: 0 };
export const FROM_LEFT: gsap.TweenVars = { x: -60, opacity: 0 };
export const FROM_RIGHT: gsap.TweenVars = { x: 60, opacity: 0 };
export const FROM_SCALE: gsap.TweenVars = { scale: 0.85, opacity: 0 };

// ─── Preset animations ───────────────────────────────────────────────────────

/**
 * Fade + slide up from below
 */
export function fadeInUp(
  target: gsap.TweenTarget,
  vars: gsap.TweenVars = {}
): gsap.core.Tween {
  return gsap.fromTo(
    target,
    { y: 40, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: DUR_BASE,
      ease: EASE_OUT_EXPO,
      ...vars,
    }
  );
}

/**
 * Stagger children into view
 */
export function staggerFadeInUp(
  targets: gsap.TweenTarget,
  stagger = 0.12,
  vars: gsap.TweenVars = {}
): gsap.core.Tween {
  return gsap.fromTo(
    targets,
    { y: 40, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: DUR_BASE,
      ease: EASE_OUT_EXPO,
      stagger,
      ...vars,
    }
  );
}

/**
 * Horizontal slide animation
 */
export function slideIn(
  target: gsap.TweenTarget,
  direction: "left" | "right" = "left",
  vars: gsap.TweenVars = {}
): gsap.core.Tween {
  const from = direction === "left" ? -60 : 60;
  return gsap.fromTo(
    target,
    { x: from, opacity: 0 },
    {
      x: 0,
      opacity: 1,
      duration: DUR_BASE,
      ease: EASE_OUT_EXPO,
      ...vars,
    }
  );
}

/**
 * Scale pop-in
 */
export function scaleIn(
  target: gsap.TweenTarget,
  vars: gsap.TweenVars = {}
): gsap.core.Tween {
  return gsap.fromTo(
    target,
    { scale: 0.8, opacity: 0 },
    {
      scale: 1,
      opacity: 1,
      duration: DUR_BASE,
      ease: EASE_ELASTIC,
      ...vars,
    }
  );
}

/**
 * Clip-path reveal (from left to right)
 */
export function clipReveal(
  target: gsap.TweenTarget,
  vars: gsap.TweenVars = {}
): gsap.core.Tween {
  return gsap.fromTo(
    target,
    { clipPath: "inset(0 100% 0 0)" },
    {
      clipPath: "inset(0 0% 0 0)",
      duration: DUR_SLOW,
      ease: EASE_OUT_EXPO,
      ...vars,
    }
  );
}

/**
 * Create a ScrollTrigger-based fade-in for a section
 */
export function createScrollReveal(
  trigger: Element | string,
  target: gsap.TweenTarget,
  vars: gsap.TweenVars = {},
  scrollVars: Partial<ScrollTrigger.Vars> = {}
): gsap.core.Tween {
  return gsap.fromTo(
    target,
    { y: 40, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: DUR_BASE,
      ease: EASE_OUT_EXPO,
      ...vars,
      scrollTrigger: {
        trigger,
        start: "top 80%",
        toggleActions: "play none none reverse",
        ...scrollVars,
      },
    }
  );
}

/**
 * Char-by-char text reveal using split spans
 */
export function textReveal(
  chars: Element[],
  vars: gsap.TweenVars = {}
): gsap.core.Tween {
  return gsap.fromTo(
    chars,
    { y: "110%", opacity: 0 },
    {
      y: "0%",
      opacity: 1,
      duration: 0.7,
      ease: EASE_OUT_EXPO,
      stagger: 0.03,
      ...vars,
    }
  );
}

/**
 * Hero entrance master timeline
 */
export function createHeroTimeline(): gsap.core.Timeline {
  return gsap.timeline({ defaults: { ease: EASE_OUT_EXPO } });
}

/**
 * Navbar slide down on page load
 */
export function navbarEntrance(nav: Element): gsap.core.Tween {
  return gsap.fromTo(
    nav,
    { y: -80, opacity: 0 },
    { y: 0, opacity: 1, duration: DUR_BASE, ease: EASE_OUT_EXPO }
  );
}

/**
 * Card hover tilt effect
 */
export function applyCardTilt(
  card: HTMLElement,
  e: React.MouseEvent<HTMLElement>
): void {
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;
  const rotateX = ((y - centerY) / centerY) * -6;
  const rotateY = ((x - centerX) / centerX) * 6;

  gsap.to(card, {
    rotateX,
    rotateY,
    transformPerspective: 800,
    transformOrigin: "center center",
    duration: 0.3,
    ease: "power2.out",
  });
}

/**
 * Reset card tilt
 */
export function resetCardTilt(card: HTMLElement): void {
  gsap.to(card, {
    rotateX: 0,
    rotateY: 0,
    duration: 0.5,
    ease: EASE_ELASTIC,
  });
}
