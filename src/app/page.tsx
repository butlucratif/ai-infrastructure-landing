"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
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
  Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";

// Noise texture for premium feel
const NoiseTexture = () => (
  <div
    className="pointer-events-none fixed inset-0 opacity-[0.02] z-[100] mix-blend-overlay"
    style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
    }}
  />
);

// Components with premium shadow-as-border technique
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
      scrolled
        ? "bg-black/70 backdrop-blur-xl shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_2px_8px_rgba(0,0,0,0.4)] py-4"
        : "bg-transparent py-7"
    )}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        <motion.div
          className="flex items-center gap-3 cursor-pointer group"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="w-11 h-11 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-[0_8px_24px_rgba(79,70,229,0.3)] group-hover:shadow-[0_8px_32px_rgba(79,70,229,0.5)] transition-all">
            <Cpu className="text-white w-6 h-6" />
          </div>
          <span className="text-2xl font-black tracking-[-0.03em] text-white">
            Synthétique<span className="text-blue-500">.</span>
          </span>
        </motion.div>

        <div className="hidden md:flex items-center gap-10">
          {["Solution", "Méthodologie", "FAQ"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm font-semibold text-gray-400 hover:text-white transition-colors duration-300"
            >
              {item}
            </a>
          ))}
        </div>

        <button className="px-6 py-3 rounded-full bg-white/[0.03] backdrop-blur-sm text-white text-sm font-semibold shadow-[0_0_0_1px_rgba(255,255,255,0.1)] hover:bg-white/[0.06] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.15)] transition-all duration-300">
          Accès Client
        </button>
      </div>
    </nav>
  );
};

const PremiumCard = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <motion.div
    whileHover={{ y: -6, scale: 1.005 }}
    transition={{ type: "spring", stiffness: 300, damping: 25 }}
    className={cn(
      "relative rounded-3xl overflow-hidden group",
      // Multi-layer shadow stack (shadow-as-border technique)
      "shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_2px_4px_rgba(0,0,0,0.1),0_12px_24px_rgba(0,0,0,0.2),inset_0_0_0_1px_rgba(255,255,255,0.02)]",
      "hover:shadow-[0_0_0_1px_rgba(255,255,255,0.12),0_8px_16px_rgba(0,0,0,0.3),0_24px_48px_rgba(0,0,0,0.3)]",
      "bg-white/[0.015] backdrop-blur-2xl",
      "transition-all duration-500",
      className
    )}
  >
    {/* Hover gradient overlay */}
    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/[0.03] via-transparent to-indigo-600/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
    <div className="relative z-10">{children}</div>
  </motion.div>
);

const StatCard = ({ value, label }: { value: string, label: string }) => (
  <div className="text-center p-8 rounded-2xl bg-white/[0.01] shadow-[0_0_0_1px_rgba(255,255,255,0.05)]">
    <div className="text-5xl font-black tracking-[-0.04em] bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent mb-3">
      {value}
    </div>
    <div className="text-xs text-gray-500 uppercase tracking-[0.15em] font-bold">{label}</div>
  </div>
);

const AccordionItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="shadow-[0_0_0_1px_rgba(255,255,255,0.06)] rounded-2xl overflow-hidden bg-white/[0.01] backdrop-blur-sm">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-8 flex items-center justify-between text-left focus:outline-none hover:bg-white/[0.02] transition-colors duration-300"
      >
        <span className="text-lg font-bold text-white pr-4">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {isOpen ? <Minus className="text-blue-500 w-5 h-5 flex-shrink-0" /> : <Plus className="text-blue-500 w-5 h-5 flex-shrink-0" />}
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="px-8 pb-8 text-gray-400 leading-relaxed border-t border-white/[0.05] pt-6">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function AIInfrastructureLanding() {
  const { scrollYProgress } = useScroll();
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <main className="bg-black text-white selection:bg-blue-500/30 font-sans antialiased overflow-x-hidden">
      <NoiseTexture />
      <Navbar />

      {/* Hero Section - avec negative letter-spacing et espacement premium */}
      <header className="relative min-h-screen flex items-center pt-32 pb-24 overflow-hidden">
        {/* Background avec parallax */}
        <div className="absolute inset-0 z-0">
          <motion.div style={{ y: yBg }} className="absolute inset-0 opacity-50">
            <div className="absolute top-[-15%] left-[-10%] w-[55%] h-[55%] bg-blue-600/15 blur-[140px] rounded-full" />
            <div className="absolute bottom-[15%] right-[-8%] w-[45%] h-[45%] bg-indigo-600/12 blur-[120px] rounded-full" />
          </motion.div>
          {/* Grid pattern subtil */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,#000_60%,transparent_110%)]" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-6xl mx-auto text-center">
            {/* Badge avec shadow-as-border */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full shadow-[0_0_0_1px_rgba(59,130,246,0.3)] bg-blue-500/[0.04] backdrop-blur-md mb-10"
            >
              <div className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse shadow-[0_0_12px_rgba(59,130,246,0.8)]" />
              <span className="text-xs font-bold tracking-[0.12em] text-blue-400 uppercase">Architecture IA Haute Performance</span>
            </motion.div>

            {/* Hero title avec negative letter-spacing */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1 }}
              className="text-6xl md:text-8xl lg:text-9xl font-black leading-[0.95] tracking-[-0.045em] mb-10"
            >
              L&apos;IA n&apos;est plus une option. <br />
              <span className="bg-gradient-to-r from-blue-500 via-indigo-400 to-blue-600 bg-clip-text text-transparent">
                C&apos;est votre avantage injuste.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.25 }}
              className="text-xl md:text-2xl text-gray-400 max-w-4xl mx-auto mb-14 leading-[1.6]"
            >
              Ne regardez pas vos concurrents automatiser leur croissance. Déployez une infrastructure d&apos;agents autonomes et de skills IA pour transformer votre entreprise en moteur de vélocité synthétique.
            </motion.p>

            {/* CTAs avec premium shadows */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.35 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-6"
            >
              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                className="group relative px-10 py-5 bg-white text-black font-bold text-lg rounded-full overflow-hidden shadow-[0_0_0_1px_rgba(255,255,255,0.2),0_8px_32px_rgba(255,255,255,0.15)] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.3),0_12px_48px_rgba(255,255,255,0.25)] transition-all duration-300"
              >
                <span className="relative z-10 flex items-center gap-3">
                  Réserver un Audit Stratégique Gratuit
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-white" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="px-10 py-5 shadow-[0_0_0_1px_rgba(255,255,255,0.1)] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.15)] bg-white/[0.02] backdrop-blur-sm text-white font-bold text-lg rounded-full hover:bg-white/[0.05] transition-all duration-300"
              >
                Consulter un expert IA
              </motion.button>
            </motion.div>

            {/* Social proof */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 1 }}
              className="mt-24 pt-12 border-t border-white/[0.06] flex flex-wrap justify-center gap-16 grayscale opacity-40 hover:opacity-60 transition-opacity duration-500"
            >
              {["AI-ALLIANCE", "FUTURECORE", "QUANTUM-SYS", "NEXUS-ENT"].map((logo) => (
                <div key={logo} className="text-xl font-bold tracking-[-0.02em]">{logo}</div>
              ))}
            </motion.div>
          </div>
        </div>
      </header>

      {/* Stats Section */}
      <section className="py-32 relative">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-7xl mx-auto">
            <StatCard value="310%" label="Gain de productivité" />
            <StatCard value="€500k" label="Économie annuelle ops" />
            <StatCard value="24/7" label="Disponibilité agents" />
            <StatCard value="0" label="Latence de recrutement" />
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-32 bg-[#030303]">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-24 items-center max-w-7xl mx-auto">
            <div>
              <span className="text-blue-500 font-bold uppercase tracking-[0.15em] text-sm mb-6 block">Le Risque d&apos;Obsolescence</span>
              <h2 className="text-5xl md:text-6xl font-black mb-8 leading-[1.05] tracking-[-0.03em]">
                Pendant que vous recrutez, vos concurrents <span className="text-blue-500">déploient</span>.
              </h2>
              <p className="text-xl text-gray-400 mb-12 leading-relaxed">
                Le paradigme du scaling linéaire est mort. Les entreprises qui dominent le marché multiplient par 100 leur capacité d&apos;exécution via des infrastructures autonomes.
              </p>

              <div className="space-y-6">
                {[
                  { title: "Dette Opérationnelle", desc: "Vos équipes passent 60% de leur temps sur des tâches à faible valeur ajoutée." },
                  { title: "Goulot d'Étranglement Technique", desc: "Votre cycle de développement est freiné par des processus manuels dépassés." },
                  { title: "Scalabilité Capée", desc: "Votre croissance est limitée par le temps humain disponible." }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-5 p-6 rounded-2xl bg-white/[0.01] shadow-[0_0_0_1px_rgba(239,68,68,0.15)] hover:shadow-[0_0_0_1px_rgba(239,68,68,0.25)] hover:bg-red-500/[0.02] transition-all duration-300 group"
                  >
                    <div className="shrink-0 w-12 h-12 rounded-xl shadow-[0_0_0_1px_rgba(239,68,68,0.2)] flex items-center justify-center text-red-500 bg-red-500/[0.05] group-hover:bg-red-500/[0.1] transition-colors duration-300">
                      <Zap className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-2 text-lg">{item.title}</h4>
                      <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -inset-6 bg-gradient-to-tr from-blue-500/15 to-indigo-500/15 rounded-[3rem] blur-3xl" />
              <div className="relative aspect-square rounded-[2.5rem] shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_20px_50px_rgba(0,0,0,0.4)] bg-white/[0.02] backdrop-blur-2xl overflow-hidden flex items-center justify-center p-12">
                <div className="w-full h-full shadow-[0_0_0_1px_rgba(255,255,255,0.06)] rounded-3xl bg-black/40 backdrop-blur-sm p-10 flex flex-col items-center justify-center text-center">
                  <div className="w-24 h-24 bg-blue-500/15 rounded-full flex items-center justify-center mb-8 shadow-[0_0_40px_rgba(59,130,246,0.3)] animate-pulse">
                    <Zap className="text-blue-400 w-12 h-12" />
                  </div>
                  <div className="text-7xl font-black text-white mb-3 tracking-[-0.04em]">3.5x</div>
                  <div className="text-gray-400 font-semibold uppercase tracking-[0.1em] text-sm mb-10">Accélération Vélocité Delivery</div>
                  <div className="grid grid-cols-2 gap-4 w-full">
                    <div className="p-4 bg-white/[0.03] shadow-[0_0_0_1px_rgba(255,255,255,0.06)] rounded-xl text-sm font-bold">-80% Support</div>
                    <div className="p-4 bg-white/[0.03] shadow-[0_0_0_1px_rgba(255,255,255,0.06)] rounded-xl text-sm font-bold">+200% Output</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section id="solution" className="py-40 relative">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto mb-24">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block px-5 py-2 rounded-full shadow-[0_0_0_1px_rgba(59,130,246,0.3)] bg-blue-500/[0.05] text-blue-400 text-xs font-bold tracking-[0.15em] uppercase mb-8"
            >
              Infrastructure IA
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-6xl font-black mb-8 leading-[1.05] tracking-[-0.03em]"
            >
              L&apos;Écosystème du Futur, Aujourd&apos;hui.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-400 leading-relaxed"
            >
              Une orchestration complexe et robuste conçue pour les exigences de l&apos;entreprise moderne.
            </motion.p>
          </div>

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
              <PremiumCard key={i} className="p-10">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mb-8 shadow-[0_12px_28px_rgba(79,70,229,0.3)]">
                  <service.icon className="text-white w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-4 tracking-tight">{service.title}</h3>
                <p className="text-gray-400 mb-8 leading-relaxed">{service.desc}</p>
                <ul className="space-y-3">
                  {service.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-gray-300">
                      <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </PremiumCard>
            ))}
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section id="méthodologie" className="py-40 bg-[#030303]">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto mb-24">
            <span className="inline-block px-5 py-2 rounded-full shadow-[0_0_0_1px_rgba(59,130,246,0.3)] bg-blue-500/[0.05] text-blue-400 text-xs font-bold tracking-[0.15em] uppercase mb-8">
              Le Processus
            </span>
            <h2 className="text-5xl md:text-6xl font-black mb-8 leading-[1.05] tracking-[-0.03em]">
              Votre Transformation en 4 Étapes
            </h2>
            <p className="text-xl text-gray-400">
              D&apos;une infrastructure rigide vers une agilité totale par l&apos;IA.
            </p>
          </div>

          <div className="max-w-6xl mx-auto space-y-6">
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
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group flex flex-col md:flex-row gap-8 p-10 shadow-[0_0_0_1px_rgba(255,255,255,0.05)] rounded-3xl bg-white/[0.005] hover:bg-white/[0.015] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_8px_24px_rgba(0,0,0,0.2)] transition-all duration-500"
              >
                <div className="text-6xl font-black text-white/[0.06] group-hover:text-blue-500/[0.15] transition-colors duration-500 shrink-0 leading-none">
                  {item.step}
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-4 mb-5">
                    <h3 className="text-3xl font-bold text-white tracking-tight">{item.title}</h3>
                    <span className="px-4 py-1.5 bg-blue-500/[0.08] text-blue-400 text-xs font-bold uppercase rounded-full shadow-[0_0_0_1px_rgba(59,130,246,0.2)]">
                      {item.tag}
                    </span>
                  </div>
                  <p className="text-gray-400 text-lg leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Urgency Section */}
      <section className="py-32">
        <div className="container mx-auto px-6">
          <div className="relative max-w-6xl mx-auto rounded-[3rem] bg-gradient-to-br from-blue-900/30 to-indigo-900/30 shadow-[0_0_0_1px_rgba(59,130,246,0.2),0_20px_60px_rgba(79,70,229,0.3)] overflow-hidden p-16 md:p-24">
            <div className="absolute top-0 right-0 p-16 opacity-5 pointer-events-none">
              <Clock className="w-80 h-80" />
            </div>

            <div className="max-w-3xl relative z-10">
              <h2 className="text-5xl md:text-6xl font-black text-white mb-10 tracking-[-0.03em] leading-[1.05]">
                La fenêtre stratégique se referme.
              </h2>
              <div className="space-y-6 text-xl text-gray-300 mb-14 leading-relaxed">
                <p>
                  Dans 24 mois, chaque entreprise de votre secteur possédera une infrastructure IA. À ce stade, ce ne sera plus un avantage, mais un prérequis de survie.
                </p>
                <p className="font-bold text-white text-2xl">
                  Ceux qui déploient aujourd&apos;hui créent un écart de performance qu&apos;il sera impossible de rattraper demain.
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 bg-white text-black font-bold text-lg rounded-full flex items-center gap-4 shadow-[0_12px_32px_rgba(255,255,255,0.2)] hover:shadow-[0_16px_48px_rgba(255,255,255,0.3)] transition-all duration-300"
              >
                Saisir l&apos;avantage maintenant
                <ArrowRight className="w-6 h-6" />
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-40 bg-[#030303]">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-6xl font-black mb-6 tracking-[-0.03em]">Questions Fréquentes</h2>
              <p className="text-xl text-gray-400">Tout ce que vous devez savoir avant d&apos;engager votre transition.</p>
            </div>
            <div className="space-y-4">
              <AccordionItem
                question="Comment garantissez-vous la sécurité de nos données ?"
                answer="Nous déployons des instances IA souveraines et cloisonnées. Vos données ne sont jamais utilisées pour entraîner des modèles publics. Chaque agent respecte les protocoles de sécurité les plus stricts (SOC2 Type II, RGPD)."
              />
              <AccordionItem
                question="L'installation nécessite-t-elle de changer nos outils actuels ?"
                answer="Non. Nos infrastructures sont conçues pour se greffer sur vos logiciels existants (Slack, Salesforce, Jira, GitHub, Notion, etc.) via des connecteurs natifs ou des protocoles API personnalisés."
              />
              <AccordionItem
                question="Quel est le délai moyen pour voir les premiers résultats ?"
                answer="Dès la première phase d'audit (semaine 1), nous identifions des 'Quick Wins'. Le déploiement complet prend généralement 4 à 8 semaines, mais l'accélération tech commence dès le 15ème jour."
              />
              <AccordionItem
                question="Formez-vous nos équipes à collaborer avec les agents ?"
                answer="Absolument. La technologie n'est rien sans l'humain. Nous organisons des workshops intensifs pour vos leaders et vos équipes afin qu'ils apprennent à piloter cette nouvelle force de travail synthétique."
              />
              <AccordionItem
                question="Peut-on commander des agents personnalisés pour des besoins spécifiques ?"
                answer="C'est notre spécialité. Au-delà des agents standards, nous concevons des agents 'maison' entraînés sur vos connaissances métiers spécifiques et vos processus propriétaires."
              />
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-40 shadow-[0_-1px_0_0_rgba(255,255,255,0.05)] relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-600/[0.03] backdrop-blur-3xl" />
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-6xl md:text-8xl font-black text-white mb-10 tracking-[-0.04em] leading-[0.95]">
              Rejoignez le top 1% des entreprises AI-First.
            </h2>
            <p className="text-2xl text-gray-400 mb-16 max-w-3xl mx-auto leading-relaxed">
              Transformez votre structure organisationnelle avant que le marché ne vous y oblige.
            </p>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="inline-block p-2 rounded-[3rem] bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-500 shadow-[0_24px_60px_rgba(79,70,229,0.4)]"
            >
              <div className="bg-black rounded-[2.75rem] p-6 flex flex-col md:flex-row items-center gap-8 md:gap-16 px-14 py-10">
                <div className="text-left">
                  <div className="text-white font-bold text-2xl mb-2">Audit Stratégique Offert</div>
                  <div className="text-gray-400 text-sm">Valeur de la session : 1 250 € — Places limitées.</div>
                </div>
                <button className="px-12 py-5 bg-white text-black font-black uppercase text-sm tracking-[0.1em] rounded-full hover:bg-blue-50 shadow-lg transition-all duration-300 hover:scale-105">
                  Réserver mon appel stratégique
                </button>
              </div>
            </motion.div>

            <div className="mt-16 flex flex-wrap items-center justify-center gap-x-12 gap-y-4 text-gray-500 text-sm font-medium">
              <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4" /> Sans engagement</span>
              <span className="flex items-center gap-2"><Users className="w-4 h-4" /> Consulting de haut niveau</span>
              <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> Plan d&apos;action concret</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t border-white/[0.05] bg-black">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <Cpu className="text-white w-5 h-5" />
              </div>
              <span className="text-2xl font-black tracking-[-0.03em] text-white">
                Synthétique<span className="text-blue-500">.</span>
              </span>
            </div>

            <div className="flex gap-10 text-sm text-gray-500 font-semibold">
              <a href="#" className="hover:text-white transition-colors duration-300">Mentions Légales</a>
              <a href="#" className="hover:text-white transition-colors duration-300">Confidentialité</a>
              <a href="#" className="hover:text-white transition-colors duration-300">Contact</a>
            </div>

            <div className="text-sm text-gray-600 font-medium">
              © 2024 Synthétique AI Infrastructure. Tous droits réservés.
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
