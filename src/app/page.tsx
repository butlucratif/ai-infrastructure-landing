"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
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

// Noise texture overlay - fixed, pointer-events-none
const NoiseTexture = () => (
  <div
    className="pointer-events-none fixed inset-0 opacity-[0.025] z-[100] mix-blend-overlay"
    style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
    }}
  />
);

// Animated neon grid background
const NeonGrid = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#00D9FF08_1px,transparent_1px),linear-gradient(to_bottom,#00D9FF08_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_0%,#000_40%,transparent_100%)]" />
    <motion.div
      animate={{
        backgroundPosition: ["0% 0%", "100% 100%"],
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: "linear"
      }}
      className="absolute inset-0 opacity-20"
      style={{
        backgroundImage: "linear-gradient(to right, #00D9FF10 1px, transparent 1px), linear-gradient(to bottom, #FF00FF10 1px, transparent 1px)",
        backgroundSize: "80px 80px"
      }}
    />
  </div>
);

// Fluid Island Nav with neon glow
const FluidIslandNav = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
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
        // Neon outer glow
        "p-1.5 rounded-full",
        "bg-[#0A0118]/60 backdrop-blur-2xl",
        "shadow-[0_0_0_1px_rgba(0,217,255,0.3),0_0_20px_rgba(0,217,255,0.2),0_8px_32px_rgba(0,0,0,0.6),inset_0_0_0_1px_rgba(0,217,255,0.1)]"
      )}>
        <div className="flex items-center gap-8 px-6 py-3 rounded-[calc(9999px-0.375rem)] bg-[#0A0118]/80 backdrop-blur-xl">
          <motion.div
            className="flex items-center gap-2.5 cursor-pointer group"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            <div className="w-8 h-8 bg-gradient-to-br from-[#00D9FF] to-[#FF00FF] rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(0,217,255,0.5),0_0_40px_rgba(255,0,255,0.3)]">
              <Cpu className="text-white w-4 h-4" />
            </div>
            <span className="text-lg font-black tracking-[-0.025em] text-[#E0E7FF]" style={{
              textShadow: "0 0 20px rgba(0,217,255,0.3)"
            }}>
              Synthétique<span className="text-[#00FF94]">.</span>
            </span>
          </motion.div>

          <div className="hidden md:flex items-center gap-8">
            {["Solution", "Méthodologie", "FAQ"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm font-semibold text-[#A5B4FC] hover:text-[#00D9FF] transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]"
                style={{
                  textShadow: "0 0 10px rgba(0,217,255,0)"
                }}
                onMouseEnter={(e) => e.currentTarget.style.textShadow = "0 0 10px rgba(0,217,255,0.6)"}
                onMouseLeave={(e) => e.currentTarget.style.textShadow = "0 0 10px rgba(0,217,255,0)"}
              >
                {item}
              </a>
            ))}
          </div>

          <NeonButton size="sm">
            <span className="text-sm font-bold">Accès Client</span>
          </NeonButton>
        </div>
      </div>
    </motion.nav>
  );
};

// Neon Button Component
const NeonButton = ({ children, size = "md", variant = "primary" }: { children: React.ReactNode, size?: "sm" | "md" | "lg", variant?: "primary" | "secondary" }) => {
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

    x.set(distanceX * 0.15);
    y.set(distanceY * 0.15);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const sizeClasses = {
    sm: "px-5 py-2.5 text-sm",
    md: "px-8 py-4 text-base",
    lg: "px-12 py-5 text-lg"
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
      className={cn(
        "group relative rounded-full font-bold overflow-hidden",
        "transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]",
        sizeClasses[size],
        variant === "primary"
          ? "bg-gradient-to-r from-[#00D9FF] to-[#00FF94] text-[#0A0118] shadow-[0_0_30px_rgba(0,217,255,0.4),0_0_60px_rgba(0,255,148,0.2),inset_0_1px_1px_rgba(255,255,255,0.3)] hover:shadow-[0_0_40px_rgba(0,217,255,0.6),0_0_80px_rgba(0,255,148,0.4)]"
          : "bg-[#0A0118]/40 backdrop-blur-sm text-[#00D9FF] shadow-[0_0_0_1px_rgba(0,217,255,0.4),0_0_20px_rgba(0,217,255,0.2),inset_0_1px_1px_rgba(0,217,255,0.1)] hover:shadow-[0_0_0_1px_rgba(0,217,255,0.6),0_0_30px_rgba(0,217,255,0.3)]"
      )}
    >
      <span className="relative z-10 flex items-center gap-3">
        {children}
      </span>
      {variant === "primary" && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-[#00FF94] to-[#00D9FF] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        />
      )}
    </motion.button>
  );
};

// Neon CTA with icon
const NeonCTA = ({ children, icon = true }: { children: React.ReactNode, icon?: boolean }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05, y: -3 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className="group relative px-12 py-6 rounded-full font-black text-lg overflow-hidden bg-gradient-to-r from-[#00D9FF] via-[#FF00FF] to-[#00FF94] text-[#0A0118] shadow-[0_0_40px_rgba(0,217,255,0.5),0_0_80px_rgba(255,0,255,0.3),inset_0_2px_2px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_rgba(0,217,255,0.7),0_0_120px_rgba(255,0,255,0.5)] transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]"
    >
      <span className="relative z-10 flex items-center gap-4">
        {children}
        {icon && (
          <motion.div
            className="w-9 h-9 rounded-full flex items-center justify-center bg-[#0A0118]/20 backdrop-blur-sm"
            whileHover={{ x: 4, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            <ChevronRight className="w-5 h-5" />
          </motion.div>
        )}
      </span>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-[#00FF94] via-[#00D9FF] to-[#FF00FF]"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      />
    </motion.button>
  );
};

// Double-Bezel Card with neon accents
const NeonCard = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <motion.div
    whileHover={{ y: -8, scale: 1.008 }}
    transition={{ type: "spring", stiffness: 300, damping: 25 }}
    className={cn(
      "group",
      "p-2 rounded-[2rem]",
      "bg-[#0A0118]/30 backdrop-blur-sm",
      "shadow-[0_0_0_1px_rgba(0,217,255,0.2),0_0_20px_rgba(0,217,255,0.1),0_2px_4px_rgba(0,0,0,0.1)]",
      "hover:shadow-[0_0_0_1px_rgba(0,217,255,0.4),0_0_40px_rgba(0,217,255,0.2),0_0_60px_rgba(255,0,255,0.15)]",
      "transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]",
      className
    )}
  >
    <div className="relative rounded-[calc(2rem-0.5rem)] overflow-hidden bg-[#0A0118]/60 backdrop-blur-2xl shadow-[inset_0_1px_1px_rgba(0,217,255,0.08),0_12px_24px_rgba(0,0,0,0.2)] group-hover:shadow-[inset_0_1px_1px_rgba(0,217,255,0.15),0_24px_48px_rgba(0,0,0,0.3)] transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]">
      {/* Neon glow gradient on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#00D9FF]/[0.05] via-transparent to-[#FF00FF]/[0.05] opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]" />
      <div className="relative z-10">{children}</div>
    </div>
  </motion.div>
);

// Perpetual Neon Pulse
const NeonPulse = ({ children, className, color = "cyan" }: { children: React.ReactNode, className?: string, color?: "cyan" | "magenta" | "lime" }) => {
  const colors = {
    cyan: "rgba(0,217,255,1)",
    magenta: "rgba(255,0,255,1)",
    lime: "rgba(0,255,148,1)"
  };

  return (
    <motion.div
      animate={{
        boxShadow: [
          `0 0 20px ${colors[color]}`,
          `0 0 40px ${colors[color]}`,
          `0 0 20px ${colors[color]}`
        ]
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Scroll Reveal with fluid transition
const ScrollReveal = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 80, filter: "blur(10px)" }}
    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

// Trust Badge with neon
const TrustBadge = ({ icon: Icon, label }: { icon: React.ElementType, label: string }) => (
  <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#0A0118]/40 backdrop-blur-sm shadow-[0_0_0_1px_rgba(0,217,255,0.3),0_0_20px_rgba(0,217,255,0.1),inset_0_1px_1px_rgba(0,217,255,0.05)]">
    <Icon className="w-4 h-4 text-[#00D9FF]" style={{ filter: "drop-shadow(0 0 8px rgba(0,217,255,0.6))" }} />
    <span className="text-xs font-bold text-[#A5B4FC] uppercase tracking-[0.1em]">{label}</span>
  </div>
);

export default function AIInfrastructureLanding() {
  const { scrollYProgress } = useScroll();
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <main className="bg-[#0A0118] text-[#E0E7FF] selection:bg-[#00D9FF]/30 antialiased overflow-x-hidden" style={{ fontFamily: '"Geist", -apple-system, BlinkMacSystemFont, sans-serif' }}>
      <NoiseTexture />
      <NeonGrid />
      <FluidIslandNav />

      {/* Hero Section */}
      <header className="relative min-h-[100dvh] flex items-center pt-32 pb-32 overflow-hidden">
        {/* Neon orbs background */}
        <div className="absolute inset-0 z-0">
          <motion.div style={{ y: yBg }} className="absolute inset-0">
            {/* Animated neon orbs */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute top-[-10%] left-[-5%] w-[50%] h-[50%] bg-[#00D9FF]/20 blur-[120px] rounded-full"
            />
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.2, 0.4, 0.2]
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
              className="absolute bottom-[10%] right-[-10%] w-[60%] h-[60%] bg-[#FF00FF]/15 blur-[140px] rounded-full"
            />
            <motion.div
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.25, 0.45, 0.25]
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2
              }}
              className="absolute top-[40%] left-[50%] w-[45%] h-[45%] bg-[#00FF94]/12 blur-[130px] rounded-full"
            />
          </motion.div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-6xl mx-auto text-center">
            {/* Trust badges */}
            <ScrollReveal>
              <div className="flex flex-wrap justify-center gap-4 mb-10">
                <TrustBadge icon={ShieldCheck} label="SOC2 Type II" />
                <TrustBadge icon={Award} label="ISO 27001" />
                <TrustBadge icon={Shield} label="RGPD Compliant" />
              </div>
            </ScrollReveal>

            {/* Status badge with neon pulse */}
            <ScrollReveal delay={0.1}>
              <div className="inline-flex items-center gap-3.5 px-6 py-3 rounded-full shadow-[0_0_0_1px_rgba(0,217,255,0.3),0_0_30px_rgba(0,217,255,0.2),inset_0_1px_1px_rgba(0,217,255,0.1)] bg-[#0A0118]/40 backdrop-blur-md mb-12">
                <NeonPulse color="cyan">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#00D9FF]" />
                </NeonPulse>
                <span className="text-xs font-black tracking-[0.14em] text-[#00D9FF] uppercase" style={{ textShadow: "0 0 20px rgba(0,217,255,0.6)" }}>
                  Architecture IA Haute Performance
                </span>
              </div>
            </ScrollReveal>

            {/* Hero title with neon glow */}
            <ScrollReveal delay={0.15}>
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-black leading-[0.93] tracking-[-0.05em] mb-12">
                <span className="text-[#E0E7FF]" style={{ textShadow: "0 0 40px rgba(0,217,255,0.3)" }}>
                  L&apos;IA n&apos;est plus une option.
                </span>
                <br />
                <span className="bg-gradient-to-r from-[#00D9FF] via-[#FF00FF] to-[#00FF94] bg-clip-text text-transparent" style={{ textShadow: "0 0 60px rgba(0,217,255,0.4)" }}>
                  C&apos;est votre avantage injuste.
                </span>
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={0.25}>
              <p className="text-xl md:text-2xl text-[#A5B4FC] max-w-4xl mx-auto mb-16 leading-[1.65]">
                Ne regardez pas vos concurrents automatiser leur croissance. Déployez une infrastructure d&apos;agents autonomes et de skills IA pour transformer votre entreprise en moteur de vélocité synthétique.
              </p>
            </ScrollReveal>

            {/* CTAs with proper structure */}
            <ScrollReveal delay={0.35}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-20">
                <NeonCTA>
                  Réserver un Audit Stratégique Gratuit
                </NeonCTA>
                <NeonButton size="lg" variant="secondary">
                  <span>Consulter un expert IA</span>
                  <ArrowRight className="w-5 h-5" />
                </NeonButton>
              </div>
            </ScrollReveal>

            {/* Social proof */}
            <ScrollReveal delay={0.5}>
              <div className="pt-16 border-t border-[#00D9FF]/10 flex flex-wrap justify-center gap-16 items-center opacity-30 hover:opacity-60 transition-opacity duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]">
                {["AI-ALLIANCE", "FUTURECORE", "QUANTUM-SYS", "NEXUS-ENT"].map((logo) => (
                  <div key={logo} className="text-xl font-black tracking-[-0.02em] text-[#00D9FF] grayscale" style={{ textShadow: "0 0 20px rgba(0,217,255,0.2)" }}>
                    {logo}
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </header>

      {/* Bento Grid Stats */}
      <section className="py-40 relative">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Large stat card */}
              <ScrollReveal delay={0}>
                <NeonCard className="md:col-span-6 md:row-span-2">
                  <div className="p-12 h-full flex flex-col justify-center">
                    <TrendingUp className="w-12 h-12 text-[#00D9FF] mb-6" style={{ filter: "drop-shadow(0 0 20px rgba(0,217,255,0.6))" }} />
                    <NeonPulse color="cyan">
                      <div className="text-8xl font-black tracking-[-0.05em] bg-gradient-to-r from-[#00D9FF] to-[#00FF94] bg-clip-text text-transparent mb-4">
                        310%
                      </div>
                    </NeonPulse>
                    <div className="text-xs text-[#A5B4FC] uppercase tracking-[0.18em] font-bold mb-3">Gain de productivité</div>
                    <p className="text-[#A5B4FC]/80 text-sm leading-relaxed">Mesuré sur 12 mois auprès de 47 entreprises déployées</p>
                  </div>
                </NeonCard>
              </ScrollReveal>

              {/* Small stat cards */}
              <ScrollReveal delay={0.1}>
                <NeonCard className="md:col-span-6">
                  <div className="p-10 text-center">
                    <div className="text-5xl font-black tracking-[-0.04em] text-[#FF00FF] mb-3" style={{ textShadow: "0 0 30px rgba(255,0,255,0.5)" }}>€500k</div>
                    <div className="text-xs text-[#A5B4FC] uppercase tracking-[0.15em] font-bold">Économie annuelle ops</div>
                  </div>
                </NeonCard>
              </ScrollReveal>

              <ScrollReveal delay={0.15}>
                <NeonCard className="md:col-span-3">
                  <div className="p-10 text-center">
                    <div className="text-5xl font-black tracking-[-0.04em] text-[#00FF94] mb-3" style={{ textShadow: "0 0 30px rgba(0,255,148,0.5)" }}>24/7</div>
                    <div className="text-xs text-[#A5B4FC] uppercase tracking-[0.15em] font-bold">Disponibilité</div>
                  </div>
                </NeonCard>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <NeonCard className="md:col-span-3">
                  <div className="p-10 text-center">
                    <div className="text-5xl font-black tracking-[-0.04em] text-[#00D9FF] mb-3" style={{ textShadow: "0 0 30px rgba(0,217,255,0.5)" }}>0</div>
                    <div className="text-xs text-[#A5B4FC] uppercase tracking-[0.15em] font-bold">Latence RH</div>
                  </div>
                </NeonCard>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-40 bg-[#0A0118]/50 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0A0118] to-transparent opacity-50" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-28 items-center max-w-7xl mx-auto">
            <ScrollReveal>
              <div>
                <span className="text-[#00D9FF] font-black uppercase tracking-[0.16em] text-xs mb-8 block" style={{ textShadow: "0 0 20px rgba(0,217,255,0.6)" }}>
                  Le Risque d&apos;Obsolescence
                </span>
                <h2 className="text-5xl md:text-6xl font-black mb-10 leading-[1.02] tracking-[-0.035em] text-[#E0E7FF]">
                  Pendant que vous recrutez, vos concurrents <span className="text-[#00D9FF]" style={{ textShadow: "0 0 30px rgba(0,217,255,0.5)" }}>déploient</span>.
                </h2>
                <p className="text-xl text-[#A5B4FC] mb-14 leading-[1.7]">
                  Le paradigme du scaling linéaire est mort. Les entreprises qui dominent le marché multiplient par 100 leur capacité d&apos;exécution via des infrastructures autonomes.
                </p>

                <div className="space-y-6">
                  {[
                    { title: "Dette Opérationnelle", desc: "Vos équipes passent 60% de leur temps sur des tâches à faible valeur ajoutée." },
                    { title: "Goulot d'Étranglement Technique", desc: "Votre cycle de développement est freiné par des processus manuels dépassés." },
                    { title: "Scalabilité Capée", desc: "Votre croissance est limitée par le temps humain disponible." }
                  ].map((item, i) => (
                    <ScrollReveal key={i} delay={i * 0.08}>
                      <NeonCard className="group cursor-pointer">
                        <div className="flex gap-6 p-8">
                          <div className="shrink-0 w-14 h-14 rounded-xl shadow-[0_0_0_1px_rgba(255,0,255,0.3),0_0_30px_rgba(255,0,255,0.2),inset_0_1px_1px_rgba(255,0,255,0.1)] flex items-center justify-center text-[#FF00FF] bg-[#FF00FF]/[0.08] group-hover:bg-[#FF00FF]/[0.15] transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]">
                            <Zap className="w-7 h-7" style={{ filter: "drop-shadow(0 0 10px rgba(255,0,255,0.8))" }} />
                          </div>
                          <div>
                            <h4 className="font-black text-[#E0E7FF] mb-3 text-lg tracking-tight">{item.title}</h4>
                            <p className="text-sm text-[#A5B4FC]/80 leading-relaxed">{item.desc}</p>
                          </div>
                        </div>
                      </NeonCard>
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="relative">
                <div className="absolute -inset-8 bg-gradient-to-tr from-[#00D9FF]/10 to-[#FF00FF]/10 rounded-[3rem] blur-[80px]" />
                <NeonCard className="relative">
                  <div className="aspect-square p-16 flex items-center justify-center">
                    <div className="w-full h-full shadow-[0_0_0_1px_rgba(0,217,255,0.2),0_0_40px_rgba(0,217,255,0.15),inset_0_1px_1px_rgba(0,217,255,0.08)] rounded-[2rem] bg-[#0A0118]/50 backdrop-blur-sm p-12 flex flex-col items-center justify-center text-center">
                      <NeonPulse color="cyan" className="mb-10">
                        <div className="w-28 h-28 bg-[#00D9FF]/10 rounded-full flex items-center justify-center">
                          <Zap className="text-[#00D9FF] w-14 h-14" style={{ filter: "drop-shadow(0 0 20px rgba(0,217,255,0.8))" }} />
                        </div>
                      </NeonPulse>
                      <div className="text-8xl font-black text-[#E0E7FF] mb-4 tracking-[-0.05em]" style={{ textShadow: "0 0 40px rgba(0,217,255,0.4)" }}>3.5x</div>
                      <div className="text-[#A5B4FC] font-black uppercase tracking-[0.12em] text-xs mb-12">Vélocité Delivery</div>
                      <div className="grid grid-cols-2 gap-4 w-full">
                        <div className="p-5 bg-[#0A0118]/30 shadow-[0_0_0_1px_rgba(0,217,255,0.2),0_0_20px_rgba(0,217,255,0.1),inset_0_1px_1px_rgba(0,217,255,0.05)] rounded-2xl text-sm font-bold">-80% Support</div>
                        <div className="p-5 bg-[#0A0118]/30 shadow-[0_0_0_1px_rgba(0,255,148,0.2),0_0_20px_rgba(0,255,148,0.1),inset_0_1px_1px_rgba(0,255,148,0.05)] rounded-2xl text-sm font-bold">+200% Output</div>
                      </div>
                    </div>
                  </div>
                </NeonCard>
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
              <div className="inline-block px-6 py-2.5 rounded-full shadow-[0_0_0_1px_rgba(0,217,255,0.3),0_0_30px_rgba(0,217,255,0.15),inset_0_1px_1px_rgba(0,217,255,0.1)] bg-[#0A0118]/40 text-[#00D9FF] text-xs font-black tracking-[0.16em] uppercase mb-10">
                Infrastructure IA
              </div>
              <h2 className="text-5xl md:text-7xl font-black mb-10 leading-[1] tracking-[-0.04em] text-[#E0E7FF]" style={{ textShadow: "0 0 40px rgba(0,217,255,0.2)" }}>
                L&apos;Écosystème du Futur, Aujourd&apos;hui.
              </h2>
              <p className="text-xl text-[#A5B4FC] leading-[1.7]">
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
                ],
                color: "cyan"
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
                ],
                color: "magenta"
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
                ],
                color: "lime"
              }
            ].map((service, i) => (
              <ScrollReveal key={i} delay={i * 0.12}>
                <NeonCard>
                  <div className="p-12">
                    <div className={cn(
                      "w-16 h-16 rounded-2xl flex items-center justify-center mb-10",
                      service.color === "cyan" && "bg-gradient-to-br from-[#00D9FF] to-[#00FF94] shadow-[0_0_40px_rgba(0,217,255,0.4)]",
                      service.color === "magenta" && "bg-gradient-to-br from-[#FF00FF] to-[#00D9FF] shadow-[0_0_40px_rgba(255,0,255,0.4)]",
                      service.color === "lime" && "bg-gradient-to-br from-[#00FF94] to-[#00D9FF] shadow-[0_0_40px_rgba(0,255,148,0.4)]"
                    )}>
                      <service.icon className="text-white w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-black mb-5 tracking-tight text-[#E0E7FF]">{service.title}</h3>
                    <p className="text-[#A5B4FC] mb-10 leading-[1.7]">{service.desc}</p>
                    <ul className="space-y-4">
                      {service.items.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3.5 text-sm text-[#A5B4FC]/90">
                          <CheckCircle2 className="w-5 h-5 text-[#00D9FF] shrink-0 mt-0.5" style={{ filter: "drop-shadow(0 0 8px rgba(0,217,255,0.6))" }} />
                          <span className="leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </NeonCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section id="méthodologie" className="py-40 bg-[#0A0118]/50 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0A0118] to-transparent opacity-50" />
        <div className="container mx-auto px-6 relative z-10">
          <ScrollReveal>
            <div className="text-center max-w-4xl mx-auto mb-28">
              <span className="inline-block px-6 py-2.5 rounded-full shadow-[0_0_0_1px_rgba(255,0,255,0.3),0_0_30px_rgba(255,0,255,0.15),inset_0_1px_1px_rgba(255,0,255,0.1)] bg-[#0A0118]/40 text-[#FF00FF] text-xs font-black tracking-[0.16em] uppercase mb-10">
                Le Processus
              </span>
              <h2 className="text-5xl md:text-7xl font-black mb-10 leading-[1] tracking-[-0.04em] text-[#E0E7FF]" style={{ textShadow: "0 0 40px rgba(255,0,255,0.2)" }}>
                Votre Transformation en 4 Étapes
              </h2>
              <p className="text-xl text-[#A5B4FC] leading-[1.7]">
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
                <NeonCard className="hover:scale-[1.01] transition-transform duration-700">
                  <div className="group flex flex-col md:flex-row gap-10 p-12">
                    <div className="text-7xl font-black text-[#00D9FF]/[0.06] group-hover:text-[#00D9FF]/[0.15] transition-colors duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] shrink-0 leading-none" style={{ textShadow: "0 0 60px rgba(0,217,255,0.2)" }}>
                      {item.step}
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-5 mb-6">
                        <h3 className="text-3xl font-black text-[#E0E7FF] tracking-tight">{item.title}</h3>
                        <span className="px-5 py-2 bg-[#00D9FF]/[0.1] text-[#00D9FF] text-xs font-black uppercase rounded-full shadow-[0_0_0_1px_rgba(0,217,255,0.3),0_0_20px_rgba(0,217,255,0.15),inset_0_1px_1px_rgba(0,217,255,0.1)]">
                          {item.tag}
                        </span>
                      </div>
                      <p className="text-[#A5B4FC] text-lg leading-[1.7]">{item.desc}</p>
                    </div>
                  </div>
                </NeonCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Urgency Section */}
      <section className="py-40">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="relative max-w-6xl mx-auto rounded-[3rem] bg-gradient-to-br from-[#00D9FF]/10 to-[#FF00FF]/10 shadow-[0_0_0_1px_rgba(0,217,255,0.3),0_0_60px_rgba(0,217,255,0.2),0_0_100px_rgba(255,0,255,0.15),inset_0_1px_1px_rgba(0,217,255,0.1)] overflow-hidden p-20 md:p-28">
              <div className="absolute top-0 right-0 p-20 opacity-[0.02] pointer-events-none">
                <Clock className="w-96 h-96 text-[#00D9FF]" />
              </div>

              <div className="max-w-3xl relative z-10">
                <h2 className="text-5xl md:text-7xl font-black text-[#E0E7FF] mb-12 tracking-[-0.04em] leading-[0.98]" style={{ textShadow: "0 0 40px rgba(0,217,255,0.3)" }}>
                  La fenêtre stratégique se referme.
                </h2>
                <div className="space-y-8 text-xl text-[#A5B4FC] mb-16 leading-[1.7]">
                  <p>
                    Dans 24 mois, chaque entreprise de votre secteur possédera une infrastructure IA. À ce stade, ce ne sera plus un avantage, mais un prérequis de survie.
                  </p>
                  <p className="font-black text-[#E0E7FF] text-2xl" style={{ textShadow: "0 0 30px rgba(0,217,255,0.3)" }}>
                    Ceux qui déploient aujourd&apos;hui créent un écart de performance qu&apos;il sera impossible de rattraper demain.
                  </p>
                </div>
                <NeonCTA>
                  Saisir l&apos;avantage maintenant
                </NeonCTA>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-40 bg-[#0A0118]/50 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0A0118] to-transparent opacity-50" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-24">
                <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-[-0.04em] text-[#E0E7FF]" style={{ textShadow: "0 0 40px rgba(0,217,255,0.2)" }}>
                  Questions Fréquentes
                </h2>
                <p className="text-xl text-[#A5B4FC] leading-[1.7]">Tout ce que vous devez savoir avant d&apos;engager votre transition.</p>
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
      <section className="py-40 shadow-[0_-1px_0_0_rgba(0,217,255,0.1)] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-[#00D9FF]/[0.03] to-transparent backdrop-blur-3xl" />
        <div className="container mx-auto px-6 text-center relative z-10">
          <ScrollReveal>
            <div className="max-w-5xl mx-auto">
              <h2 className="text-6xl md:text-8xl font-black text-[#E0E7FF] mb-12 tracking-[-0.05em] leading-[0.93]" style={{ textShadow: "0 0 60px rgba(0,217,255,0.3)" }}>
                Rejoignez le top 1% des entreprises AI-First.
              </h2>
              <p className="text-2xl text-[#A5B4FC] mb-20 max-w-3xl mx-auto leading-[1.7]">
                Transformez votre structure organisationnelle avant que le marché ne vous y oblige.
              </p>

              {/* Neon CTA Box */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="inline-block p-2.5 rounded-[3rem] bg-gradient-to-r from-[#00D9FF] via-[#FF00FF] to-[#00FF94] shadow-[0_0_60px_rgba(0,217,255,0.4),0_0_100px_rgba(255,0,255,0.3)]"
              >
                <div className="bg-[#0A0118] rounded-[calc(3rem-0.625rem)] p-8 flex flex-col md:flex-row items-center gap-10 md:gap-20 px-16 py-12">
                  <div className="text-left">
                    <div className="text-[#E0E7FF] font-black text-3xl mb-3 tracking-tight" style={{ textShadow: "0 0 30px rgba(0,217,255,0.3)" }}>
                      Audit Stratégique Offert
                    </div>
                    <div className="text-[#A5B4FC] text-sm font-semibold">Valeur de la session : 1 250 € — Places limitées.</div>
                  </div>
                  <button className="px-14 py-6 bg-gradient-to-r from-[#00D9FF] to-[#00FF94] text-[#0A0118] font-black uppercase text-sm tracking-[0.12em] rounded-full shadow-[0_0_40px_rgba(0,217,255,0.5),inset_0_2px_2px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_rgba(0,217,255,0.7)] transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-105">
                    Réserver mon appel stratégique
                  </button>
                </div>
              </motion.div>

              <div className="mt-20 flex flex-wrap items-center justify-center gap-x-14 gap-y-5 text-[#A5B4FC] text-sm font-semibold">
                <span className="flex items-center gap-2.5"><ShieldCheck className="w-4 h-4 text-[#00D9FF]" /> Sans engagement</span>
                <span className="flex items-center gap-2.5"><Users className="w-4 h-4 text-[#00D9FF]" /> Consulting de haut niveau</span>
                <span className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-[#00D9FF]" /> Plan d&apos;action concret</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-[#00D9FF]/10 bg-[#0A0118]">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-10">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 bg-gradient-to-br from-[#00D9FF] to-[#00FF94] rounded-xl flex items-center justify-center shadow-[0_0_30px_rgba(0,217,255,0.4)]">
                <Cpu className="text-white w-6 h-6" />
              </div>
              <span className="text-2xl font-black tracking-[-0.03em] text-[#E0E7FF]">
                Synthétique<span className="text-[#00FF94]">.</span>
              </span>
            </div>

            <div className="flex gap-12 text-sm text-[#A5B4FC] font-semibold">
              <a href="#" className="hover:text-[#00D9FF] transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]">Mentions Légales</a>
              <a href="#" className="hover:text-[#00D9FF] transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]">Confidentialité</a>
              <a href="#" className="hover:text-[#00D9FF] transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]">Contact</a>
            </div>

            <div className="text-sm text-[#A5B4FC]/60 font-medium">
              © 2024 Synthétique AI Infrastructure. Tous droits réservés.
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

// Accordion Item Component with neon
const AccordionItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <NeonCard className="cursor-pointer">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-10 flex items-center justify-between text-left focus:outline-none hover:bg-[#0A0118]/20 transition-colors duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]"
      >
        <span className="text-lg font-black text-[#E0E7FF] pr-6 tracking-tight">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
        >
          {isOpen ? (
            <Minus className="text-[#00D9FF] w-5 h-5 flex-shrink-0" style={{ filter: "drop-shadow(0 0 8px rgba(0,217,255,0.8))" }} />
          ) : (
            <Plus className="text-[#00D9FF] w-5 h-5 flex-shrink-0" style={{ filter: "drop-shadow(0 0 8px rgba(0,217,255,0.8))" }} />
          )}
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
            className="overflow-hidden"
          >
            <div className="px-10 pb-10 text-[#A5B4FC] leading-[1.7] border-t border-[#00D9FF]/10 pt-8">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </NeonCard>
  );
};
