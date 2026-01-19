import { useState } from "react";
import { motion } from "framer-motion";
import { Calculator, Phone, ArrowRight, TrendingUp, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Link } from "react-router-dom";

const CostCalculator = () => {
  const [callsPerDay, setCallsPerDay] = useState([15]);
  const [avgCallValue, setAvgCallValue] = useState([400]);
  const [missedCallRate, setMissedCallRate] = useState([35]);

  const monthlyMissedCalls = callsPerDay[0] * 30 * (missedCallRate[0] / 100);
  const monthlyLostRevenue = monthlyMissedCalls * avgCallValue[0];
  const yearlyLostRevenue = monthlyLostRevenue * 12;
  
  // Compare with Clearway AI cost (CHF 2,500/mo = CHF 30,000/yr)
  const clearwayYearlyCost = 30000;
  const netSavings = yearlyLostRevenue - clearwayYearlyCost;
  const roi = Math.round((netSavings / clearwayYearlyCost) * 100);

  // Quick preset buttons for common scenarios
  const presets = [
    { label: "Solo Practice", calls: 8, value: 300, missed: 25 },
    { label: "Small Clinic", calls: 20, value: 450, missed: 35 },
    { label: "Law Firm", calls: 15, value: 800, missed: 30 },
    { label: "Agency", calls: 30, value: 350, missed: 40 },
  ];

  const applyPreset = (preset: typeof presets[0]) => {
    setCallsPerDay([preset.calls]);
    setAvgCallValue([preset.value]);
    setMissedCallRate([preset.missed]);
  };

  return (
    <section id="calculator" className="py-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            <Calculator className="w-4 h-4" />
            ROI Calculator
          </div>
          <h2 className="text-2xl md:text-4xl font-bold mb-4">
            Calculate Your <span className="gradient-text">Annual Savings</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            See exactly how much you'll save by replacing missed calls with an AI receptionist that works 24/7.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-4xl mx-auto"
        >
          <div className="glass-card rounded-2xl p-6 md:p-10">
            {/* Quick Presets - Mobile Friendly */}
            <div className="mb-8">
              <p className="text-sm text-muted-foreground mb-3 text-center">Quick presets for your industry:</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {presets.map((preset) => (
                  <button
                    key={preset.label}
                    onClick={() => applyPreset(preset)}
                    className="px-4 py-3 text-sm font-medium bg-muted/50 hover:bg-primary/20 hover:text-primary rounded-xl transition-colors border border-border/50 min-h-[48px]"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-8">
              {/* Calls per day */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="text-sm font-medium text-foreground">
                    Inbound calls per day
                  </label>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => setCallsPerDay([Math.max(1, callsPerDay[0] - 1)])}
                      className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="text-lg font-bold text-primary w-12 text-center">{callsPerDay[0]}</span>
                    <button 
                      onClick={() => setCallsPerDay([Math.min(100, callsPerDay[0] + 1)])}
                      className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <Slider
                  value={callsPerDay}
                  onValueChange={setCallsPerDay}
                  min={1}
                  max={100}
                  step={1}
                  className="w-full"
                />
              </div>

              {/* Average call value */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="text-sm font-medium text-foreground">
                    Average value per lead/booking
                  </label>
                  <span className="text-lg font-bold text-primary">${avgCallValue[0]}</span>
                </div>
                <Slider
                  value={avgCallValue}
                  onValueChange={setAvgCallValue}
                  min={100}
                  max={2000}
                  step={50}
                  className="w-full"
                />
              </div>

              {/* Missed call rate */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="text-sm font-medium text-foreground">
                    Estimated missed call rate
                  </label>
                  <span className="text-lg font-bold text-primary">{missedCallRate[0]}%</span>
                </div>
                <Slider
                  value={missedCallRate}
                  onValueChange={setMissedCallRate}
                  min={10}
                  max={60}
                  step={5}
                  className="w-full"
                />
              </div>

              {/* Results */}
              <div className="border-t border-border pt-8 mt-8">
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
                  <div className="bg-muted/30 rounded-xl p-4">
                    <p className="text-xs text-muted-foreground mb-1">Missed Calls/Month</p>
                    <p className="text-2xl font-bold text-foreground">
                      {Math.round(monthlyMissedCalls)}
                    </p>
                  </div>
                  <div className="bg-red-500/10 rounded-xl p-4">
                    <p className="text-xs text-muted-foreground mb-1">Lost Revenue/Year</p>
                    <p className="text-2xl font-bold text-red-400">
                      ${yearlyLostRevenue.toLocaleString()}
                    </p>
                  </div>
                  <div className="bg-muted/30 rounded-xl p-4">
                    <p className="text-xs text-muted-foreground mb-1">Clearway AI Cost/Year</p>
                    <p className="text-2xl font-bold text-foreground">
                      ${clearwayYearlyCost.toLocaleString()}
                    </p>
                  </div>
                  <div className="bg-emerald-500/10 rounded-xl p-4">
                    <p className="text-xs text-muted-foreground mb-1">ROI</p>
                    <p className="text-2xl font-bold text-emerald-400">
                      {roi > 0 ? `+${roi}%` : `${roi}%`}
                    </p>
                  </div>
                </div>

                {/* Net Savings Highlight */}
                <motion.div 
                  className="mt-8 p-6 bg-gradient-to-r from-emerald-500/20 to-primary/20 rounded-2xl text-center border border-emerald-500/30"
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <p className="text-sm text-foreground mb-2 flex items-center justify-center gap-2">
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                    Your net annual savings with Clearway AI
                  </p>
                  <p className="text-4xl md:text-5xl font-extrabold text-emerald-400">
                    ${Math.max(0, netSavings).toLocaleString()}/year
                  </p>
                  {netSavings > 0 && (
                    <p className="text-sm text-muted-foreground mt-2">
                      That's ${Math.round(netSavings / 12).toLocaleString()}/month in your pocket
                    </p>
                  )}
                </motion.div>

                {/* CTA */}
                <div className="mt-8 text-center">
                  <Button variant="hero" size="xl" className="w-full sm:w-auto min-h-[48px]" asChild>
                    <Link to="/contact">
                      Start Saving ${Math.max(0, netSavings).toLocaleString()}/year
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </Button>
                  <p className="text-xs text-muted-foreground mt-3">
                    Free demo • Live in 72 hours • 3-month cancellation notice
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CostCalculator;
