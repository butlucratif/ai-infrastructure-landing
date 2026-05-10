"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useInView } from "framer-motion";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Sparkles,
  Zap,
  Shield,
  BarChart3,
  Users,
  Clock,
  TrendingUp,
  Cpu,
  GitBranch,
  Database,
  AlertCircle,
  Award,
  Lock
} from "lucide-react";
import { cn } from "@/lib/utils";

// ==================== COMPONENTS ====================

// Fade-in with advanced animations
const FadeIn = ({ children, delay = 0, direction = "up" }: { children: React.ReactNode, delay?: number, direction?: "up" | "down" | "left" | "right" }) => {
  const directions = {
    up: { y: 40 },
    down: { y: -40 },
    left: { x: 40 },
    right: { x: -40 }
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...directions[direction] }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {children}
    </motion.div>
  );
};

// Background decoration with RED theme
const BackgroundDecoration = () => {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const opacity1 = useTransform(scrollYProgress, [0, 500], [0.4, 0.1]);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* RED Gradient orbs with parallax */}
      <motion.div
        style={{ y: y1, opacity: opacity1 }}
        className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-gradient-to-br from-red-200/40 via-rose-200/30 to-transparent rounded-full blur-3xl"
      />
      <motion.div
        style={{ y: y2 }}
        className="absolute top-1/3 -left-40 w-[600px] h-[600px] bg-gradient-to-tr from-red-100/30 via-rose-100/20 to-transparent rounded-full blur-3xl"
      />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-tl from-red-200/20 to-transparent rounded-full blur-3xl" />
    </div>
  );
};

// Animated counter
const CountUp = ({ end, duration = 2, suffix = "" }: { end: number; duration?: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const nodeRef = useRef<HTMLDivElement>(null);
  const inView = useInView(nodeRef, { once: true });

  useEffect(() => {
    if (!inView) return;

    let startTime: number;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = (timestamp - startTime) / (duration * 1000);

      if (progress < 1) {
        setCount(Math.floor(end * progress));
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(animate);
  }, [inView, end, duration]);

  return <div ref={nodeRef}>{count}{suffix}</div>;
};

// Ripple button effect
const RippleButton = ({ children, className, ...props }: any) => {
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setRipples([...ripples, { x, y, id: Date.now() }]);

    setTimeout(() => {
      setRipples((prev) => prev.slice(1));
    }, 600);

    props.onClick?.(e);
  };

  return (
    <motion.button
      {...props}
      onClick={handleClick}
      className={cn("relative overflow-hidden", className)}
    >
      {children}

      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 4, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{
              position: "absolute",
              left: ripple.x,
              top: ripple.y,
              width: 50,
              height: 50,
              borderRadius: "50%",
              background: "rgba(255, 255, 255, 0.6)",
              transform: "translate(-50%, -50%)",
              pointerEvents: "none"
            }}
          />
        ))}
      </AnimatePresence>
    </motion.button>
  );
};

// ==================== MAIN COMPONENT ====================

export default function AIInfrastructureLanding() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showStickyCTA, setShowStickyCTA] = useState(false);
  const [employees, setEmployees] = useState(50);
  const savings = Math.round(employees * 9000); // €9k per employee/year
  const hoursPerMonth = employees * 40;
  const { scrollYProgress } = useScroll();

  // Sticky CTA on scroll
  useEffect(() => {
    const handleScroll = () => {
      setShowStickyCTA(window.scrollY > 800);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="bg-white text-slate-900 antialiased relative overflow-hidden">
      <BackgroundDecoration />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/70 backdrop-blur-xl border-b border-slate-200/60 z-50">
        <div className="container mx-auto px-6 lg:px-8 py-5">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2.5"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-red-700 rounded-xl blur-sm opacity-40" />
                <div className="relative w-9 h-9 bg-gradient-to-br from-red-600 to-red-700 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
              </div>
              <span className="text-xl font-bold tracking-tight">
                Synthétique
              </span>
            </motion.div>

            <div className="hidden md:flex items-center gap-10">
              {["Solution", "Cas clients", "Ressources"].map((item, i) => (
                <motion.a
                  key={item}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  href={`#${item.toLowerCase().replace(" ", "-")}`}
                  className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors relative group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-red-600 to-red-700 group-hover:w-full transition-all duration-300" />
                </motion.a>
              ))}
            </div>

            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 rounded-full transition-all shadow-lg shadow-red-500/25"
            >
              Audit gratuit → 3 places/mois
            </motion.button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Content */}
            <div className="space-y-10">
              <FadeIn delay={0.2}>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-50 to-rose-50 border border-red-100 rounded-full mb-4">
                  <div className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600" />
                  </div>
                  <span className="text-sm font-medium bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent">
                    Déjà 50+ entreprises françaises automatisées • +€2.1M économisés
                  </span>
                </div>
              </FadeIn>

              {/* URGENCY Badge */}
              <FadeIn delay={0.25}>
                <motion.div
                  animate={{
                    boxShadow: [
                      "0 0 0 0 rgba(225, 29, 72, 0)",
                      "0 0 0 8px rgba(225, 29, 72, 0.1)",
                      "0 0 0 0 rgba(225, 29, 72, 0)"
                    ]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "loop"
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-200 rounded-full"
                >
                  <Clock className="w-4 h-4 text-amber-600" />
                  <span className="text-sm font-medium text-amber-900">
                    Seulement 3 audits disponibles ce mois-ci
                  </span>
                </motion.div>
              </FadeIn>

              <FadeIn delay={0.3}>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight">
                  {["Économisez ", <span key="40h" className="text-red-600">40h/semaine</span>, " par employé avec des agents IA"].map((word, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      transition={{
                        delay: 0.3 + i * 0.1,
                        duration: 0.8,
                        ease: [0.21, 0.47, 0.32, 0.98]
                      }}
                    >
                      {word}
                    </motion.span>
                  ))}
                </h1>
              </FadeIn>

              <FadeIn delay={0.5}>
                <p className="text-xl text-slate-600 leading-relaxed max-w-xl">
                  Réduisez vos coûts opérationnels de <em className="font-bold not-italic text-red-600">63% en moyenne</em>.
                  Déploiement en <em className="font-bold not-italic">4 semaines</em>.
                  Sans remplacer vos outils actuels. <em className="font-bold not-italic">Garantie ROI sous 12 mois</em>.
                </p>
              </FadeIn>

              <FadeIn delay={0.6}>
                <div className="flex flex-wrap items-center gap-4">
                  <RippleButton
                    whileHover={{ scale: 1.05, y: -4, rotateX: 5 }}
                    whileTap={{ scale: 0.95 }}
                    className="group px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold rounded-full transition-all shadow-xl shadow-red-500/30 hover:shadow-2xl hover:shadow-red-500/40 flex items-center gap-2"
                  >
                    Audit gratuit (valeur €2,500) → 3 places restantes
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </RippleButton>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-8 py-4 bg-slate-100 hover:bg-slate-200 text-slate-900 font-semibold rounded-full transition-all"
                  >
                    Voir un cas client → 4min
                  </motion.button>
                </div>
              </FadeIn>

              {/* Social proof */}
              <FadeIn delay={0.7}>
                <div className="space-y-4 pt-4">
                  <div className="flex items-center gap-8">
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      className="flex -space-x-2"
                    >
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 border-2 border-white" />
                      ))}
                    </motion.div>
                    <span className="text-sm text-slate-600">
                      <span className="font-bold text-slate-900">50+ entreprises françaises</span> • +€2.1M économisés • 8,420h/mois automatisées
                    </span>
                  </div>

                  {/* Live stats */}
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-sm text-slate-600">
                        <span className="font-bold text-slate-900">142 agents</span> actifs maintenant
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-slate-600">
                        <span className="font-bold text-slate-900">12.4k tâches</span> automatisées aujourd&apos;hui
                      </span>
                    </div>
                  </div>

                  {/* Recent booking notification */}
                  <motion.div
                    initial={{ x: -400, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 1, duration: 0.5 }}
                    className="p-4 bg-white rounded-xl shadow-lg border border-slate-200 max-w-sm"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
                        <Check className="w-5 h-5 text-white" />
                      </div>
                      <div className="text-sm">
                        <div className="font-semibold">TechFlow SAS</div>
                        <div className="text-slate-600">vient de réserver un audit • Il y a 2h</div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </FadeIn>
            </div>

            {/* Right: Dashboard preview */}
            <FadeIn delay={0.4} direction="right">
              <div className="relative">
                {/* Background glow */}
                <div className="absolute inset-0 bg-gradient-to-tr from-red-200/50 via-rose-200/30 to-red-100/50 rounded-3xl blur-3xl" />

                {/* Main card with tilt effect */}
                <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl border border-slate-200/60 p-8 shadow-2xl">
                  <div className="space-y-6">
                    {/* Metrics */}
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { label: "Productivité", value: "+310", icon: TrendingUp },
                        { label: "Économies", value: "€450k", icon: BarChart3 },
                      ].map((metric, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.6 + i * 0.1 }}
                          whileHover={{ scale: 1.05, y: -4 }}
                          className="p-5 bg-gradient-to-br from-slate-50 to-white rounded-2xl border border-slate-200/60 hover:border-red-200 transition-all"
                        >
                          <metric.icon className="w-5 h-5 text-red-600 mb-3" />
                          <div className="text-3xl font-bold text-slate-900 mb-1">
                            <CountUp end={metric.value.includes('€') ? 450 : 310} suffix={metric.value.includes('€') ? 'k' : '%'} />
                          </div>
                          <div className="text-xs text-slate-600 font-medium">{metric.label}</div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Status items */}
                    <div className="space-y-3">
                      {[
                        { label: "Agents déployés", status: "Actif", count: "184" },
                        { label: "Tâches automatisées", status: "En cours", count: "2.4k" },
                      ].map((item, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.8 + i * 0.1 }}
                          className="flex items-center justify-between p-4 bg-gradient-to-r from-red-50/50 to-rose-50/50 rounded-xl border border-red-100/60"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                            <div>
                              <div className="text-sm font-semibold text-slate-900">{item.label}</div>
                              <div className="text-xs text-slate-600">{item.status}</div>
                            </div>
                          </div>
                          <div className="text-2xl font-bold text-red-600">{item.count}</div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Trust badges bar */}
      <section className="py-8 px-6 bg-white border-y border-slate-200">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-wrap items-center justify-center gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2"
            >
              <Shield className="w-5 h-5 text-green-600" />
              <span className="text-sm font-semibold">SOC 2 Type II</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex items-center gap-2"
            >
              <Check className="w-5 h-5 text-green-600" />
              <span className="text-sm font-semibold">RGPD Conforme</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-2"
            >
              <Lock className="w-5 h-5 text-green-600" />
              <span className="text-sm font-semibold">ISO 27001</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-2"
            >
              <Clock className="w-5 h-5 text-red-600" />
              <span className="text-sm font-semibold">Support 24/7</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex items-center gap-2"
            >
              <Award className="w-5 h-5 text-amber-600" />
              <span className="text-sm font-semibold">Hébergement France</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Social Proof - IMPROVED */}
      <section className="py-16 px-6 lg:px-8 border-b border-slate-200 bg-slate-50/50">
        <div className="container mx-auto max-w-7xl">
          <FadeIn>
            <p className="text-center text-sm text-slate-500 font-medium mb-12 tracking-wide uppercase">
              Ils économisent déjà 40h+/semaine avec Synthétique
            </p>
            <div className="flex flex-wrap items-center justify-center gap-16 opacity-100">
              {["TechFlow", "DataCorp", "CloudBase", "SystemAI", "InnovLab"].map((company, i) => (
                <motion.div
                  key={company}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.1, opacity: 1 }}
                  className="text-2xl font-bold tracking-tight text-slate-400 hover:text-slate-900 transition-colors cursor-pointer"
                >
                  {company}
                </motion.div>
              ))}
            </div>

            {/* Stats clients */}
            <div className="grid md:grid-cols-3 gap-6 mt-12 max-w-3xl mx-auto">
              {[
                { value: "50+", label: "Entreprises accompagnées" },
                { value: "€24M", label: "Économisés pour nos clients" },
                { value: "98%", label: "Taux de satisfaction" }
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl font-bold text-red-600">
                    <CountUp end={stat.value.includes('+') ? 50 : stat.value.includes('M') ? 24 : 98} suffix={stat.value.includes('+') ? '+' : stat.value.includes('M') ? 'M' : '%'} />
                  </div>
                  <div className="text-sm text-slate-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA after social proof */}
      <section className="py-12 px-6 lg:px-8 bg-gradient-to-b from-slate-50/50 to-white">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.button
            whileHover={{ scale: 1.02 }}
            className="px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-full shadow-xl inline-flex items-center gap-2"
          >
            Rejoindre les leaders qui automatisent
            <ArrowRight className="w-5 h-5" />
          </motion.button>
          <p className="text-sm text-slate-500 mt-3">Audit stratégique gratuit • Sans engagement</p>
        </div>
      </section>

      {/* Bento Grid - Features */}
      <section id="solution" className="py-32 px-6 lg:px-8 relative">
        <div className="container mx-auto max-w-7xl">
          <FadeIn>
            <div className="text-center mb-20 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Arrêtez de perdre <em className="not-italic font-light italic text-red-600">40% du temps</em> de vos équipes
              </h2>
              <p className="text-xl text-slate-600">
                Nos agents IA automatisent ce qui vous ralentit. Vous vous concentrez sur ce qui compte.
              </p>
            </div>
          </FadeIn>

          {/* Bento Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Large feature */}
            <FadeIn delay={0.1}>
              <motion.div
                whileHover={{ scale: 1.02, y: -4 }}
                className="lg:col-span-2 lg:row-span-2 group p-10 bg-gradient-to-br from-white to-red-50/30 rounded-3xl border border-slate-200/60 hover:border-red-200 hover:shadow-2xl hover:shadow-red-500/10 transition-all duration-500"
              >
                <div className="h-full flex flex-col justify-between">
                  <div>
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                      className="w-14 h-14 bg-gradient-to-br from-red-500 to-red-700 rounded-2xl flex items-center justify-center mb-6"
                    >
                      <Cpu className="w-7 h-7 text-white" />
                    </motion.div>
                    <h3 className="text-3xl font-bold mb-4">
                      Automatisation sans code → En production en <em className="not-italic font-light italic text-red-600">3 semaines</em>
                    </h3>
                    <p className="text-lg text-slate-600 leading-relaxed mb-4">
                      Vos équipes perdent <em className="font-bold not-italic text-red-600">67%</em> de leur temps sur des tâches répétitives.
                    </p>
                    <p className="text-lg text-slate-600 leading-relaxed">
                      Nos agents IA analysent vos workflows, détectent les processus automatisables
                      et déploient des automatisations en <em className="font-bold not-italic">72h</em>. Zéro code requis. Zéro migration.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-red-600 font-semibold mt-8 group-hover:gap-4 transition-all">
                    En savoir plus
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </motion.div>
            </FadeIn>

            {/* Small features */}
            {[
              {
                icon: Shield,
                title: "Sécurité garantie SOC2 + RGPD",
                desc: "Conformité bancaire • Hébergement France • Chiffrement AES-256 • Zéro accès tiers"
              },
              {
                icon: GitBranch,
                title: "S'intègre à votre stack existant",
                desc: "+200 connecteurs natifs • Salesforce, HubSpot, SAP, etc. • APIs sécurisées"
              },
              {
                icon: Database,
                title: "Vos données ne quittent jamais votre infrastructure",
                desc: "Hébergement souverain français • Isolation complète • Audité par l'ANSSI"
              },
              {
                icon: Zap,
                title: "Production en 4 semaines maximum",
                desc: "POC fonctionnel en 7 jours • Formation incluse • Support dédié 24/7"
              }
            ].map((feature, i) => (
              <FadeIn key={i} delay={0.2 + i * 0.1}>
                <motion.div
                  whileHover={{ scale: 1.05, y: -4 }}
                  className="group p-8 bg-white rounded-3xl border border-slate-200/60 hover:border-red-200 hover:shadow-xl hover:shadow-red-500/10 transition-all duration-500"
                >
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className="w-12 h-12 bg-gradient-to-br from-red-100 to-rose-100 rounded-xl flex items-center justify-center mb-5"
                  >
                    <feature.icon className="w-6 h-6 text-red-600" />
                  </motion.div>
                  <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{feature.desc}</p>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-32 px-6 lg:px-8 bg-gradient-to-b from-slate-50/50 to-white relative">
        <div className="container mx-auto max-w-6xl">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ces entreprises économisent déjà <em className="not-italic font-light italic text-red-600">+€450k/an</em>
              </h2>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { value: "€450k", label: "Économies moyennes annuelles", sublabel: "Constaté sur 12 mois" },
              { value: "10 mois", label: "Retour sur investissement garanti", sublabel: "Ou remboursé à 100%" },
              { value: "47h/sem", label: "Temps libéré par employé", sublabel: "Réaffecté sur des tâches à valeur" }
            ].map((stat, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  whileHover={{ scale: 1.05, y: -4 }}
                  className="text-center p-10 rounded-3xl bg-white border border-slate-200/60 hover:border-red-200 hover:shadow-xl transition-all duration-500"
                >
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="text-6xl font-bold bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent mb-4"
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-lg font-semibold text-slate-900 mb-2">{stat.label}</div>
                  <div className="text-sm text-slate-500">{stat.sublabel}</div>
                </motion.div>
              </FadeIn>
            ))}
          </div>

          {/* CTA after stats */}
          <div className="text-center mt-12">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="px-10 py-5 bg-gradient-to-r from-red-600 to-red-700 text-white font-bold rounded-full shadow-xl inline-flex items-center gap-2"
            >
              Découvrir mon potentiel d&apos;économies
              <ArrowRight className="w-5 h-5" />
            </motion.button>
            <p className="text-sm text-slate-500 mt-4 flex items-center justify-center gap-4">
              <span className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-600" /> Audit personnalisé
              </span>
              <span className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-600" /> Résultats sous 48h
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* ROI Calculator */}
      <section className="py-32 px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          <FadeIn>
            <div className="p-12 bg-gradient-to-br from-white to-red-50 rounded-3xl border border-slate-200 shadow-xl">
              <h2 className="text-3xl font-bold text-center mb-8">
                Calculez votre ROI potentiel
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">Nombre d&apos;employés</label>
                  <input
                    type="range"
                    min="10"
                    max="500"
                    value={employees}
                    onChange={(e) => setEmployees(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-red-600"
                  />
                  <div className="text-center text-2xl font-bold text-red-600 mt-2">
                    {employees} employés
                  </div>
                </div>

                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="p-6 bg-white rounded-2xl border border-red-100"
                >
                  <div className="text-center">
                    <div className="text-sm text-slate-600 mb-2">Économies annuelles estimées</div>
                    <div className="text-5xl font-bold text-red-600 mb-2">
                      {savings.toLocaleString()}€
                    </div>
                    <div className="text-sm text-slate-600">Soit {hoursPerMonth}h/mois économisées</div>
                  </div>
                </motion.div>

                <button className="w-full px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white font-bold rounded-full hover:from-red-700 hover:to-red-800 transition-all shadow-lg">
                  Obtenir mon audit personnalisé
                </button>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-32 px-6 lg:px-8 bg-slate-50/50">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Ils ont transformé leurs opérations</h2>
            <p className="text-xl text-slate-600">Des résultats concrets, mesurables</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "Nous avons réduit de 67% nos coûts opérationnels en 8 mois. Le ROI a dépassé nos prévisions.",
                author: "Sophie Martin",
                role: "COO",
                company: "TechScale",
                metric: "67% coûts réduits"
              },
              {
                quote: "L'automatisation a libéré 120h/mois pour nos équipes. Elles se concentrent sur la stratégie.",
                author: "Marc Dupont",
                role: "CTO",
                company: "DataFlow Pro",
                metric: "120h/mois économisées"
              },
              {
                quote: "Déploiement en 5 semaines. Support exceptionnel. La plateforme s'adapte parfaitement à nos besoins.",
                author: "Claire Bernard",
                role: "VP Operations",
                company: "CloudFirst",
                metric: "5 semaines déploiement"
              }
            ].map((testimonial, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <motion.div
                  whileHover={{ scale: 1.05, y: -4 }}
                  className="p-8 bg-white rounded-3xl border border-slate-200 hover:shadow-xl hover:border-red-200 transition-all"
                >
                  <div className="mb-6">
                    <div className="w-24 h-8 bg-slate-100 rounded mb-4 flex items-center justify-center text-xs font-bold text-slate-400">
                      LOGO
                    </div>
                    <p className="text-slate-600 italic leading-relaxed">&quot;{testimonial.quote}&quot;</p>
                  </div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-red-200 to-rose-200 rounded-full" />
                    <div>
                      <div className="font-bold">{testimonial.author}</div>
                      <div className="text-sm text-slate-600">{testimonial.role}, {testimonial.company}</div>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-slate-100">
                    <div className="text-2xl font-bold text-red-600">{testimonial.metric}</div>
                  </div>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="cas-clients" className="py-32 px-6 lg:px-8 relative">
        <div className="container mx-auto max-w-5xl">
          <FadeIn>
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                De zéro à <em className="not-italic font-light italic text-red-600">+40h/semaine</em> économisées en 4 semaines
              </h2>
              <p className="text-xl text-slate-600">
                Déploiement progressif sans interrompre vos opérations
              </p>
            </div>
          </FadeIn>

          {/* Vertical line */}
          <div className="relative">
            <motion.div
              initial={{ height: 0 }}
              whileInView={{ height: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute left-7 top-0 w-0.5 bg-gradient-to-b from-red-600 to-red-300"
            />

            <div className="space-y-6">
              {[
                {
                  phase: "Phase 1",
                  title: "Audit gratuit des processus automatisables",
                  duration: "48h",
                  description: "Nos experts analysent vos workflows et identifient les 5-7 automatisations à ROI immédiat (€150k+ d'économies potentielles). Rapport détaillé remis sous 48h."
                },
                {
                  phase: "Phase 2",
                  title: "POC fonctionnel sur 1 processus critique",
                  duration: "1 semaine",
                  description: "Nous déployons un premier agent IA sur votre processus le plus chronophage. Vous voyez les résultats avant de vous engager."
                },
                {
                  phase: "Phase 3",
                  title: "Déploiement complet et formation équipes",
                  duration: "3 semaines",
                  description: "Mise en production de tous les agents, intégration avec vos outils, formation de vos équipes. Zéro interruption de service."
                },
                {
                  phase: "Phase 4",
                  title: "Support dédié + optimisation IA continue",
                  duration: "Inclus à vie",
                  description: "CSM dédié • Support 24/7 • Amélioration continue des modèles • Nouvelles automatisations incluses"
                }
              ].map((step, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.2 }}
                    whileHover={{ scale: 1.02, x: 10 }}
                    className="group relative p-8 rounded-3xl bg-white border border-slate-200/60 hover:border-red-200 hover:shadow-xl hover:shadow-red-500/10 transition-all duration-500"
                  >
                    <div className="flex items-start gap-6">
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        transition={{ duration: 0.6 }}
                        className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-red-600 to-red-700 rounded-2xl flex items-center justify-center text-white font-bold text-lg"
                      >
                        0{i + 1}
                      </motion.div>
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-3">
                          <h3 className="text-2xl font-bold">{step.title}</h3>
                          <span className="px-3 py-1 bg-red-50 text-red-700 text-xs font-semibold rounded-full">
                            {step.duration}
                          </span>
                        </div>
                        <p className="text-slate-600 leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  </motion.div>
                </FadeIn>
              ))}
            </div>
          </div>

          {/* CTA after process */}
          <div className="mt-12 p-8 bg-gradient-to-r from-red-50 to-rose-50 rounded-3xl border border-red-100">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-3">Commençons par la Phase 1</h3>
              <p className="text-slate-600 mb-6">Votre audit stratégique gratuit en 48h</p>
              <button className="px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-full hover:from-red-700 hover:to-red-800 transition-all shadow-lg">
                Lancer mon audit
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="ressources" className="py-32 px-6 lg:px-8 bg-gradient-to-b from-slate-50/50 to-white">
        <div className="container mx-auto max-w-3xl">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Vos <em className="not-italic font-light italic text-red-600">dernières questions</em> avant de nous rejoindre
              </h2>
            </div>
          </FadeIn>

          <div className="space-y-4">
            {[
              {
                q: "Je n'ai pas le temps de gérer un projet d'automatisation de 6 mois. Est-ce vraiment rapide ?",
                a: "Premier agent en production en 7 jours. Déploiement complet en 4 semaines maximum. Nous gérons tout : audit, déploiement, formation. Votre équipe investit seulement 3h/semaine pendant le projet. Le ROI commence dès la semaine 2."
              },
              {
                q: "Nos données sont ultra-sensibles (banque/santé). Pouvez-vous vraiment garantir la sécurité ?",
                a: "Hébergement souverain en France (OVH/Scaleway) • Conformité SOC2 Type II + RGPD + HDS (santé) • Isolation complète de votre infrastructure • Audité par l'ANSSI • Chiffrement AES-256 • Zéro accès tiers, même de notre côté. Vos données ne quittent JAMAIS votre environnement."
              },
              {
                q: "On utilise déjà Salesforce, HubSpot, SAP... Faut-il tout remplacer ?",
                a: "Zéro remplacement. Synthétique s'intègre nativement à +200 outils via APIs sécurisées. Nous nous adaptons à VOTRE stack, pas l'inverse. Installation sans interruption de service. La plupart de nos clients gardent 100% de leurs outils actuels."
              },
              {
                q: "Si ça ne fonctionne pas, je perds mon investissement ?",
                a: "Garantie ROI : Si vous n'économisez pas au minimum €150k sur 12 mois, nous vous remboursons 100% de votre investissement. De plus, POC gratuit en semaine 1 : vous voyez les résultats AVANT de vous engager. Aucun risque."
              },
              {
                q: "Combien ça coûte vraiment ? (avec tous les frais cachés)",
                a: "Investissement initial : €15k-€45k selon la complexité. Abonnement mensuel : €2.5k-€8k (support + hébergement + optimisation continue). ROI moyen : 10 mois. Économies annuelles moyennes : €450k. Zéro frais caché, zéro surprise. Devis détaillé en 48h après l'audit gratuit."
              }
            ].map((faq, i) => (
              <FadeIn key={i} delay={i * 0.05}>
                <div className="border border-slate-200/60 rounded-2xl bg-white overflow-hidden hover:border-red-200 hover:shadow-lg transition-all duration-300">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-slate-50/50 transition-colors"
                  >
                    <span className="font-semibold text-slate-900 text-lg pr-4">{faq.q}</span>
                    <ChevronDown
                      className={cn(
                        "w-5 h-5 text-slate-400 transition-transform duration-300",
                        openFaq === i && "rotate-180"
                      )}
                    />
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          height: { type: "spring", stiffness: 300, damping: 30 },
                          opacity: { duration: 0.2, delay: 0.1 }
                        }}
                        className="overflow-hidden"
                      >
                        <div className="px-8 pb-6 text-slate-600 leading-relaxed border-t border-slate-100 pt-6">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 lg:px-8 relative">
        <div className="container mx-auto max-w-5xl">
          <FadeIn>
            <div className="relative p-16 rounded-[3rem] bg-gradient-to-br from-red-600 via-red-700 to-red-800 overflow-hidden">
              {/* Animated background pattern */}
              <motion.div
                animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
                transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                  backgroundSize: '32px 32px'
                }}
              />

              <div className="relative text-center space-y-8">
                <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                  Votre équipe perd 40h/semaine sur des tâches répétitives.
                  <br />
                  Ça vous coûte <em className="not-italic font-light italic">€350k/an minimum</em>.
                </h2>
                <p className="text-xl text-red-100 max-w-2xl mx-auto">
                  Identifiez vos 5-7 processus automatisables en 48h avec notre audit gratuit (valeur €2,500)
                  <br />
                  → Rapport détaillé avec ROI projeté et économies potentielles
                  <br />
                  → Plan d&apos;automatisation personnalisé sans engagement
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                  <motion.button
                    animate={{
                      boxShadow: [
                        "0 0 0 0 rgba(255, 255, 255, 0.7)",
                        "0 0 0 10px rgba(255, 255, 255, 0)",
                        "0 0 0 0 rgba(255, 255, 255, 0)"
                      ]
                    }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
                    whileHover={{ scale: 1.05, y: -4 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-10 py-5 bg-white text-red-600 hover:bg-red-50 font-bold rounded-full transition-all shadow-2xl shadow-red-900/30 flex items-center gap-2"
                  >
                    Réserver l&apos;audit gratuit → 3 places restantes en mai
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </div>
                <div className="text-sm text-red-100 space-y-2 pt-4">
                  <div className="flex items-center justify-center gap-2">
                    <Check className="w-4 h-4" />
                    <span>Audit 100% gratuit (même si vous ne continuez pas)</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Check className="w-4 h-4" />
                    <span>Résultats sous 48h • Aucun engagement</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Check className="w-4 h-4" />
                    <span>Seulement 3 entreprises auditées par mois (nous refusons 40% des demandes)</span>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 lg:px-8 border-t border-slate-200/60 bg-slate-50/50">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-8">
            <p className="text-slate-600 mb-2">Une dernière question ?</p>
            <a href="mailto:contact@synthetique.ai" className="text-red-600 font-semibold hover:text-red-700">
              contact@synthetique.ai
            </a>
            <span className="text-slate-600 mx-2">•</span>
            <a href="tel:+33100000000" className="text-red-600 font-semibold hover:text-red-700">
              +33 1 XX XX XX XX
            </a>
            <p className="text-sm text-slate-500 mt-2">Réponse garantie sous 2h (jours ouvrés)</p>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-8 border-t border-slate-200">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-red-700 rounded-xl blur-sm opacity-40" />
                <div className="relative w-9 h-9 bg-gradient-to-br from-red-600 to-red-700 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
              </div>
              <span className="text-xl font-bold tracking-tight">Synthétique</span>
            </div>

            <div className="flex gap-10 text-sm font-medium text-slate-600">
              <a href="#" className="hover:text-slate-900 transition-colors">Mentions légales</a>
              <a href="#" className="hover:text-slate-900 transition-colors">Confidentialité</a>
              <a href="#" className="hover:text-slate-900 transition-colors">Contact</a>
            </div>

            <p className="text-sm text-slate-500">
              © 2024 Synthétique. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>

      {/* Sticky CTA Bar */}
      <AnimatePresence>
        {showStickyCTA && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-slate-200 shadow-2xl z-40 py-4 px-6"
          >
            <div className="container mx-auto flex items-center justify-between">
              <div>
                <p className="font-bold text-lg">Encore 3 audits gratuits disponibles en mai</p>
                <p className="text-sm text-slate-600">Valeur €2,500 • Résultats sous 48h</p>
              </div>
              <button className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-full hover:from-red-700 hover:to-red-800 transition-all shadow-lg">
                Réserver maintenant
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-slate-100 z-50">
        <motion.div
          className="h-full bg-gradient-to-r from-red-600 to-red-700"
          style={{
            scaleX: scrollYProgress,
            transformOrigin: "0%"
          }}
        />
      </div>
    </main>
  );
}
