"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useTransform as useMotionTransform, useSpring } from "framer-motion";
import {
  Zap,
  ShieldCheck,
  Cpu,
  ChevronRight,
  ArrowRight,
  Bot,
  Terminal,
  CheckCircle2,
  Users,
  Clock,
  Plus,
  Minus,
  Sparkles,
  Shield,
  Award,
  TrendingUp
} from "lucide-react";
import { cn } from "@/lib/utils";

// Noise texture overlay (fixed, pointer-events-none as per performance guidelines)
const NoiseTexture = () => (
  <div
    className="pointer-events-none fixed inset-0 opacity-[0.015] z-[100] mix-blend-overlay"
    style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
    }}
  />
);

// Fluid Island Nav (soft-skill technique)
const FluidIslandNav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
        className={cn(
          "fixed top-0 left-1/2 -translate-x-1/2 z-50 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]",
          scrolled ? "mt-4" : "mt-7"
        )}
      >
        <div className={cn(
          "relative transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]",
          // Outer Shell (Double-Bezel technique)
          "p-1.5 rounded-full",
          "bg-zinc-950/40 backdrop-blur-2xl",
          "shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_8px_32px_rgba(0,0,0,0.6),inset_0_0_0_1px_rgba(255,255,255,0.03)]"
        )}>
          {/* Inner Core */}
          <div className="flex items-center gap-8 px-6 py-3 rounded-[calc(9999px-0.375rem)] bg-zinc-950/60 backdrop-blur-xl">
            <motion.div
              className="flex items-center gap-2.5 cursor-pointer group"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-[0_4px_16px_rgba(79,70,229,0.4)]">
                <Cpu className="text-white w-4 h-4" />
              </div>
              <span className="text-lg font-black tracking-[-0.025em] text-white">
                Synthétique<span className="text-blue-500">.</span>
              </span>
            </motion.div>

            <div className="hidden md:flex items-center gap-8">
              {["Solution", "Méthodologie", "FAQ"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-sm font-semibold text-zinc-400 hover:text-white transition-colors duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]"
                >
                  {item}
                </a>
              ))}
            </div>

            <MagneticButton>
              <span className="text-sm font-bold">Accès Client</span>
            </MagneticButton>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-40 bg-zinc-950/90 backdrop-blur-3xl"
            onClick={() => setMenuOpen(false)}
          >
            <motion.div
              className="flex flex-col items-center justify-center h-full gap-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {["Solution", "Méthodologie", "FAQ"].map((item, i) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i }}
                  className="text-4xl font-bold text-white hover:text-blue-400 transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  {item}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// Magnetic Button with useMotionValue (taste-skill technique)
const MagneticButton = ({ children }: { children: React.ReactNode }) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 300, damping: 20 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    x.set(distanceX * 0.2);
    y.set(distanceY * 0.2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={buttonRef}
      style={{ x: xSpring, y: ySpring }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className="group relative px-5 py-2.5 rounded-full bg-white/[0.05] backdrop-blur-sm text-white font-semibold shadow-[0_0_0_1px_rgba(255,255,255,0.1),inset_0_1px_1px_rgba(255,255,255,0.1)] hover:bg-white/[0.08] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.15),inset_0_1px_1px_rgba(255,255,255,0.15)] transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]"
    >
      {children}
    </motion.button>
  );
};

// Double-Bezel Card (soft-skill Doppelrand technique)
const DoubleBevelCard = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <motion.div
    whileHover={{ y: -8, scale: 1.008 }}
    transition={{ type: "spring", stiffness: 300, damping: 25 }}
    className={cn(
      "group",
      // Outer Shell
      "p-2 rounded-[2rem]",
      "bg-zinc-900/30 backdrop-blur-sm",
      "shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_2px_4px_rgba(0,0,0,0.1)]",
      className
    )}
  >
    {/* Inner Core */}
    <div className={cn(
      "relative rounded-[calc(2rem-0.5rem)] overflow-hidden",
      "bg-zinc-950/60 backdrop-blur-2xl",
      "shadow-[inset_0_1px_1px_rgba(255,255,255,0.08),0_12px_24px_rgba(0,0,0,0.2)]",
      "group-hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.12),0_24px_48px_rgba(0,0,0,0.3)]",
      "transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]"
    )}>
      {/* Liquid Glass hover effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/[0.04] via-transparent to-indigo-600/[0.04] opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]" />
      <div className="relative z-10">{children}</div>
    </div>
  </motion.div>
);

// Button-in-Button CTA (soft-skill technique)
const PremiumCTA = ({ children, variant = "primary" }: { children: React.ReactNode, variant?: "primary" | "secondary" }) => {
  const isPrimary = variant === "primary";

  return (
    <motion.button
      whileHover={{ scale: 1.05, y: -3 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className={cn(
        "group relative px-10 py-5 rounded-full font-bold text-lg overflow-hidden",
        "transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]",
        isPrimary
          ? "bg-white text-zinc-950 shadow-[0_0_0_1px_rgba(255,255,255,0.2),0_8px_32px_rgba(255,255,255,0.15)] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.3),0_12px_56px_rgba(255,255,255,0.25)]"
          : "bg-white/[0.03] backdrop-blur-sm text-white shadow-[0_0_0_1px_rgba(255,255,255,0.1),inset_0_1px_1px_rgba(255,255,255,0.08)] hover:bg-white/[0.06] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.15),inset_0_1px_1px_rgba(255,255,255,0.12)]"
      )}
    >
      <span className="relative z-10 flex items-center gap-3">
        {children}
        {/* Trailing icon in its own nested circle (Button-in-Button) */}
        <div className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]",
          "group-hover:translate-x-1 group-hover:-translate-y-[1px] group-hover:scale-105",
          isPrimary ? "bg-zinc-950/10" : "bg-white/10"
        )}>
          <ChevronRight className="w-4 h-4" />
        </div>
      </span>
      {isPrimary && (
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-white -z-10" />
      )}
    </motion.button>
  );
};

// Perpetual Pulse (taste-skill technique)
const PerpetualPulse = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <motion.div
    animate={{
      scale: [1, 1.05, 1],
      opacity: [0.8, 1, 0.8]
    }}
    transition={{
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }}
    className={className}
  >
    {children}
  </motion.div>
);

// Scroll Entry Animation (soft-skill technique)
const ScrollReveal = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 64, filter: "blur(8px)" }}
    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
    viewport={{ once: true }}
    transition={{ duration: 0.9, delay, ease: [0.32, 0.72, 0, 1] }}
  >
    {children}
  </motion.div>
);

// Trust Badge (ui-ux-pro-max technique)
const TrustBadge = ({ icon: Icon, label }: { icon: React.ElementType, label: string }) => (
  <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-zinc-900/40 backdrop-blur-sm shadow-[0_0_0_1px_rgba(255,255,255,0.06),inset_0_1px_1px_rgba(255,255,255,0.04)]">
    <Icon className="w-4 h-4 text-blue-400" />
    <span className="text-xs font-bold text-zinc-400 uppercase tracking-[0.1em]">{label}</span>
  </div>
);

export default function AIInfrastructureLanding() {
  const { scrollYProgress } = useScroll();
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <main className="bg-zinc-950 text-white selection:bg-blue-500/30 antialiased overflow-x-hidden" style={{ fontFamily: '"Geist", -apple-system, BlinkMacSystemFont, sans-serif' }}>
      <NoiseTexture />
      <FluidIslandNav />

      {/* Hero Section - Asymmetric layout (taste-skill DESIGN_VARIANCE: 8) */}
      <header className="relative min-h-[100dvh] flex items-center pt-32 pb-32 overflow-hidden">
        {/* Ethereal Glass background (soft-skill vibe) */}
        <div className="absolute inset-0 z-0">
          <motion.div style={{ y: yBg }} className="absolute inset-0 opacity-40">
            {/* Radial mesh gradients */}
            <div className="absolute top-[-15%] left-[-10%] w-[60%] h-[60%] bg-blue-600/10 blur-[180px] rounded-full" />
            <div className="absolute bottom-[15%] right-[-8%] w-[50%] h-[50%] bg-indigo-600/8 blur-[160px] rounded-full" />
            <div className="absolute top-[40%] left-[50%] w-[40%] h-[40%] bg-emerald-600/5 blur-[140px] rounded-full" />
          </motion.div>
          {/* Fine grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,#000_60%,transparent_110%)]" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-6xl mx-auto text-center">
            {/* Trust badges (ui-ux-pro-max) */}
            <ScrollReveal>
              <div className="flex flex-wrap justify-center gap-4 mb-10">
                <TrustBadge icon={ShieldCheck} label="SOC2 Type II" />
                <TrustBadge icon={Award} label="ISO 27001" />
                <TrustBadge icon={Shield} label="RGPD Compliant" />
              </div>
            </ScrollReveal>

            {/* Status badge with perpetual pulse */}
            <ScrollReveal delay={0.1}>
              <div className="inline-flex items-center gap-3.5 px-6 py-3 rounded-full shadow-[0_0_0_1px_rgba(59,130,246,0.25),inset_0_1px_1px_rgba(59,130,246,0.1)] bg-blue-500/[0.04] backdrop-blur-md mb-12">
                <PerpetualPulse>
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-400 shadow-[0_0_16px_rgba(59,130,246,1)]" />
                </PerpetualPulse>
                <span className="text-xs font-black tracking-[0.14em] text-blue-400 uppercase">Architecture IA Haute Performance</span>
              </div>
            </ScrollReveal>

            {/* Hero title - Negative letter-spacing (taste-skill) */}
            <ScrollReveal delay={0.15}>
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-black leading-[0.93] tracking-[-0.05em] mb-12">
                L&apos;IA n&apos;est plus une option. <br />
                <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-500 bg-clip-text text-transparent">
                  C&apos;est votre avantage injuste.
                </span>
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={0.25}>
              <p className="text-xl md:text-2xl text-zinc-400 max-w-4xl mx-auto mb-16 leading-[1.65]">
                Ne regardez pas vos concurrents automatiser leur croissance. Déployez une infrastructure d&apos;agents autonomes et de skills IA pour transformer votre entreprise en moteur de vélocité synthétique.
              </p>
            </ScrollReveal>

            {/* CTAs */}
            <ScrollReveal delay={0.35}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-20">
                <PremiumCTA variant="primary">
                  Réserver un Audit Stratégique Gratuit
                </PremiumCTA>
                <PremiumCTA variant="secondary">
                  Consulter un expert IA
                </PremiumCTA>
              </div>
            </ScrollReveal>

            {/* Social proof */}
            <ScrollReveal delay={0.5}>
              <div className="pt-16 border-t border-white/[0.04] flex flex-wrap justify-center gap-16 items-center opacity-30 hover:opacity-50 transition-opacity duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]">
                {["AI-ALLIANCE", "FUTURECORE", "QUANTUM-SYS", "NEXUS-ENT"].map((logo) => (
                  <div key={logo} className="text-xl font-black tracking-[-0.02em] grayscale">{logo}</div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </header>

      {/* Bento Grid Stats Section (taste-skill Bento 2.0) */}
      <section className="py-40 relative">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            {/* CSS Grid masonry-like layout (taste-skill) */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Large stat card */}
              <ScrollReveal delay={0}>
                <DoubleBevelCard className="md:col-span-6 md:row-span-2">
                  <div className="p-12 h-full flex flex-col justify-center">
                    <TrendingUp className="w-12 h-12 text-blue-400 mb-6" />
                    <PerpetualPulse>
                      <div className="text-8xl font-black tracking-[-0.05em] bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent mb-4">
                        310%
                      </div>
                    </PerpetualPulse>
                    <div className="text-xs text-zinc-500 uppercase tracking-[0.18em] font-bold mb-3">Gain de productivité</div>
                    <p className="text-zinc-400 text-sm leading-relaxed">Mesuré sur 12 mois auprès de 47 entreprises déployées</p>
                  </div>
                </DoubleBevelCard>
              </ScrollReveal>

              {/* Small stat cards */}
              <ScrollReveal delay={0.1}>
                <DoubleBevelCard className="md:col-span-6">
                  <div className="p-10 text-center">
                    <div className="text-5xl font-black tracking-[-0.04em] text-white mb-3">€500k</div>
                    <div className="text-xs text-zinc-500 uppercase tracking-[0.15em] font-bold">Économie annuelle ops</div>
                  </div>
                </DoubleBevelCard>
              </ScrollReveal>

              <ScrollReveal delay={0.15}>
                <DoubleBevelCard className="md:col-span-3">
                  <div className="p-10 text-center">
                    <div className="text-5xl font-black tracking-[-0.04em] text-white mb-3">24/7</div>
                    <div className="text-xs text-zinc-500 uppercase tracking-[0.15em] font-bold">Disponibilité</div>
                  </div>
                </DoubleBevelCard>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <DoubleBevelCard className="md:col-span-3">
                  <div className="p-10 text-center">
                    <div className="text-5xl font-black tracking-[-0.04em] text-white mb-3">0</div>
                    <div className="text-xs text-zinc-500 uppercase tracking-[0.15em] font-bold">Latence RH</div>
                  </div>
                </DoubleBevelCard>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section - Split Screen (taste-skill asymmetric) */}
      <section className="py-40 bg-zinc-950/50">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-28 items-center max-w-7xl mx-auto">
            <ScrollReveal>
              <div>
                <span className="text-blue-400 font-black uppercase tracking-[0.16em] text-xs mb-8 block">Le Risque d&apos;Obsolescence</span>
                <h2 className="text-5xl md:text-6xl font-black mb-10 leading-[1.02] tracking-[-0.035em]">
                  Pendant que vous recrutez, vos concurrents <span className="text-blue-400">déploient</span>.
                </h2>
                <p className="text-xl text-zinc-400 mb-14 leading-[1.7]">
                  Le paradigme du scaling linéaire est mort. Les entreprises qui dominent le marché multiplient par 100 leur capacité d&apos;exécution via des infrastructures autonomes.
                </p>

                <div className="space-y-6">
                  {[
                    { title: "Dette Opérationnelle", desc: "Vos équipes passent 60% de leur temps sur des tâches à faible valeur ajoutée." },
                    { title: "Goulot d'Étranglement Technique", desc: "Votre cycle de développement est freiné par des processus manuels dépassés." },
                    { title: "Scalabilité Capée", desc: "Votre croissance est limitée par le temps humain disponible." }
                  ].map((item, i) => (
                    <ScrollReveal key={i} delay={i * 0.08}>
                      <DoubleBevelCard className="group cursor-pointer hover:border-red-500/20 transition-colors duration-500">
                        <div className="flex gap-6 p-8">
                          <div className="shrink-0 w-14 h-14 rounded-xl shadow-[0_0_0_1px_rgba(239,68,68,0.15),inset_0_1px_1px_rgba(239,68,68,0.08)] flex items-center justify-center text-red-400 bg-red-500/[0.06] group-hover:bg-red-500/[0.12] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]">
                            <Zap className="w-7 h-7" />
                          </div>
                          <div>
                            <h4 className="font-black text-white mb-3 text-lg tracking-tight">{item.title}</h4>
                            <p className="text-sm text-zinc-400 leading-relaxed">{item.desc}</p>
                          </div>
                        </div>
                      </DoubleBevelCard>
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="relative">
                {/* Ethereal glow */}
                <div className="absolute -inset-8 bg-gradient-to-tr from-blue-500/10 to-indigo-500/10 rounded-[3rem] blur-[80px]" />

                <DoubleBevelCard className="relative">
                  <div className="aspect-square p-16 flex items-center justify-center">
                    <div className="w-full h-full shadow-[0_0_0_1px_rgba(255,255,255,0.04),inset_0_1px_1px_rgba(255,255,255,0.06)] rounded-[2rem] bg-zinc-950/50 backdrop-blur-sm p-12 flex flex-col items-center justify-center text-center">
                      <PerpetualPulse className="mb-10">
                        <div className="w-28 h-28 bg-blue-500/10 rounded-full flex items-center justify-center shadow-[0_0_48px_rgba(59,130,246,0.4)]">
                          <Zap className="text-blue-400 w-14 h-14" />
                        </div>
                      </PerpetualPulse>
                      <div className="text-8xl font-black text-white mb-4 tracking-[-0.05em]">3.5x</div>
                      <div className="text-zinc-400 font-black uppercase tracking-[0.12em] text-xs mb-12">Vélocité Delivery</div>
                      <div className="grid grid-cols-2 gap-4 w-full">
                        <div className="p-5 bg-white/[0.02] shadow-[0_0_0_1px_rgba(255,255,255,0.04),inset_0_1px_1px_rgba(255,255,255,0.04)] rounded-2xl text-sm font-bold">-80% Support</div>
                        <div className="p-5 bg-white/[0.02] shadow-[0_0_0_1px_rgba(255,255,255,0.04),inset_0_1px_1px_rgba(255,255,255,0.04)] rounded-2xl text-sm font-bold">+200% Output</div>
                      </div>
                    </div>
                  </div>
                </DoubleBevelCard>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section id="solution" className="py-40 relative">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="text-center max-w-4xl mx-auto mb-28">
              <div className="inline-block px-6 py-2.5 rounded-full shadow-[0_0_0_1px_rgba(59,130,246,0.25),inset_0_1px_1px_rgba(59,130,246,0.08)] bg-blue-500/[0.04] text-blue-400 text-xs font-black tracking-[0.16em] uppercase mb-10">
                Infrastructure IA
              </div>
              <h2 className="text-5xl md:text-7xl font-black mb-10 leading-[1] tracking-[-0.04em]">
                L&apos;Écosystème du Futur, Aujourd&apos;hui.
              </h2>
              <p className="text-xl text-zinc-400 leading-[1.7]">
                Une orchestration complexe et robuste conçue pour les exigences de l&apos;entreprise moderne.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {[
              {
                icon: Terminal,
                title: "Ingénierie de Précision",
                desc: "Déploiement de Claude Code au cœur de vos équipes tech pour un cycle de développement sans friction.",
                items: [
                  "Implémentation intégrée à votre CI/CD",
                  "Pairs d'IA programmés pour votre stack",
                  "Réduction du Time-to-Market de 65%",
                  "Outils d'autocorrection des bugs"
                ]
              },
              {
                icon: Bot,
                title: "Cerveau Synthétique",
                desc: "184+ agents IA autonomes programmés pour chaque département.",
                items: [
                  "Support client 24/7 hyper-personnalisé",
                  "Génération de leads à haute vélocité",
                  "Audit financier automatisé en temps réel",
                  "Agents de design et de contenu"
                ]
              },
              {
                icon: Sparkles,
                title: "Auto-Skills & Workflows",
                desc: "85+ briques d'automatisation avancées pour lier chaque outil de votre écosystème.",
                items: [
                  "Cross-platform data synchronization",
                  "Intelligence décisionnelle automatisée",
                  "Élimination des tâches répétitives",
                  "Reporting prédictif par IA"
                ]
              }
            ].map((service, i) => (
              <ScrollReveal key={i} delay={i * 0.12}>
                <DoubleBevelCard>
                  <div className="p-12">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mb-10 shadow-[0_16px_32px_rgba(79,70,229,0.35)]">
                      <service.icon className="text-white w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-black mb-5 tracking-tight">{service.title}</h3>
                    <p className="text-zinc-400 mb-10 leading-[1.7]">{service.desc}</p>
                    <ul className="space-y-4">
                      {service.items.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3.5 text-sm text-zinc-300">
                          <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </DoubleBevelCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section id="méthodologie" className="py-40 bg-zinc-950/50">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="text-center max-w-4xl mx-auto mb-28">
              <span className="inline-block px-6 py-2.5 rounded-full shadow-[0_0_0_1px_rgba(59,130,246,0.25),inset_0_1px_1px_rgba(59,130,246,0.08)] bg-blue-500/[0.04] text-blue-400 text-xs font-black tracking-[0.16em] uppercase mb-10">
                Le Processus
              </span>
              <h2 className="text-5xl md:text-7xl font-black mb-10 leading-[1] tracking-[-0.04em]">
                Votre Transformation en 4 Étapes
              </h2>
              <p className="text-xl text-zinc-400 leading-[1.7]">
                D&apos;une infrastructure rigide vers une agilité totale par l&apos;IA.
              </p>
            </div>
          </ScrollReveal>

          <div className="max-w-6xl mx-auto space-y-8">
            {[
              {
                step: "01",
                title: "Audit Stratégique & GAP Analysis",
                desc: "Analyse profonde de vos goulots d'étranglement opérationnels et identification des opportunités d'implémentation IA à fort ROI.",
                tag: "Semaine 1"
              },
              {
                step: "02",
                title: "Architecture & Blueprints",
                desc: "Design de votre écosystème d'agents personnalisé. Nous définissons les protocoles de sécurité et l'architecture cloud souveraine.",
                tag: "Semaine 2-3"
              },
              {
                step: "03",
                title: "Déploiement & Intégration",
                desc: "Mise en service des 184+ agents et configuration des skills d'automatisation dans vos flux existants sans interruption.",
                tag: "Semaine 4-8"
              },
              {
                step: "04",
                title: "Scale & Support Continu",
                desc: "Formation de vos cadres et optimisation continue des performances des agents par nos ingénieurs.",
                tag: "Continu"
              }
            ].map((item, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.1}>
                <DoubleBevelCard className="hover:scale-[1.01] transition-transform duration-700">
                  <div className="group flex flex-col md:flex-row gap-10 p-12">
                    <div className="text-7xl font-black text-white/[0.04] group-hover:text-blue-500/[0.12] transition-colors duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] shrink-0 leading-none">
                      {item.step}
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-5 mb-6">
                        <h3 className="text-3xl font-black text-white tracking-tight">{item.title}</h3>
                        <span className="px-5 py-2 bg-blue-500/[0.08] text-blue-400 text-xs font-black uppercase rounded-full shadow-[0_0_0_1px_rgba(59,130,246,0.2),inset_0_1px_1px_rgba(59,130,246,0.08)]">
                          {item.tag}
                        </span>
                      </div>
                      <p className="text-zinc-400 text-lg leading-[1.7]">{item.desc}</p>
                    </div>
                  </div>
                </DoubleBevelCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Urgency Section */}
      <section className="py-40">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="relative max-w-6xl mx-auto rounded-[3rem] bg-gradient-to-br from-blue-900/20 to-indigo-900/20 shadow-[0_0_0_1px_rgba(59,130,246,0.2),0_20px_60px_rgba(79,70,229,0.25),inset_0_1px_1px_rgba(59,130,246,0.1)] overflow-hidden p-20 md:p-28">
              <div className="absolute top-0 right-0 p-20 opacity-[0.03] pointer-events-none">
                <Clock className="w-96 h-96" />
              </div>

              <div className="max-w-3xl relative z-10">
                <h2 className="text-5xl md:text-7xl font-black text-white mb-12 tracking-[-0.04em] leading-[0.98]">
                  La fenêtre stratégique se referme.
                </h2>
                <div className="space-y-8 text-xl text-zinc-300 mb-16 leading-[1.7]">
                  <p>
                    Dans 24 mois, chaque entreprise de votre secteur possédera une infrastructure IA. À ce stade, ce ne sera plus un avantage, mais un prérequis de survie.
                  </p>
                  <p className="font-black text-white text-2xl">
                    Ceux qui déploient aujourd&apos;hui créent un écart de performance qu&apos;il sera impossible de rattraper demain.
                  </p>
                </div>
                <PremiumCTA variant="primary">
                  Saisir l&apos;avantage maintenant
                </PremiumCTA>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-40 bg-zinc-950/50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-24">
                <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-[-0.04em]">Questions Fréquentes</h2>
                <p className="text-xl text-zinc-400 leading-[1.7]">Tout ce que vous devez savoir avant d&apos;engager votre transition.</p>
              </div>
            </ScrollReveal>

            <div className="space-y-6">
              {[
                {
                  q: "Comment garantissez-vous la sécurité de nos données ?",
                  a: "Nous déployons des instances IA souveraines et cloisonnées. Vos données ne sont jamais utilisées pour entraîner des modèles publics. Chaque agent respecte les protocoles de sécurité les plus stricts (SOC2 Type II, RGPD)."
                },
                {
                  q: "L'installation nécessite-t-elle de changer nos outils actuels ?",
                  a: "Non. Nos infrastructures sont conçues pour se greffer sur vos logiciels existants (Slack, Salesforce, Jira, GitHub, Notion, etc.) via des connecteurs natifs ou des protocoles API personnalisés."
                },
                {
                  q: "Quel est le délai moyen pour voir les premiers résultats ?",
                  a: "Dès la première phase d'audit (semaine 1), nous identifions des 'Quick Wins'. Le déploiement complet prend généralement 4 à 8 semaines, mais l'accélération tech commence dès le 15ème jour."
                },
                {
                  q: "Formez-vous nos équipes à collaborer avec les agents ?",
                  a: "Absolument. La technologie n'est rien sans l'humain. Nous organisons des workshops intensifs pour vos leaders et vos équipes afin qu'ils apprennent à piloter cette nouvelle force de travail synthétique."
                },
                {
                  q: "Peut-on commander des agents personnalisés pour des besoins spécifiques ?",
                  a: "C'est notre spécialité. Au-delà des agents standards, nous concevons des agents 'maison' entraînés sur vos connaissances métiers spécifiques et vos processus propriétaires."
                }
              ].map((item, i) => (
                <ScrollReveal key={i} delay={i * 0.06}>
                  <AccordionItem question={item.q} answer={item.a} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-40 shadow-[0_-1px_0_0_rgba(255,255,255,0.03)] relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-600/[0.02] backdrop-blur-3xl" />
        <div className="container mx-auto px-6 text-center relative z-10">
          <ScrollReveal>
            <div className="max-w-5xl mx-auto">
              <h2 className="text-6xl md:text-8xl font-black text-white mb-12 tracking-[-0.05em] leading-[0.93]">
                Rejoignez le top 1% des entreprises AI-First.
              </h2>
              <p className="text-2xl text-zinc-400 mb-20 max-w-3xl mx-auto leading-[1.7]">
                Transformez votre structure organisationnelle avant que le marché ne vous y oblige.
              </p>

              {/* Double-Bezel CTA Box */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="inline-block p-2.5 rounded-[3rem] bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-500 shadow-[0_24px_60px_rgba(79,70,229,0.4)]"
              >
                <div className="bg-zinc-950 rounded-[calc(3rem-0.625rem)] p-8 flex flex-col md:flex-row items-center gap-10 md:gap-20 px-16 py-12">
                  <div className="text-left">
                    <div className="text-white font-black text-3xl mb-3 tracking-tight">Audit Stratégique Offert</div>
                    <div className="text-zinc-400 text-sm font-semibold">Valeur de la session : 1 250 € — Places limitées.</div>
                  </div>
                  <button className="px-14 py-6 bg-white text-zinc-950 font-black uppercase text-sm tracking-[0.12em] rounded-full hover:bg-blue-50 shadow-[0_8px_24px_rgba(255,255,255,0.2)] hover:shadow-[0_12px_32px_rgba(255,255,255,0.3)] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-105">
                    Réserver mon appel stratégique
                  </button>
                </div>
              </motion.div>

              <div className="mt-20 flex flex-wrap items-center justify-center gap-x-14 gap-y-5 text-zinc-500 text-sm font-semibold">
                <span className="flex items-center gap-2.5"><ShieldCheck className="w-4 h-4" /> Sans engagement</span>
                <span className="flex items-center gap-2.5"><Users className="w-4 h-4" /> Consulting de haut niveau</span>
                <span className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4" /> Plan d&apos;action concret</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-white/[0.03] bg-zinc-950">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-10">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-[0_8px_24px_rgba(79,70,229,0.3)]">
                <Cpu className="text-white w-6 h-6" />
              </div>
              <span className="text-2xl font-black tracking-[-0.03em] text-white">
                Synthétique<span className="text-blue-500">.</span>
              </span>
            </div>

            <div className="flex gap-12 text-sm text-zinc-500 font-semibold">
              <a href="#" className="hover:text-white transition-colors duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]">Mentions Légales</a>
              <a href="#" className="hover:text-white transition-colors duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]">Confidentialité</a>
              <a href="#" className="hover:text-white transition-colors duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]">Contact</a>
            </div>

            <div className="text-sm text-zinc-600 font-medium">
              © 2024 Synthétique AI Infrastructure. Tous droits réservés.
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

// Accordion Item Component
const AccordionItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <DoubleBevelCard className="cursor-pointer">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-10 flex items-center justify-between text-left focus:outline-none hover:bg-white/[0.01] transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]"
      >
        <span className="text-lg font-black text-white pr-6 tracking-tight">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
        >
          {isOpen ? <Minus className="text-blue-400 w-5 h-5 flex-shrink-0" /> : <Plus className="text-blue-400 w-5 h-5 flex-shrink-0" />}
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
            className="overflow-hidden"
          >
            <div className="px-10 pb-10 text-zinc-400 leading-[1.7] border-t border-white/[0.03] pt-8">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </DoubleBevelCard>
  );
};
