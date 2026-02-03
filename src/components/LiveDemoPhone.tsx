import { motion } from "framer-motion";
import { Phone, Headphones, Volume2 } from "lucide-react";

interface LiveDemoPhoneProps {
  variant?: "hero" | "floating" | "compact";
}

const LiveDemoPhone = ({ variant = "hero" }: LiveDemoPhoneProps) => {
  const demoNumber = "+1 (888) 778-3091";
  
  if (variant === "floating") {
    return (
      <motion.a
        href={`tel:${demoNumber.replace(/\s/g, '')}`}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 flex items-center gap-2 md:gap-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-3 py-2.5 md:px-5 md:py-4 rounded-full shadow-2xl hover:shadow-emerald-500/30 hover:scale-105 transition-all"
      >
        <motion.div
          animate={{ rotate: [0, -10, 10, -10, 0] }}
          transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
        >
          <Phone className="w-4 h-4 md:w-5 md:h-5" />
        </motion.div>
        <div className="text-left hidden sm:block">
          <div className="text-xs font-medium opacity-90">Call Live Demo</div>
          <div className="text-sm font-bold">{demoNumber}</div>
        </div>
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="w-3 h-3 bg-white rounded-full"
        />
      </motion.a>
    );
  }

  if (variant === "compact") {
    return (
      <a
        href={`tel:${demoNumber.replace(/\s/g, '')}`}
        className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-sm hover:bg-emerald-500/30 transition-colors"
      >
        <Phone className="w-4 h-4 text-emerald-400" />
        <span className="text-emerald-400 font-medium">{demoNumber}</span>
      </a>
    );
  }

  // Hero variant - full featured
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.6 }}
      className="mt-10"
    >
      <div className="relative inline-block">
        {/* Pulse ring */}
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute -inset-4 bg-emerald-500/20 rounded-2xl blur-md"
        />
        
        <div className="relative glass-card border border-emerald-500/30 rounded-2xl p-6 md:p-8">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            {/* Icon section */}
            <div className="flex items-center justify-center w-16 h-16 bg-emerald-500/20 rounded-full">
              <motion.div
                animate={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
              >
                <Headphones className="w-8 h-8 text-emerald-400" />
              </motion.div>
            </div>

            {/* Content */}
            <div className="text-center sm:text-left flex-1">
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="w-2 h-2 bg-emerald-400 rounded-full"
                />
                <span className="text-xs text-emerald-400 font-semibold uppercase tracking-wider">
                  Live Demo Available 24/7
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Call now to hear our AI receptionist in action — Book an appointment live!
              </p>
              <a
                href={`tel:${demoNumber.replace(/\s/g, '')}`}
                className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-6 py-3 rounded-xl font-bold text-lg transition-all hover:scale-105 shadow-lg hover:shadow-emerald-500/30"
              >
                <Phone className="w-5 h-5" />
                {demoNumber}
                <Volume2 className="w-4 h-4 opacity-70" />
              </a>
            </div>
          </div>

          {/* What you'll hear */}
          <div className="mt-6 pt-6 border-t border-border/50">
            <p className="text-xs text-muted-foreground text-center">
              <span className="font-medium text-foreground">What you'll experience:</span>{" "}
              Professional greeting → Appointment booking → CRM sync → Confirmation SMS
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LiveDemoPhone;
