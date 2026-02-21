import { motion } from "framer-motion";
import { ArrowRight, Phone, CheckCircle2, Clock, TrendingUp, Wrench, Flame, Droplets, Zap, Shield, Calendar, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import StructuredData from "@/components/StructuredData";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { trackEvent } from "@/lib/analytics";

const demoNumber = "+1 (888) 778-3091";

const painPoints = [
  "Missing calls while you're on a job site or under a house",
  "Emergency calls at 2 AM going straight to voicemail",
  "Losing $500+ jobs to the competitor who picks up first",
  "Can't afford a full-time dispatcher or office manager",
  "Seasonal spikes overwhelming your one-person front desk",
  "No idea how many calls you're actually missing per week",
];

const solutions = [
  { title: "24/7 call answering — even from the truck", description: "AI picks up in under 2 seconds, day or night. No more missed emergency calls." },
  { title: "Job type & urgency triage", description: "The AI identifies whether it's a burst pipe or a quote request and prioritizes accordingly." },
  { title: "Books straight into your calendar", description: "Syncs with Google Calendar, Outlook, or Housecall Pro. No double-booking." },
  { title: "Instant dispatch notifications", description: "Get a text with caller details, job type, and address — ready to dispatch." },
  { title: "Service area verification", description: "AI confirms the caller is in your coverage zone before booking." },
  { title: "30+ languages", description: "Serve Spanish-speaking and multilingual households naturally." },
];

const metrics = [
  { value: "+22", label: "More emergency jobs captured/month" },
  { value: "$450", label: "Average revenue per emergency call" },
  { value: "15h", label: "Staff hours saved per week" },
  { value: "<2s", label: "Average pickup time" },
];

const testimonials = [
  {
    quote: "I was missing 5-6 calls a day on the truck. Now I get a text for every lead and can call back between jobs.",
    name: "Mike R.",
    role: "Owner, HVAC Company",
  },
  {
    quote: "We picked up 22 more emergency jobs in the first month. The AI handles after-hours better than our old answering service.",
    name: "Carlos D.",
    role: "Owner, Plumbing Co.",
  },
];

const faqs = [
  {
    question: "What types of home service businesses does this work for?",
    answer: "Plumbing, HVAC, electrical, roofing, general contracting, landscaping, pest control, garage doors, appliance repair — any trade that relies on inbound calls for job bookings.",
  },
  {
    question: "Can the AI handle emergency calls differently?",
    answer: "Yes. It triages by urgency — a burst pipe at midnight gets treated differently than a quote request. High-urgency calls trigger instant notifications to your on-call tech.",
  },
  {
    question: "What if I'm on a job and can't take the dispatch notification?",
    answer: "The AI books the appointment, sends you a text summary, and can forward urgent calls to a backup number. Nothing falls through the cracks.",
  },
  {
    question: "Does it work with Housecall Pro / ServiceTitan?",
    answer: "We integrate natively with Google Calendar and Outlook. Housecall Pro and ServiceTitan are available via Zapier or n8n. We set everything up for you.",
  },
  {
    question: "How much does it cost compared to an answering service?",
    answer: "Plans start at $1,500/month — significantly less than hiring a dispatcher ($3,500-$4,500/month) and more reliable than a traditional answering service. Plus, our AI never calls in sick.",
  },
  {
    question: "Can I keep my existing business number?",
    answer: "Yes. We set up call forwarding from your current number. Your customers won't notice anything different — calls just get answered faster.",
  },
];

const trades = [
  { icon: Droplets, name: "Plumbing" },
  { icon: Flame, name: "HVAC" },
  { icon: Zap, name: "Electrical" },
  { icon: Wrench, name: "General Contracting" },
];

const HomeServices = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="AI Receptionist for Plumbers, HVAC & Home Services | Clearway AI"
        description="Clearway AI answers plumbing, HVAC, and contractor calls 24/7 — even from the job site. Capture every emergency lead, book jobs automatically, and stop losing customers to voicemail."
        canonical="https://clearwayai.co/home-services"
      />
      <StructuredData type="organization" />
      <StructuredData type="service" />
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative pt-28 md:pt-36 pb-16 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Trust badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm mb-8"
            >
              <span className="text-primary font-medium">Trusted by plumbers, HVAC pros & contractors</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] mb-5 text-foreground"
            >
              Every Emergency Call Answered.
              <br />
              <span className="gradient-text">Every Job Booked.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed"
            >
              AI receptionist that picks up in under 2 seconds — 24/7 — triages emergencies, and books jobs straight into your calendar. Even when you're on the truck.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-6"
            >
              <Button
                variant="hero"
                size="lg"
                className="w-full sm:w-auto min-h-[52px] btn-glow hover:scale-[1.03] transition-all px-8"
                asChild
              >
                <Link
                  to="/contact"
                  onClick={() => trackEvent({ event_name: "cta_click", event_category: "cta", metadata: { location: "home-services-hero", label: "Book Your Free Demo" } })}
                >
                  Book Your Free Demo
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <a
                href={`tel:${demoNumber.replace(/\s/g, '')}`}
                className="inline-flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors min-h-[48px] border border-border/50 rounded-full px-6 hover:border-primary/30"
              >
                <Phone className="w-4 h-4" />
                Hear the AI Live: {demoNumber}
              </a>
            </motion.div>

            {/* Trust microcopy */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-12"
            >
              {["Live in ~72 hours", "No long-term contract", "Save 15+ hours/week"].map((item) => (
                <span key={item} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                  {item}
                </span>
              ))}
            </motion.div>

            {/* Trade badges */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap justify-center gap-3"
            >
              {trades.map((trade) => (
                <div key={trade.name} className="flex items-center gap-2 px-4 py-2 bg-muted/30 rounded-full text-xs text-muted-foreground">
                  <trade.icon className="w-3.5 h-3.5 text-primary" />
                  {trade.name}
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── PAIN STAT ── */}
      <section className="py-10 md:py-14">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto glass-card rounded-2xl p-6 md:p-8 flex items-center gap-5 border-destructive/20"
          >
            <div className="w-14 h-14 rounded-xl bg-destructive/10 flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-7 h-7 text-destructive" />
            </div>
            <div>
              <p className="text-3xl font-bold text-destructive">78%</p>
              <p className="text-sm text-muted-foreground">of customers call the first 3 results — and hire whoever picks up first.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── PAIN POINTS ── */}
      <section className="py-16 md:py-24 bg-card/30">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 text-foreground">
              Sound <span className="gradient-text">Familiar?</span>
            </h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {painPoints.map((point, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="glass-card p-4 rounded-xl border-destructive/10"
              >
                <p className="text-sm text-muted-foreground flex items-start gap-2">
                  <span className="text-destructive mt-0.5">✗</span>
                  {point}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SOLUTIONS ── */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 text-foreground">
              How Clearway AI <span className="gradient-text">Fixes It</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Your AI dispatcher — always on, never on break.
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto">
            {solutions.map((sol, i) => (
              <motion.div
                key={sol.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="glass-card p-5 rounded-xl hover:border-primary/30 transition-colors"
              >
                <div className="flex items-start gap-2.5 mb-2">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-foreground text-sm">{sol.title}</h3>
                </div>
                <p className="text-xs text-muted-foreground ml-7">{sol.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── METRICS ── */}
      <section className="py-16 md:py-24 bg-card/30">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 text-foreground">
              Results You Can <span className="gradient-text">Measure</span>
            </h2>
            <p className="text-xs text-muted-foreground">*Based on client averages. Individual results may vary.</p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto">
            {metrics.map((m, i) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-5 rounded-xl text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-primary mb-1">{m.value}</div>
                <div className="text-xs text-muted-foreground">{m.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-6 md:p-8 rounded-2xl"
              >
                <MessageSquare className="w-5 h-5 text-primary/40 mb-3" />
                <blockquote className="text-base md:text-lg font-medium text-foreground leading-relaxed mb-4">
                  "{t.quote}"
                </blockquote>
                <div className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">{t.name}</span>
                  <span className="mx-2">·</span>
                  <span>{t.role}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-16 md:py-24 bg-card/30">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 text-foreground">
              Questions from <span className="gradient-text">Contractors</span>
            </h2>
          </motion.div>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`}>
                  <AccordionTrigger className="text-left text-sm md:text-base text-foreground hover:text-primary">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-3xl p-8 md:p-14 text-center max-w-3xl mx-auto relative overflow-hidden"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-primary/15 rounded-full blur-3xl" />
            <div className="relative z-10">
              <div className="w-14 h-14 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-5">
                <Clock className="w-7 h-7 text-primary" />
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-foreground">
                Live in ~72 Hours
              </h2>
              <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
                Book a free 15-minute call flow review. We'll map how calls hit your business and show you exactly where leads are slipping through.
              </p>
              <Button
                variant="hero"
                size="lg"
                className="min-h-[48px] md:min-h-[56px] btn-glow hover:scale-105 transition-all"
                asChild
              >
                <Link to="/contact">
                  Book Your Free Demo
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <div className="flex flex-wrap gap-3 mt-6 justify-center">
                {["15 minutes", "No obligation", "We reply within 24–48h"].map((p) => (
                  <div key={p} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    <span>{p}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomeServices;
