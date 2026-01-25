import { motion } from "framer-motion";
import { ArrowRight, Phone, CheckCircle2, Clock, TrendingUp, DollarSign } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface IndustryData {
  title: string;
  headline: string;
  subheadline: string;
  heroStat: { value: string; label: string };
  painPoints: string[];
  solutions: string[];
  roi: { metric: string; value: string }[];
  testimonial?: { quote: string; name: string; role: string };
  cta: string;
}

const industryData: Record<string, IndustryData> = {
  dental: {
    title: "AI Receptionist for Dental Practices",
    headline: "Stop Losing Patients to Voicemail",
    subheadline: "Your AI receptionist answers every call, books hygiene appointments, and confirms insurance—even during your busiest crown preps.",
    heroStat: { value: "34%", label: "of dental calls go unanswered" },
    painPoints: [
      "Front desk overwhelmed during peak hours",
      "New patient calls going to voicemail",
      "After-hours emergency calls missed",
      "Staff spending 2+ hours/day on scheduling calls"
    ],
    solutions: [
      "Instant answer for new patient inquiries—designed to improve lead conversion",
      "Automated appointment booking synced to your practice management system",
      "After-hours triage for dental emergencies",
      "Appointment reminders designed to reduce no-shows"
    ],
    roi: [
      { metric: "Potential new patients/month", value: "+15" },
      { metric: "Est. staff hours saved/week", value: "12" },
      { metric: "Potential annual revenue", value: "$180K*" }
    ],
    testimonial: {
      quote: "We were losing 8-10 new patient calls per week to voicemail. Now every call gets answered and booked.",
      name: "Dr. Sarah M.",
      role: "General Dentist, Texas"
    },
    cta: "See How It Works for Dental"
  },
  legal: {
    title: "AI Receptionist for Law Firms",
    headline: "Capture Every Lead. Bill More Hours.",
    subheadline: "Your AI receptionist qualifies potential clients, schedules consultations, and takes detailed intake—so you focus on billable work.",
    heroStat: { value: "$1,500", label: "average value of a missed legal lead" },
    painPoints: [
      "Partners answering their own phones",
      "Potential clients hanging up after 3 rings",
      "Intake forms incomplete or missing",
      "After-hours leads going to competitors"
    ],
    solutions: [
      "Professional intake screening with conflict check prompts",
      "24/7 availability captures after-hours accident and injury calls",
      "Detailed call summaries with matter type categorization",
      "Seamless calendar booking for consultations"
    ],
    roi: [
      { metric: "Potential lead capture rate", value: "+40%" },
      { metric: "Est. intake time saved/case", value: "15 min" },
      { metric: "Potential monthly revenue", value: "$25K*" }
    ],
    testimonial: {
      quote: "The AI captures more detail in intake than our previous receptionist. And it never puts someone on hold.",
      name: "James K.",
      role: "Managing Partner, PI Firm"
    },
    cta: "See How It Works for Legal"
  },
  "home-services": {
    title: "AI Receptionist for Home Services",
    headline: "Answer the Call. Win the Job.",
    subheadline: "Plumbing emergency at 2 AM? AC blowing hot in August? Your AI receptionist dispatches jobs while you sleep.",
    heroStat: { value: "78%", label: "of customers call the first 3 results" },
    painPoints: [
      "Missing calls while on job sites",
      "Losing emergency calls to competitors",
      "Can't afford full-time dispatcher",
      "Seasonal call spikes overwhelming staff"
    ],
    solutions: [
      "24/7 call answering captures emergency service requests",
      "Job type identification and urgency triage",
      "Automatic dispatch notifications to field techs",
      "Appointment booking with service area verification"
    ],
    roi: [
      { metric: "Potential emergency jobs/month", value: "+22" },
      { metric: "Avg. revenue per emergency call", value: "$450" },
      { metric: "Potential monthly revenue", value: "$10K*" }
    ],
    testimonial: {
      quote: "I was missing 5-6 calls a day on the truck. Now I get a text for every lead and can call back between jobs.",
      name: "Mike R.",
      role: "Owner, HVAC Company"
    },
    cta: "See How It Works for Home Services"
  },
  medical: {
    title: "AI Receptionist for Medical Practices",
    headline: "Your Patients Deserve Better Than Hold Music",
    subheadline: "Reduce wait times, automate appointment scheduling, and let your staff focus on in-office patient care.",
    heroStat: { value: "67%", label: "of patients prefer self-scheduling" },
    painPoints: [
      "Long hold times frustrating patients",
      "Staff burned out from phone volume",
      "Prescription refill requests bottlenecked",
      "No-shows costing thousands monthly"
    ],
    solutions: [
      "Instant call answering designed to reduce hold times",
      "Automated appointment scheduling with provider matching",
      "Prescription refill request routing",
      "Appointment reminders designed to reduce no-shows"
    ],
    roi: [
      { metric: "Potential patient satisfaction", value: "+28%" },
      { metric: "Est. staff phone time reduced", value: "60%" },
      { metric: "Potential no-show reduction", value: "35%*" }
    ],
    testimonial: {
      quote: "Our phones used to ring off the hook. Now patients get immediate help and my staff can actually do their jobs.",
      name: "Dr. Linda P.",
      role: "Family Medicine, Florida"
    },
    cta: "See How It Works for Medical"
  }
};

const IndustryTemplate = () => {
  const { industry } = useParams<{ industry: string }>();
  const data = industryData[industry || "dental"];
  const demoNumber = "+1 (888) 778-3091";

  if (!data) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Industry not found</h1>
          <Button asChild>
            <Link to="/">Return Home</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-primary font-medium mb-4"
            >
              {data.title}
            </motion.p>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              {data.headline}
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
            >
              {data.subheadline}
            </motion.p>

            {/* Hero Stat */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-4 bg-destructive/10 border border-destructive/30 rounded-2xl px-6 py-4 mb-8"
            >
              <TrendingUp className="w-8 h-8 text-destructive" />
              <div className="text-left">
                <div className="text-3xl font-bold text-destructive">{data.heroStat.value}</div>
                <div className="text-sm text-muted-foreground">{data.heroStat.label}</div>
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button variant="hero" size="xl" asChild>
                <Link to="/contact">
                  Book a Demo
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button variant="heroOutline" size="xl" asChild>
                <a href={`tel:${demoNumber.replace(/\s/g, '')}`}>
                  <Phone className="w-5 h-5" />
                  Hear It Live: {demoNumber}
                </a>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pain Points vs Solutions */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Pain Points */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card p-8 rounded-2xl border-destructive/30"
            >
              <h2 className="text-2xl font-bold mb-6 text-destructive">The Problem</h2>
              <ul className="space-y-4">
                {data.painPoints.map((point, i) => (
                  <li key={i} className="flex items-start gap-3 text-muted-foreground">
                    <span className="text-destructive">✗</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Solutions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card p-8 rounded-2xl border-emerald-500/30"
            >
              <h2 className="text-2xl font-bold mb-6 text-emerald-400">The Solution</h2>
              <ul className="space-y-4">
                {data.solutions.map((solution, i) => (
                  <li key={i} className="flex items-start gap-3 text-muted-foreground">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>{solution}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ROI Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Potential Results, <span className="gradient-text">Real Value</span>
            </h2>
            <p className="text-sm text-muted-foreground">*Based on client averages. Individual results may vary.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {data.roi.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-6 rounded-2xl text-center"
              >
                <div className="text-4xl font-bold text-primary mb-2">{item.value}</div>
                <div className="text-muted-foreground">{item.metric}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      {data.testimonial && (
        <section className="py-20 bg-card/30">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto text-center"
            >
              <blockquote className="text-2xl md:text-3xl font-medium mb-6 text-foreground">
                "{data.testimonial.quote}"
              </blockquote>
              <div className="text-muted-foreground">
                <span className="font-semibold text-foreground">{data.testimonial.name}</span>
                <span className="mx-2">•</span>
                <span>{data.testimonial.role}</span>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-3xl p-12 text-center max-w-3xl mx-auto"
          >
            <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Clock className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Ready in 48 Hours</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Book a 15-minute demo and see exactly how Clearway AI handles calls for your industry. No commitment required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="xl" asChild>
                <Link to="/contact">
                  {data.cta}
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default IndustryTemplate;
