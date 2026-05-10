"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  Zap,
  ShieldCheck,
  Cpu,
  ChevronRight,
  ArrowRight,
  BarChart3,
  Bot,
  MessageSquare,
  Terminal,
  CheckCircle2,
  Users,
  Clock,
  Globe,
  Plus,
  Minus
} from "lucide-react";
import { cn } from "@/lib/utils";

// --- Components ---

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
      scrolled ? "bg-black/80 backdrop-blur-md border-white/10 py-4" : "bg-transparent border-transparent py-6"
    )}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Cpu className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-bold tracking-tighter text-white uppercase">Synthétique<span className="text-blue-500">.</span></span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {["Solution", "Méthodologie", "Cas clients", "FAQ"].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
              {item}
            </a>
          ))}
          <button className="px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-white text-sm font-semibold hover:bg-white/10 transition-all">
            Accès Client
          </button>
        </div>
      </div>
    </nav>
  );
};

const Statistic = ({ value, label, prefix = "", suffix = "" }: { value: string, label: string, prefix?: string, suffix?: string }) => (
  <div className="text-center p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
    <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent mb-2">
      {prefix}{value}{suffix}
    </div>
    <div className="text-sm text-gray-400 uppercase tracking-widest leading-tight">{label}</div>
  </div>
);

const SectionHeading = ({ badge, title, subtitle }: { badge: string, title: string, subtitle: string }) => (
  <div className="text-center max-w-3xl mx-auto mb-16">
    <motion.span
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="inline-block px-4 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-bold tracking-widest uppercase mb-4"
    >
      {badge}
    </motion.span>
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
      className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight"
    >
      {title}
    </motion.h2>
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2 }}
      className="text-xl text-gray-400"
    >
      {subtitle}
    </motion.p>
  </div>
);

const FeatureCard = ({ iconPath: Icon, title, description, items }: { iconPath: any, title: string, description: string, items: string[] }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-blue-500/50 transition-all duration-500 flex flex-col h-full"
  >
    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mb-6 shadow-xl shadow-blue-500/20">
      <Icon className="text-white w-7 h-7" />
    </div>
    <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
    <p className="text-gray-400 mb-8 leading-relaxed">{description}</p>
    <ul className="mt-auto space-y-3">
      {items.map((item, idx) => (
        <li key={idx} className="flex items-start gap-3 text-sm text-gray-300">
          <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </motion.div>
);

const AccordionItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-white/10">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left focus:outline-none"
      >
        <span className="text-lg font-semibold text-white">{question}</span>
        {isOpen ? <Minus className="text-blue-500 w-5 h-5" /> : <Plus className="text-blue-500 w-5 h-5" />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="pb-6 text-gray-400 leading-relaxed max-w-4xl">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Main Page ---

export default function AIInfrastructureLanding() {
  const { scrollYProgress } = useScroll();
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <main className="bg-black text-white font-sans selection:bg-blue-500/30">
      <Navbar />

      {/* Hero Section */}
      <header className="relative min-h-screen flex items-center pt-28 pb-20 overflow-hidden">
        {/* Dynamic Background */}
        <div className="absolute inset-0 z-0">
          <motion.div style={{ y: yBg }} className="absolute inset-0 opacity-40">
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/20 blur-[120px] rounded-full" />
            <div className="absolute bottom-[20%] right-[-5%] w-[40%] h-[40%] bg-indigo-600/20 blur-[100px] rounded-full" />
          </motion.div>
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/20 bg-blue-500/5 backdrop-blur-md mb-8"
            >
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-xs font-semibold tracking-widest text-blue-400 uppercase">Architecture IA Haute Performance</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-6xl md:text-8xl font-black text-white leading-[1.05] tracking-tight mb-8"
            >
              L&apos;IA n&apos;est plus une option. <br />
              <span className="bg-gradient-to-r from-blue-500 via-indigo-400 to-blue-600 bg-clip-text text-transparent">C&apos;est votre avantage injuste.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed"
            >
              Ne regardez pas vos concurrents automatiser leur croissance. Déployez une infrastructure d&apos;agents autonomes et de skills IA pour transformer votre entreprise en moteur de vélocité synthétique.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-5"
            >
              <button className="group relative px-8 py-5 bg-white text-black font-bold text-lg rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-white/10">
                <span className="relative z-10 flex items-center gap-2">
                  Réserver un Audit Stratégique Gratuit
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-white -z-0" />
              </button>
              <button className="px-8 py-5 bg-white/5 border border-white/10 text-white font-bold text-lg rounded-full hover:bg-white/10 transition-all backdrop-blur-sm">
                Consulter un expert IA
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="mt-20 pt-10 border-t border-white/10 flex flex-wrap justify-center gap-12 grayscale opacity-60"
            >
              {/* Logos placeholders */}
              <div className="flex items-center gap-2 font-bold text-xl tracking-tighter">AI-ALLIANCE</div>
              <div className="flex items-center gap-2 font-bold text-xl tracking-tighter">FUTURECORE</div>
              <div className="flex items-center gap-2 font-bold text-xl tracking-tighter">QUANTUM-SYS</div>
              <div className="flex items-center gap-2 font-bold text-xl tracking-tighter">NEXUS-ENT</div>
            </motion.div>
          </div>
        </div>
      </header>

      {/* The Problem Section */}
      <section className="py-24 bg-zinc-950">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <span className="text-blue-500 font-bold uppercase tracking-widest text-sm mb-4 block">Le Risque d&apos;Obsolescence</span>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
                Pendant que vous recrutez, vos concurrents <span className="text-blue-500">déploient</span>.
              </h2>
              <p className="text-lg text-gray-400 mb-10 leading-relaxed">
                Le paradigme du scaling linéaire est mort. Les entreprises qui dominent le marché ne cherchent plus à augmenter leur masse salariale par 10, elles multiplient par 100 leur capacité d&apos;exécution via des infrastructures autonomes.
              </p>

              <div className="space-y-6">
                {[
                  { title: "Dette Opérationnelle", desc: "Vos équipes passent 60% de leur temps sur des tâches à faible valeur ajoutée." },
                  { title: "Goulot d'Étranglement Technique", desc: "Votre cycle de développement (SDLC) est freiné par des processus manuels dépassés." },
                  { title: "Scalabilité Capée", desc: "Votre croissance est limitée par le temps humain disponible au lieu de votre vision." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 p-4 rounded-2xl hover:bg-white/5 transition-colors group">
                    <div className="shrink-0 w-10 h-10 rounded-full border border-red-500/30 flex items-center justify-center text-red-500 bg-red-500/5 group-hover:bg-red-500/10 transition-colors">
                      <Zap className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-1">{item.title}</h4>
                      <p className="text-sm text-gray-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-tr from-blue-500/20 to-indigo-500/20 rounded-3xl blur-2xl" />
              <div className="relative aspect-square rounded-3xl border border-white/10 bg-white/5 overflow-hidden flex items-center justify-center p-8 backdrop-blur-xl">
                <div className="w-full h-full border border-white/10 rounded-2xl bg-black/50 p-6 flex flex-col items-center justify-center text-center">
                  <div className="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center mb-6 animate-pulse">
                    <Zap className="text-blue-400 w-10 h-10" />
                  </div>
                  <div className="text-5xl font-black text-white mb-2">3.5x</div>
                  <div className="text-gray-400 font-medium uppercase tracking-tighter">Accélération de la Vélocité de Delivery</div>
                  <div className="mt-8 grid grid-cols-2 gap-4 w-full">
                    <div className="p-3 bg-white/5 border border-white/10 rounded-lg text-sm">-80% Support</div>
                    <div className="p-3 bg-white/5 border border-white/10 rounded-lg text-sm">+200% Output</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section id="solution" className="py-32 relative">
        <div className="container mx-auto px-6">
          <SectionHeading
            badge="Infrastructure IA"
            title="L'Écosystème du Futur, Aujourd'hui."
            subtitle="Une orchestration complexe et robuste conçue pour les exigences de l'entreprise moderne."
          />

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              iconPath={Terminal}
              title="Ingénierie de Précision"
              description="Déploiement de Claude Code au cœur de vos équipes tech pour un cycle de développement sans friction."
              items={[
                "Implémentation intégrée à votre CI/CD",
                "Pairs d'IA programmés pour votre stack",
                "Réduction du Time-to-Market de 65%",
                "Outils d'autocorrection des bugs"
              ]}
            />
            <FeatureCard
              iconPath={Bot}
              title="Cerveau Synthétique"
              description="184+ agents IA autonomes programmés pour chaque département — Vente, Marketing, Ops et HR."
              items={[
                "Support client 24/7 hyper-personnalisé",
                "Génération de leads à haute vélocité",
                "Audit financier automatisé en temps réel",
                "Agents de design et de contenu"
              ]}
            />
            <FeatureCard
              iconPath={Zap}
              title="Auto-Skills & Workflows"
              description="85+ briques d'automatisation avancées pour lier chaque outil de votre écosystème."
              items={[
                "Cross-platform data synchronization",
                "Intelligence décisionnelle automatisée",
                "Élimination des tâches répétitives",
                "Reporting prédictif par IA"
              ]}
            />
          </div>
        </div>
      </section>

      {/* How it Works / Timeline */}
      <section id="méthodologie" className="py-32 bg-zinc-950">
        <div className="container mx-auto px-6 font-sans">
          <SectionHeading
            badge="Le Processus"
            title="Votre Transformation en 4 Étapes"
            subtitle="D'une infrastructure rigide vers une agilité totale par l'IA."
          />

          <div className="max-w-5xl mx-auto space-y-8">
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
                desc: "Formation de vos cadres (C-level & Directors) et optimisation continue des performances des agents par nos ingénieurs.",
                tag: "Continu"
              }
            ].map((item, id) => (
              <motion.div
                key={id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="group relative flex flex-col md:flex-row gap-8 p-8 border border-white/5 rounded-3xl bg-white/[0.02] hover:bg-white/[0.04] transition-all"
              >
                <div className="text-5xl font-black text-white/10 group-hover:text-blue-500/20 transition-colors shrink-0 leading-none">
                  {item.step}
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <h3 className="text-2xl font-bold text-white">{item.title}</h3>
                    <span className="px-3 py-1 bg-blue-500/10 text-blue-400 text-[10px] font-bold uppercase rounded-full border border-blue-500/20">{item.tag}</span>
                  </div>
                  <p className="text-gray-400 text-lg leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[300px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Statistic value="310" label="Gain de productivité" suffix="%" />
            <Statistic value="500k" label="Économie annuelle ops" prefix="€" />
            <Statistic value="24/7" label="Disponibilité agents" />
            <Statistic value="0" label="Latence de recrutement" />
          </div>
        </div>
      </section>

      {/* Urgency Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="bg-gradient-to-br from-blue-900/40 to-indigo-900/40 border border-blue-500/20 rounded-[3rem] p-12 md:p-20 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
              <Clock className="w-64 h-64" />
            </div>

            <div className="max-w-3xl relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">La fenêtre stratégique se referme.</h2>
              <div className="space-y-6 text-xl text-gray-300 mb-12">
                <p>
                  Dans 24 mois, chaque entreprise de votre secteur possédera une infrastructure IA. À ce stade, ce ne sera plus un avantage, mais un prérequis de survie.
                </p>
                <p className="font-semibold text-white">
                  Ceux qui déploient aujourd&apos;hui créent un écart de performance qu&apos;il sera impossible de rattraper demain.
                </p>
              </div>
              <button className="px-8 py-5 bg-white text-black font-bold text-lg rounded-full flex items-center gap-3 hover:scale-105 transition-all">
                Saisir l&apos;avantage maintenant
                <ArrowRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-32 bg-zinc-950">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Questions Fréquentes</h2>
              <p className="text-gray-400">Tout ce que vous devez savoir avant d&apos;engager votre transition.</p>
            </div>
            <div className="space-y-2">
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
      <section className="py-32 border-t border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-600/5 backdrop-blur-3xl -z-10" />
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter">
              Rejoignez le top 1% des entreprises AI-First.
            </h2>
            <p className="text-2xl text-gray-400 mb-12 max-w-2xl mx-auto">
              Transformez votre structure organisationnelle avant que le marché ne vous y oblige.
            </p>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="inline-block p-1 rounded-[2.5rem] bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-500 shadow-2xl shadow-blue-500/20"
            >
              <div className="bg-black rounded-[2.3rem] p-4 flex flex-col md:flex-row items-center gap-6 md:gap-12 px-12 py-8">
                <div className="text-left">
                  <div className="text-white font-bold text-xl mb-1">Audit Stratégique Offert</div>
                  <div className="text-gray-400 text-sm">Valeur de la session : 1 250 € — Places limitées.</div>
                </div>
                <button className="px-10 py-5 bg-white text-black font-black uppercase text-sm tracking-widest rounded-full hover:bg-blue-50 hover:shadow-lg transition-all">
                  Réserver mon appel stratégique
                </button>
              </div>
            </motion.div>

            <div className="mt-12 flex items-center justify-center gap-8 text-gray-500 text-sm">
              <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4" /> Sans engagement</span>
              <span className="flex items-center gap-2"><Users className="w-4 h-4" /> Consulting de haut niveau</span>
              <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> Plan d&apos;action concret</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10 bg-black">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <Cpu className="text-white w-5 h-5" />
              </div>
              <span className="text-lg font-bold tracking-tighter text-white uppercase">Synthétique<span className="text-blue-500">.</span></span>
            </div>

            <div className="flex gap-8 text-sm text-gray-500 font-medium">
              <a href="#" className="hover:text-white transition-colors">Mentions Légales</a>
              <a href="#" className="hover:text-white transition-colors">Confidentialité</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>

            <div className="text-sm text-gray-600">
              © 2024 Synthétique AI Infrastructure. Tous droits réservés.
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
