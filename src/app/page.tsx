"use client";

import React, { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
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
  Database
} from "lucide-react";
import { cn } from "@/lib/utils";

// Fade-in with slide animation
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

// Background decoration
const BackgroundDecoration = () => {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -150]);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Gradient orbs */}
      <motion.div
        style={{ y: y1 }}
        className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-indigo-200/40 via-purple-200/30 to-transparent rounded-full blur-3xl"
      />
      <motion.div
        style={{ y: y2 }}
        className="absolute top-1/3 -left-40 w-[500px] h-[500px] bg-gradient-to-tr from-blue-200/30 via-indigo-200/20 to-transparent rounded-full blur-3xl"
      />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-tl from-purple-200/20 to-transparent rounded-full blur-3xl" />
    </div>
  );
};

export default function AIInfrastructureLanding() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl blur-sm opacity-40" />
                <div className="relative w-9 h-9 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
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
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 group-hover:w-full transition-all duration-300" />
                </motion.a>
              ))}
            </div>

            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-full transition-all shadow-lg shadow-indigo-500/25"
            >
              Démarrer
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
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 rounded-full">
                  <div className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600" />
                  </div>
                  <span className="text-sm font-medium bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    Plateforme IA nouvelle génération
                  </span>
                </div>
              </FadeIn>

              <FadeIn delay={0.3}>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight">
                  Automatisez <em className="not-italic font-light italic text-indigo-600">intelligemment</em>,
                  <br />
                  croissez <em className="not-italic font-light italic text-purple-600">exponentiellement</em>
                </h1>
              </FadeIn>

              <FadeIn delay={0.4}>
                <p className="text-xl text-slate-600 leading-relaxed max-w-xl">
                  Une infrastructure d&apos;agents IA qui <em className="font-medium not-italic">apprend</em> de vos processus,
                  <em className="font-medium not-italic"> s&apos;adapte</em> à votre entreprise et <em className="font-medium not-italic">évolue</em> avec vous.
                </p>
              </FadeIn>

              <FadeIn delay={0.5}>
                <div className="flex flex-wrap items-center gap-4">
                  <motion.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="group px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-full transition-all shadow-xl shadow-indigo-500/30 hover:shadow-2xl hover:shadow-indigo-500/40 flex items-center gap-2"
                  >
                    Réserver un audit stratégique
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-8 py-4 bg-slate-100 hover:bg-slate-200 text-slate-900 font-semibold rounded-full transition-all"
                  >
                    Voir la démo
                  </motion.button>
                </div>
              </FadeIn>

              <FadeIn delay={0.6}>
                <div className="flex items-center gap-8 pt-4">
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 border-2 border-white" />
                      ))}
                    </div>
                    <span className="text-sm text-slate-600">
                      <span className="font-semibold text-slate-900">50+ entreprises</span> nous font confiance
                    </span>
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* Right: Visual */}
            <FadeIn delay={0.4} direction="right">
              <div className="relative">
                {/* Background glow */}
                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-200/50 via-purple-200/30 to-blue-200/50 rounded-3xl blur-3xl" />

                {/* Main card */}
                <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl border border-slate-200/60 p-8 shadow-2xl">
                  <div className="space-y-6">
                    {/* Metrics */}
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { label: "Productivité", value: "+310%", icon: TrendingUp },
                        { label: "Coûts réduits", value: "€450k", icon: BarChart3 },
                      ].map((metric, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.6 + i * 0.1 }}
                          className="p-5 bg-gradient-to-br from-slate-50 to-white rounded-2xl border border-slate-200/60"
                        >
                          <metric.icon className="w-5 h-5 text-indigo-600 mb-3" />
                          <div className="text-3xl font-bold text-slate-900 mb-1">{metric.value}</div>
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
                          className="flex items-center justify-between p-4 bg-gradient-to-r from-indigo-50/50 to-purple-50/50 rounded-xl border border-indigo-100/60"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                            <div>
                              <div className="text-sm font-semibold text-slate-900">{item.label}</div>
                              <div className="text-xs text-slate-600">{item.status}</div>
                            </div>
                          </div>
                          <div className="text-2xl font-bold text-indigo-600">{item.count}</div>
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

      {/* Social Proof */}
      <section className="py-16 px-6 lg:px-8 border-y border-slate-200/60 bg-slate-50/50">
        <div className="container mx-auto max-w-7xl">
          <FadeIn>
            <p className="text-center text-sm text-slate-500 font-medium mb-12 tracking-wide uppercase">
              Partenaires de croissance
            </p>
            <div className="flex flex-wrap items-center justify-center gap-16 opacity-30">
              {["TechFlow", "DataCorp", "CloudBase", "SystemAI", "InnovLab"].map((company) => (
                <div key={company} className="text-2xl font-bold tracking-tight">
                  {company}
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Bento Grid - Features */}
      <section id="solution" className="py-32 px-6 lg:px-8 relative">
        <div className="container mx-auto max-w-7xl">
          <FadeIn>
            <div className="text-center mb-20 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Une plateforme <em className="not-italic font-light italic text-indigo-600">complète</em> pour toutes vos opérations
              </h2>
              <p className="text-xl text-slate-600">
                Des agents IA qui travaillent <em className="font-medium not-italic">en tandem</em> avec vos équipes
              </p>
            </div>
          </FadeIn>

          {/* Bento Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Large feature 1 */}
            <FadeIn delay={0.1}>
              <div className="lg:col-span-2 lg:row-span-2 group p-10 bg-gradient-to-br from-white to-indigo-50/30 rounded-3xl border border-slate-200/60 hover:border-indigo-200 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500">
                <div className="h-full flex flex-col justify-between">
                  <div>
                    <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                      <Cpu className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-3xl font-bold mb-4">
                      Automatisation <em className="not-italic font-light italic">intelligente</em>
                    </h3>
                    <p className="text-lg text-slate-600 leading-relaxed">
                      Nos agents IA analysent vos workflows, identifient les opportunités d&apos;optimisation
                      et <em className="font-medium not-italic">automatisent</em> les processus répétitifs sans intervention humaine.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-indigo-600 font-semibold mt-8 group-hover:gap-4 transition-all">
                    En savoir plus
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Small features */}
            {[
              {
                icon: Shield,
                title: "Sécurité maximale",
                desc: "Infrastructure conforme SOC2 avec chiffrement de bout en bout"
              },
              {
                icon: GitBranch,
                title: "Intégration native",
                desc: "Connecteurs pour +200 outils et plateformes"
              },
              {
                icon: Database,
                title: "Données souveraines",
                desc: "Vos données restent dans votre infrastructure"
              },
              {
                icon: Zap,
                title: "Déploiement rapide",
                desc: "Production en moins de 4 semaines"
              }
            ].map((feature, i) => (
              <FadeIn key={i} delay={0.2 + i * 0.1}>
                <div className="group p-8 bg-white rounded-3xl border border-slate-200/60 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-500">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500">
                    <feature.icon className="w-6 h-6 text-indigo-600" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{feature.desc}</p>
                </div>
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
                Des résultats <em className="not-italic font-light italic text-indigo-600">mesurables</em>
              </h2>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { value: "85%", label: "Réduction des tâches répétitives", sublabel: "En moyenne sur 6 mois" },
              { value: "12 mois", label: "Retour sur investissement", sublabel: "Moyenne constatée" },
              { value: "40h/sem", label: "Temps économisé par équipe", sublabel: "Par employé" }
            ].map((stat, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="text-center p-10 rounded-3xl bg-white border border-slate-200/60 hover:border-indigo-200 hover:shadow-xl transition-all duration-500">
                  <div className="text-6xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
                    {stat.value}
                  </div>
                  <div className="text-lg font-semibold text-slate-900 mb-2">{stat.label}</div>
                  <div className="text-sm text-slate-500">{stat.sublabel}</div>
                </div>
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
                Un déploiement <em className="not-italic font-light italic text-indigo-600">sur-mesure</em>
              </h2>
              <p className="text-xl text-slate-600">
                De l&apos;audit à la production, un accompagnement <em className="font-medium not-italic">bout-en-bout</em>
              </p>
            </div>
          </FadeIn>

          <div className="space-y-6">
            {[
              {
                phase: "Phase 1",
                title: "Audit stratégique",
                duration: "1 semaine",
                description: "Analyse approfondie de vos processus et identification des opportunités d'automatisation à ROI élevé."
              },
              {
                phase: "Phase 2",
                title: "Architecture & design",
                duration: "2 semaines",
                description: "Conception de votre écosystème d'agents IA personnalisé avec protocoles de sécurité et conformité."
              },
              {
                phase: "Phase 3",
                title: "Déploiement progressif",
                duration: "4-6 semaines",
                description: "Mise en production par étapes avec formation de vos équipes et ajustements continus."
              },
              {
                phase: "Phase 4",
                title: "Optimisation continue",
                duration: "Continu",
                description: "Monitoring des performances, amélioration des modèles et support technique dédié."
              }
            ].map((step, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="group relative p-8 rounded-3xl bg-white border border-slate-200/60 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-500">
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-lg group-hover:scale-110 transition-transform duration-500">
                      0{i + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-3">
                        <h3 className="text-2xl font-bold">{step.title}</h3>
                        <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-semibold rounded-full">
                          {step.duration}
                        </span>
                      </div>
                      <p className="text-slate-600 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="ressources" className="py-32 px-6 lg:px-8 bg-gradient-to-b from-slate-50/50 to-white">
        <div className="container mx-auto max-w-3xl">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Questions <em className="not-italic font-light italic text-indigo-600">fréquentes</em>
              </h2>
            </div>
          </FadeIn>

          <div className="space-y-4">
            {[
              {
                q: "Combien de temps prend l'implémentation complète ?",
                a: "Le déploiement complet prend entre 6 et 10 semaines selon la complexité de votre infrastructure. Nous procédons par phases pour minimiser l'impact sur vos opérations et permettre des ajustements progressifs."
              },
              {
                q: "Comment garantissez-vous la sécurité de nos données ?",
                a: "Nous utilisons une infrastructure isolée conforme SOC2 Type II et RGPD. Vos données restent dans votre infrastructure et ne sont jamais utilisées pour entraîner des modèles publics. Chiffrement de bout en bout et audits de sécurité réguliers."
              },
              {
                q: "Faut-il remplacer nos outils actuels ?",
                a: "Non, notre solution s'intègre avec vos outils existants via des connecteurs natifs et API sécurisées. Nous nous adaptons à votre stack technologique actuelle sans nécessiter de migration."
              },
              {
                q: "Quel est le ROI typique et dans quel délai ?",
                a: "Nos clients constatent généralement un retour sur investissement entre 10 et 14 mois, avec des réductions de coûts de 40 à 65% sur les processus automatisés. Les premiers gains sont visibles dès le 2ème mois."
              }
            ].map((faq, i) => (
              <FadeIn key={i} delay={i * 0.05}>
                <div className="border border-slate-200/60 rounded-2xl bg-white overflow-hidden hover:border-indigo-200 hover:shadow-lg transition-all duration-300">
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
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-8 pb-6 text-slate-600 leading-relaxed border-t border-slate-100"
                    >
                      <div className="pt-6">{faq.a}</div>
                    </motion.div>
                  )}
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
            <div className="relative p-16 rounded-[3rem] bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700 overflow-hidden">
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                  backgroundSize: '32px 32px'
                }} />
              </div>

              <div className="relative text-center space-y-8">
                <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                  Prêt à <em className="not-italic font-light italic">transformer</em> votre entreprise ?
                </h2>
                <p className="text-xl text-indigo-100 max-w-2xl mx-auto">
                  Planifiez un audit gratuit avec nos experts pour identifier
                  vos <em className="font-semibold not-italic">opportunités d&apos;automatisation</em>
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-10 py-5 bg-white text-indigo-600 hover:bg-indigo-50 font-bold rounded-full transition-all shadow-2xl shadow-indigo-900/30 flex items-center gap-2"
                  >
                    Réserver mon audit gratuit
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </div>
                <p className="text-sm text-indigo-200">
                  Sans engagement • Audit personnalisé • Résultats sous 48h
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 lg:px-8 border-t border-slate-200/60 bg-slate-50/50">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl blur-sm opacity-40" />
                <div className="relative w-9 h-9 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
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
    </main>
  );
}
