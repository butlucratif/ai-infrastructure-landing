"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Building2,
  Zap,
  Shield,
  BarChart3,
  Users,
  Clock,
  TrendingUp
} from "lucide-react";
import { cn } from "@/lib/utils";

// Simple fade-in animation
const FadeIn = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
  >
    {children}
  </motion.div>
);

export default function AIInfrastructureLanding() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="bg-white text-slate-900 antialiased">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-slate-200 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Building2 className="w-6 h-6 text-blue-600" />
              <span className="text-xl font-semibold text-slate-900">Synthétique</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#solution" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">Solution</a>
              <a href="#clients" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">Clients</a>
              <a href="#processus" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">Processus</a>
            </div>
            <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
              Nous contacter
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-5xl">
          <FadeIn>
            <div className="text-center space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
                Infrastructure IA pour entreprises
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight">
                Automatisez vos processus
                <br />
                avec l&apos;intelligence artificielle
              </h1>

              <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                Nous déployons des agents IA autonomes pour automatiser vos tâches répétitives
                et accélérer la croissance de votre entreprise.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <button className="group px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all flex items-center gap-2">
                  Planifier un audit gratuit
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="px-8 py-4 bg-slate-100 hover:bg-slate-200 text-slate-900 font-medium rounded-lg transition-colors">
                  Voir la démo
                </button>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Social Proof - Client Logos */}
      <section id="clients" className="py-16 border-y border-slate-200 bg-slate-50">
        <div className="container mx-auto px-6">
          <FadeIn>
            <p className="text-center text-sm text-slate-500 uppercase tracking-wider font-medium mb-8">
              Ils nous font confiance
            </p>
            <div className="flex flex-wrap items-center justify-center gap-12 opacity-40">
              {["TechCorp", "InnovSoft", "DataFlow", "CloudBase", "SystemPro"].map((company) => (
                <div key={company} className="text-2xl font-bold text-slate-900">
                  {company}
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { value: "85%", label: "Réduction des tâches manuelles", icon: TrendingUp },
              { value: "40h", label: "Économisées par semaine", icon: Clock },
              { value: "12 mois", label: "Retour sur investissement moyen", icon: BarChart3 }
            ].map((stat, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="text-center p-8 rounded-xl border border-slate-200 bg-white hover:border-blue-200 hover:shadow-sm transition-all">
                  <stat.icon className="w-8 h-8 text-blue-600 mx-auto mb-4" />
                  <div className="text-4xl font-bold text-slate-900 mb-2">{stat.value}</div>
                  <div className="text-sm text-slate-600">{stat.label}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="solution" className="py-20 px-6 bg-slate-50">
        <div className="container mx-auto max-w-6xl">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Une solution complète pour votre entreprise
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Des agents IA spécialisés pour chaque département de votre organisation
              </p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: "Automatisation intelligente",
                description: "Agents IA qui apprennent de vos processus et automatisent les tâches répétitives en temps réel."
              },
              {
                icon: Shield,
                title: "Sécurité et conformité",
                description: "Infrastructure conforme SOC2 et RGPD avec isolation complète de vos données sensibles."
              },
              {
                icon: Users,
                title: "Intégration transparente",
                description: "Connexion native avec vos outils existants : Salesforce, Slack, Jira, et plus encore."
              }
            ].map((feature, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="p-8 rounded-xl bg-white border border-slate-200 hover:border-blue-200 hover:shadow-md transition-all">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                    <feature.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="processus" className="py-20 px-6">
        <div className="container mx-auto max-w-5xl">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Un déploiement simple et structuré
              </h2>
              <p className="text-lg text-slate-600">
                De l&apos;audit initial à la mise en production en quelques semaines
              </p>
            </div>
          </FadeIn>

          <div className="space-y-8">
            {[
              {
                step: "01",
                title: "Audit et analyse",
                description: "Nous analysons vos processus actuels et identifions les opportunités d'automatisation à fort impact."
              },
              {
                step: "02",
                title: "Configuration personnalisée",
                description: "Nos ingénieurs configurent les agents IA selon vos besoins spécifiques et votre stack technologique."
              },
              {
                step: "03",
                title: "Déploiement progressif",
                description: "Mise en production étape par étape avec accompagnement de vos équipes et ajustements continus."
              },
              {
                step: "04",
                title: "Optimisation continue",
                description: "Suivi des performances, amélioration des modèles et support technique dédié pour maximiser votre ROI."
              }
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="flex gap-6 p-8 rounded-xl border border-slate-200 bg-white hover:border-blue-200 hover:shadow-sm transition-all">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="container mx-auto max-w-4xl">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Les bénéfices pour votre entreprise
              </h2>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              "Réduction des coûts opérationnels de 40 à 60%",
              "Amélioration de la productivité des équipes",
              "Réponse instantanée aux demandes clients",
              "Élimination des erreurs humaines répétitives",
              "Scalabilité sans embauche proportionnelle",
              "Disponibilité 24/7 sans interruption"
            ].map((benefit, i) => (
              <FadeIn key={i} delay={i * 0.05}>
                <div className="flex items-start gap-3 p-4 rounded-lg bg-white border border-slate-200">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">{benefit}</span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-3xl">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Questions fréquentes
              </h2>
            </div>
          </FadeIn>

          <div className="space-y-4">
            {[
              {
                q: "Combien de temps prend l'implémentation ?",
                a: "Le déploiement initial prend généralement entre 4 et 8 semaines selon la complexité de votre infrastructure. Nous procédons par phases pour minimiser l'impact sur vos opérations."
              },
              {
                q: "Mes données sont-elles sécurisées ?",
                a: "Oui, nous utilisons une infrastructure isolée et conforme aux normes SOC2 Type II et RGPD. Vos données ne sont jamais utilisées pour entraîner des modèles publics."
              },
              {
                q: "Dois-je changer mes outils actuels ?",
                a: "Non, notre solution s'intègre avec vos outils existants via des connecteurs natifs et des API sécurisées. Aucun changement d'infrastructure n'est requis."
              },
              {
                q: "Quel est le ROI typique ?",
                a: "Nos clients constatent généralement un retour sur investissement entre 8 et 14 mois, avec des réductions de coûts moyennes de 40 à 60% sur les processus automatisés."
              }
            ].map((faq, i) => (
              <FadeIn key={i} delay={i * 0.05}>
                <div className="border border-slate-200 rounded-lg bg-white overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
                  >
                    <span className="font-semibold text-slate-900">{faq.q}</span>
                    <ChevronDown
                      className={cn(
                        "w-5 h-5 text-slate-400 transition-transform",
                        openFaq === i && "rotate-180"
                      )}
                    />
                  </button>
                  {openFaq === i && (
                    <div className="px-6 pb-5 text-slate-600 leading-relaxed border-t border-slate-100 pt-5">
                      {faq.a}
                    </div>
                  )}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-blue-600">
        <div className="container mx-auto max-w-4xl text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Prêt à transformer votre entreprise ?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Planifiez un audit gratuit avec nos experts pour identifier vos opportunités d&apos;automatisation.
            </p>
            <button className="group px-8 py-4 bg-white text-blue-600 hover:bg-blue-50 font-semibold rounded-lg transition-all inline-flex items-center gap-2">
              Réserver mon audit gratuit
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="text-sm text-blue-200 mt-6">
              Sans engagement • Audit personnalisé • Résultats sous 48h
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-slate-200 bg-slate-50">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-slate-900">Synthétique</span>
            </div>
            <div className="flex gap-8 text-sm text-slate-600">
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
