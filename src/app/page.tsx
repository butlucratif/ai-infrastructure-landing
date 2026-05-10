'use client';

import { motion } from 'framer-motion';
import {
  ArrowRight,
  Zap,
  TrendingUp,
  Shield,
  Clock,
  CheckCircle,
  ChevronDown,
  Menu,
  X,
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

// Navbar Component
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/5">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent"
          >
            AI Infrastructure
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#solution" className="text-gray-300 hover:text-white transition-colors">
              Solution
            </a>
            <a href="#process" className="text-gray-300 hover:text-white transition-colors">
              Process
            </a>
            <a href="#pricing" className="text-gray-300 hover:text-white transition-colors">
              Pricing
            </a>
            <a href="#faq" className="text-gray-300 hover:text-white transition-colors">
              FAQ
            </a>
            <motion.a
              href="#pricing"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full text-white font-medium hover:shadow-lg hover:shadow-blue-500/50 transition-all"
            >
              Get Started
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden mt-4 pb-4 flex flex-col gap-4"
          >
            <a href="#solution" className="text-gray-300 hover:text-white transition-colors">
              Solution
            </a>
            <a href="#process" className="text-gray-300 hover:text-white transition-colors">
              Process
            </a>
            <a href="#pricing" className="text-gray-300 hover:text-white transition-colors">
              Pricing
            </a>
            <a href="#faq" className="text-gray-300 hover:text-white transition-colors">
              FAQ
            </a>
            <a
              href="#pricing"
              className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full text-white font-medium text-center"
            >
              Get Started
            </a>
          </motion.div>
        )}
      </div>
    </nav>
  );
}

// Section Heading Component
function SectionHeading({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center max-w-3xl mx-auto mb-16"
    >
      <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
        {title}
      </h2>
      <p className="text-xl text-gray-400">{subtitle}</p>
    </motion.div>
  );
}

// Price Card Component
function PriceCard({
  name,
  price,
  period,
  features,
  highlighted,
  cta,
}: {
  name: string;
  price: string;
  period: string;
  features: string[];
  highlighted?: boolean;
  cta: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      className={cn(
        'relative p-8 rounded-2xl border transition-all',
        highlighted
          ? 'bg-gradient-to-br from-blue-600/20 to-indigo-600/20 border-blue-500/50 shadow-xl shadow-blue-500/20'
          : 'bg-black/40 border-white/10 hover:border-white/20'
      )}
    >
      {highlighted && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full text-sm font-medium text-white">
          RECOMMENDED
        </div>
      )}
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-white mb-2">{name}</h3>
        <div className="flex items-baseline justify-center gap-2">
          <span className="text-5xl font-bold text-white">{price}</span>
          <span className="text-gray-400">{period}</span>
        </div>
      </div>
      <ul className="space-y-4 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3 text-gray-300">
            <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <motion.a
        href="#contact"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          'block w-full py-3 rounded-xl font-medium text-center transition-all',
          highlighted
            ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/50'
            : 'bg-white/10 text-white hover:bg-white/20'
        )}
      >
        {cta}
      </motion.a>
    </motion.div>
  );
}

// Main Landing Page
export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "How long does implementation take?",
      a: "Lite tier deploys in 2-3 weeks. Production tier: 4-6 weeks. Enterprise: 8-12 weeks with full custom integration."
    },
    {
      q: "Do we need technical expertise?",
      a: "No. We handle installation, training, and onboarding. Your team uses natural language to command the AI."
    },
    {
      q: "What's the ROI?",
      a: "Clients typically see 40-60% time savings within 90 days. Engineering velocity increases 3-5x on average."
    },
    {
      q: "Can we customize the agents?",
      a: "Yes. Production and Enterprise tiers include custom agent development tailored to your exact workflows."
    },
    {
      q: "Is our data secure?",
      a: "Absolutely. All implementations are deployed on your infrastructure. Data never leaves your environment."
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-black to-indigo-600/20" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />

        <div className="container mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-400 text-sm font-medium mb-8"
            >
              <Zap className="w-4 h-4" />
              Deploy AI agents in weeks, not years
            </motion.div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
              SCALE REVENUE AT
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-400 bg-clip-text text-transparent">
                SYNTHETIC VELOCITY
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
              Install Claude Code, autonomous agents, and AI skills directly into your enterprise.
              <span className="text-white font-medium"> Automate processes. Compress timelines. Ship faster than your competitors can react.</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.a
                href="#pricing"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full text-lg font-medium shadow-xl shadow-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/60 transition-all flex items-center gap-2"
              >
                Deploy Your Infrastructure
                <ArrowRight className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="#process"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white/10 backdrop-blur-sm rounded-full text-lg font-medium hover:bg-white/20 transition-all"
              >
                See How It Works
              </motion.a>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-20"
          >
            {[
              { value: '3-5x', label: 'Engineering Velocity' },
              { value: '60%', label: 'Time Saved' },
              { value: '2-3 weeks', label: 'Implementation' },
            ].map((stat, index) => (
              <div key={index} className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <ChevronDown className="w-8 h-8 text-gray-600" />
        </motion.div>
      </section>

      {/* Problem Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto">
          <SectionHeading
            title="Your Competition Isn't Sleeping"
            subtitle="While you're hiring, training, and scaling linearly—they're deploying AI agents that work 24/7"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: Clock,
                problem: 'Engineering bottlenecks killing velocity',
                impact: 'Features delayed by months. Releases missed.',
              },
              {
                icon: TrendingUp,
                problem: 'Manual processes eating revenue',
                impact: 'Teams stuck on repetitive work instead of innovation.',
              },
              {
                icon: Shield,
                problem: 'Legacy tools can't keep pace',
                impact: 'Competitors with AI infrastructure are outshipping you 10:1.',
              },
              {
                icon: Zap,
                problem: 'No AI deployment expertise',
                impact: 'You know you need this, but don't know where to start.',
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 bg-black/40 border border-red-500/20 rounded-xl hover:border-red-500/40 transition-all"
              >
                <item.icon className="w-12 h-12 text-red-400 mb-4" />
                <h3 className="text-xl font-bold mb-2 text-white">{item.problem}</h3>
                <p className="text-gray-400">{item.impact}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section id="solution" className="py-20 px-6 bg-gray-900">
        <div className="container mx-auto">
          <SectionHeading
            title="Deploy AI Infrastructure In Weeks"
            subtitle="Full-stack AI deployment: Claude Code, autonomous agents, automation skills, and custom dashboards"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: Zap,
                title: 'Claude Code Installation',
                description: 'Production-grade Claude Code deployment with your codebase integrated. Command your entire stack via natural language.',
                features: ['Custom integrations', 'Team training', 'Security hardening'],
              },
              {
                icon: TrendingUp,
                title: 'Autonomous AI Agents',
                description: '184+ specialized sub-agents that handle engineering, design, marketing, sales, and operations autonomously.',
                features: ['Pre-trained agents', 'Custom agent dev', 'Multi-agent orchestration'],
              },
              {
                icon: Shield,
                title: 'Automation Skills Library',
                description: '85+ automation skills for testing, deployment, debugging, research, and workflow acceleration.',
                features: ['Plug-and-play skills', 'Custom skill creation', 'Team dashboards'],
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="p-8 bg-gradient-to-br from-blue-600/10 to-indigo-600/10 border border-blue-500/20 rounded-xl hover:border-blue-500/40 transition-all"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mb-6">
                  <item.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white">{item.title}</h3>
                <p className="text-gray-400 mb-6">{item.description}</p>
                <ul className="space-y-2">
                  {item.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-gray-300">
                      <CheckCircle className="w-4 h-4 text-blue-400" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="process" className="py-20 px-6 bg-black">
        <div className="container mx-auto">
          <SectionHeading
            title="Deploy In 4 Steps"
            subtitle="From discovery call to production deployment in weeks"
          />

          <div className="max-w-4xl mx-auto space-y-8">
            {[
              {
                step: '01',
                title: 'Discovery & Assessment',
                description: 'We audit your workflows, identify automation opportunities, and design your custom AI infrastructure plan.',
                duration: '1 week',
              },
              {
                step: '02',
                title: 'Installation & Integration',
                description: 'Deploy Claude Code, install agents and skills, integrate with your codebase, tools, and APIs.',
                duration: '1-2 weeks',
              },
              {
                step: '03',
                title: 'Training & Onboarding',
                description: 'Hands-on training for your team. Learn to command agents, create workflows, and maximize velocity.',
                duration: '1 week',
              },
              {
                step: '04',
                title: 'Production & Optimization',
                description: 'Go live with full support. We monitor performance, optimize agents, and scale as you grow.',
                duration: 'Ongoing',
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex gap-6 p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-blue-500/30 transition-all"
              >
                <div className="text-5xl font-bold bg-gradient-to-br from-blue-400 to-indigo-400 bg-clip-text text-transparent flex-shrink-0">
                  {item.step}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-2xl font-bold text-white">{item.title}</h3>
                    <span className="text-sm text-gray-400 bg-white/5 px-3 py-1 rounded-full">
                      {item.duration}
                    </span>
                  </div>
                  <p className="text-gray-400">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto">
          <SectionHeading
            title="Results Our Clients See"
            subtitle="Real impact within 90 days of deployment"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              { metric: '3-5x', label: 'Engineering Velocity Increase', icon: Zap },
              { metric: '60%', label: 'Time Saved on Repetitive Tasks', icon: Clock },
              { metric: '10x', label: 'Faster Deployment Cycles', icon: TrendingUp },
              { metric: '24/7', label: 'Autonomous Agent Operations', icon: Shield },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-8 bg-gradient-to-br from-blue-600/10 to-indigo-600/10 border border-blue-500/20 rounded-xl"
              >
                <item.icon className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                <div className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent mb-2">
                  {item.metric}
                </div>
                <div className="text-gray-400">{item.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-6 bg-gray-900">
        <div className="container mx-auto">
          <SectionHeading
            title="Choose Your Infrastructure Tier"
            subtitle="All plans include Claude Code, agents, skills, training, and support"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <PriceCard
              name="Lite"
              price="$2,500"
              period="/month"
              features={[
                'Claude Code installation',
                '50+ pre-built automation skills',
                '20+ autonomous agents',
                'Basic dashboard',
                'Email support',
                'Team training (up to 5 users)',
              ]}
              cta="Start with Lite"
            />
            <PriceCard
              name="Production"
              price="$5,000"
              period="/month"
              features={[
                'Everything in Lite, plus:',
                '85+ automation skills',
                '184+ specialized agents',
                'Custom agent development',
                'Priority support (24/7)',
                'Team training (up to 20 users)',
                'Custom integrations',
                'Performance monitoring',
              ]}
              highlighted
              cta="Deploy Production"
            />
            <PriceCard
              name="Enterprise"
              price="$12,000"
              period="/month"
              features={[
                'Everything in Production, plus:',
                'Unlimited custom agents',
                'Unlimited custom skills',
                'Dedicated success manager',
                'White-glove onboarding',
                'Unlimited users',
                'Custom dashboard & analytics',
                'SLA guarantees',
              ]}
              cta="Contact Sales"
            />
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-gray-400 mt-12 max-w-2xl mx-auto"
          >
            All plans include ongoing updates, security patches, and access to new agents and skills as they're released.
            <span className="text-white font-medium"> No hidden fees. Cancel anytime.</span>
          </motion.p>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-6 bg-black">
        <div className="container mx-auto max-w-3xl">
          <SectionHeading
            title="Frequently Asked Questions"
            subtitle="Everything you need to know about AI infrastructure deployment"
          />

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
                >
                  <span className="text-lg font-medium text-white">{faq.q}</span>
                  <motion.div
                    animate={{ rotate: openFaq === index ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  </motion.div>
                </button>
                {openFaq === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-6 text-gray-400"
                  >
                    {faq.a}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6 bg-gradient-to-br from-blue-600/20 via-black to-indigo-600/20">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Ready To Deploy AI Infrastructure?
            </h2>
            <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
              Join the enterprises already shipping at synthetic velocity. Your competitors won't wait—and neither should you.
            </p>
            <motion.a
              href="#pricing"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full text-lg font-medium shadow-xl shadow-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/60 transition-all"
            >
              Get Started Now
              <ArrowRight className="w-5 h-5" />
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-black border-t border-white/5">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              AI Infrastructure
            </div>
            <div className="flex gap-8 text-gray-400">
              <a href="#solution" className="hover:text-white transition-colors">
                Solution
              </a>
              <a href="#process" className="hover:text-white transition-colors">
                Process
              </a>
              <a href="#pricing" className="hover:text-white transition-colors">
                Pricing
              </a>
              <a href="#faq" className="hover:text-white transition-colors">
                FAQ
              </a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-white/5 text-center text-gray-500 text-sm">
            © 2026 AI Infrastructure. Deploy autonomous AI at enterprise scale.
          </div>
        </div>
      </footer>
    </div>
  );
}
