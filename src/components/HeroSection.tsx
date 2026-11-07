"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowDown, Download } from "lucide-react";
import Link from "next/link";
import { personalInfo, stats } from "@/data/portfolio";
import {
  REVEAL_DURATION_REDUCED,
  REVEAL_EASE,
  REVEAL_OFFSET,
} from "@/lib/motion";
import Card3D from "./Card3D";

const AnimatedCounter = ({
  value,
  suffix,
  start,
}: {
  value: number;
  suffix: string;
  start: boolean;
}) => {
  const [count, setCount] = useState(0);
  const started = useRef(false);
  const frameRef = useRef<number | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const displayCount = shouldReduceMotion && start ? value : count;

  useEffect(() => {
    if (!start || started.current || shouldReduceMotion) return;

    started.current = true;

    const duration = 2600;
    const startTime = performance.now();

    const step = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      setCount(Math.round(eased * value));

      if (progress < 1) {
        frameRef.current = window.requestAnimationFrame(step);
      }
    };

    frameRef.current = window.requestAnimationFrame(step);

    return () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, [shouldReduceMotion, start, value]);

  return (
    <span className="tabular-nums">
      {displayCount}
      {suffix}
    </span>
  );
};

const HeroSection = () => {
  const shouldReduceMotion = useReducedMotion();

  const [statsTriggerRef, statsInView] = useInView({
    triggerOnce: true,
    threshold: 0.05,
    rootMargin: "0px 0px -2% 0px",
  });

  const [statsRevealStarted, setStatsRevealStarted] = useState(false);

  const shouldStartStats = Boolean(
    statsInView && (shouldReduceMotion || statsRevealStarted)
  );

  const container = {
    hidden: {},
    show: {
      transition: shouldReduceMotion
        ? { staggerChildren: 0.04, delayChildren: 0.1 }
        : { staggerChildren: 0.12, delayChildren: 0.3 },
    },
  };

  /* Slide-only reveal, consistent with `revealInitial` in lib/motion. */
  const item = {
    hidden: shouldReduceMotion ? {} : { y: REVEAL_OFFSET },
    show: {
      y: 0,
      transition: {
        duration: shouldReduceMotion ? REVEAL_DURATION_REDUCED : 0.7,
        ease: REVEAL_EASE,
      },
    },
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] items-start overflow-hidden pt-[calc(5rem+env(safe-area-inset-top))] pb-[max(2rem,env(safe-area-inset-bottom))] sm:pt-[calc(5.5rem+env(safe-area-inset-top))] sm:pb-[max(2.5rem,env(safe-area-inset-bottom))] lg:min-h-screen lg:items-center lg:pt-20 lg:pb-12"
    >
      {/* Subtle background grid & Animated Glow Orb */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(hsl(var(--accent)) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Massive Glowing Animated Orbs */}
      <div className="pointer-events-none absolute -right-1/4 top-1/4 h-[800px] w-[800px] rounded-full bg-[radial-gradient(circle,hsl(var(--primary)/0.2)_0%,transparent_70%)] opacity-50 animate-[pulse_8s_ease-in-out_infinite] motion-reduce:animate-none" />

      <div className="pointer-events-none absolute -left-1/4 bottom-0 h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,hsl(var(--accent)/0.2)_0%,transparent_70%)] opacity-40 animate-[pulse_10s_ease-in-out_infinite_reverse] motion-reduce:animate-none" />

      {/* The ambient orbs already fade to transparent at their edges.
          Avoid a full-width overlay here: it creates a visible band in light mode. */}

      <div className="container-narrow relative z-10 w-full min-w-0">
        <div className="grid min-w-0 items-center gap-12 lg:grid-cols-12 lg:gap-8">

          {/* Left - Content */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="flex min-w-0 flex-col gap-6 sm:gap-8 lg:col-span-7"
          >
            <motion.div variants={item}>
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 px-4 py-2 font-mono text-base font-bold tracking-wide text-primary glass-subtle glow-accent-xs">
                <span className="h-2 w-2 animate-pulse rounded-full bg-primary motion-reduce:animate-none" />
                Web · Mobile · AI | Fort Lauderdale, Florida, US
              </span>
            </motion.div>

            <div className="flex min-w-0 flex-col gap-2">
              <motion.h1
                variants={item}
                className="text-4xl font-bold leading-[1.1] tracking-tighter sm:text-7xl sm:leading-[1.05] lg:text-[5.5rem]"
              >
                {personalInfo.name}
              </motion.h1>

              <motion.h2
                variants={item}
                className="mt-2 text-xl font-semibold tracking-tight text-muted-foreground sm:text-4xl"
              >
                {personalInfo.role.split(" ").slice(0, -1).join(" ")}{" "}
                <span className="text-gradient">
                  {personalInfo.role.split(" ").slice(-1)[0]}
                </span>
              </motion.h2>
            </div>

            <motion.p
              variants={item}
              className="max-w-xl text-base font-medium leading-relaxed text-muted-foreground sm:text-lg"
              style={{ textWrap: "pretty" }}
            >
              {personalInfo.tagline}
            </motion.p>

            {/* Stats */}
            <motion.div
              ref={statsTriggerRef}
              variants={item}
              onAnimationStart={() => setStatsRevealStarted(true)}
              className="grid min-w-0 grid-cols-2 gap-4 sm:grid-cols-4"
            >
              {stats.map((stat) => (
                <Link
                  key={stat.label}
                  href={stat.href}
                  className="group min-w-0 border-l-2 border-primary/30 py-1 pl-4 transition-colors hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <div className="text-2xl font-bold tracking-tighter text-foreground">
                    <AnimatedCounter
                      value={stat.value}
                      suffix={stat.suffix}
                      start={shouldStartStats}
                    />
                  </div>

                  <div className="mt-1 min-w-0 break-words text-xs font-medium uppercase tracking-wider text-muted-foreground transition-colors group-hover:text-primary">
                    {stat.label}
                  </div>
                </Link>
              ))}
            </motion.div>

            {/* Call to action buttons */}
            <motion.div
              variants={item}
              className="mt-1 flex flex-col flex-wrap gap-3 sm:mt-2 sm:flex-row sm:gap-4"
            >
              <a
                href="#work"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-bold tracking-wide text-primary-foreground transition-all duration-300 glow-accent-sm hover:glow-accent-md active:scale-95 sm:w-auto"
              >
                Explore project work
                <ArrowDown className="ml-1 h-4 w-4" />
              </a>

              <a
                href={personalInfo.resumeUrl}
                download
                className="btn-cta-secondary w-full sm:w-auto"
              >
                <Download className="mr-1 h-4 w-4 text-primary" />
                Resume
              </a>
            </motion.div>
          </motion.div>

          {/* Right - 3D Engineering Systems Card */}
          <motion.div
            initial={
              shouldReduceMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.95 }
            }
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: shouldReduceMotion ? 0.2 : 1.2,
              delay: shouldReduceMotion ? 0 : 0.4,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="relative hidden min-w-0 justify-end lg:col-span-5 lg:flex"
          >
            {/* Original decorative glow */}
            <div className="absolute inset-0 scale-150 rounded-full bg-[radial-gradient(circle,hsl(var(--primary)/0.15)_0%,transparent_70%)]" />

            {/* Card sizing: no scaling or horizontal translation */}
            <div className="relative z-10 w-full min-w-0 max-w-[500px] xl:max-w-[560px]">
              <Card3D className="w-full">
                <Image
                  src="/images/portfolio/engineering-stack.svg"
                  width={900}
                  height={720}
                  alt=""
                  aria-hidden="true"
                  className="pointer-events-none h-auto w-full select-none rounded-3xl border border-white/10 shadow-accent-strong"
                  draggable={false}
                  priority
                  sizes="(min-width: 1280px) 560px, (min-width: 1024px) 500px, 100vw"
                />
              </Card3D>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;