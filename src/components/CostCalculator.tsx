import { useState } from "react";
import { motion } from "framer-motion";
import { Calculator, ArrowRight, TrendingUp, Minus, Plus, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Link } from "react-router-dom";

const CostCalculator = () => {
  const [callsPerDay, setCallsPerDay] = useState([15]);
  const [avgCallValue, setAvgCallValue] = useState([400]);
  const [missedCallRate, setMissedCallRate] = useState([35]);
  const [conversionRate, setConversionRate] = useState([30]);

  // Calculate with conversion rate factored in
  const monthlyMissedCalls = callsPerDay[0] * 30 * (missedCallRate[0] / 100);
  const potentialRecoveredCalls = monthlyMissedCalls * (conversionRate[0] / 100);
  const monthlyRecoveredRevenue = potentialRecoveredCalls * avgCallValue[0];
  const yearlyRecoveredRevenue = monthlyRecoveredRevenue * 12;
  
  // Conservative, Expected, Aggressive scenarios
  const scenarios = {
    conservative: yearlyRecoveredRevenue * 0.6,
    expected: yearlyRecoveredRevenue,
    aggressive: yearlyRecoveredRevenue * 1.4
  };
  
  // Clearway cost range
  const clearwayCostLow = 18000; // $1,500/mo
  const clearwayCostMid = 30000; // $2,500/mo

  // Quick preset buttons
  const presets = [
    { label: "Solo Practice", calls: 8, value: 300, missed: 25, conversion: 25 },
    { label: "Small Clinic", calls: 20, value: 450, missed: 35, conversion: 30 },
    { label: "Law Firm", calls: 15, value: 800, missed: 30, conversion: 35 },
    { label: "Agency", calls: 30, value: 350, missed: 40, conversion: 25 },
  ];

  const applyPreset = (preset: typeof presets[0]) => {
    setCallsPerDay([preset.calls]);
    setAvgCallValue([preset.value]);
    setMissedCallRate([preset.missed]);
    setConversionRate([preset.conversion]);
  };

  return (
    <section id="calculator" className="py-20 bg-card/30">
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
            ROI Estimator
          </div>
          <h2 className="text-2xl md:text-4xl font-bold mb-4 text-foreground">
            Estimate Your <span className="gradient-text">Potential Recovery</span> From Missed Calls
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Adjust the sliders to match your business. We show conservative, expected, and aggressive scenarios.
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
            {/* Quick Presets */}
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
                    Calls per day
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

              {/* Estimated missed call rate */}
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

              {/* Average value per booking */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="text-sm font-medium text-foreground">
                    Average value per booking
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

              {/* Conversion rate */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="text-sm font-medium text-foreground flex items-center gap-2">
                    Conversion rate (answered calls → booked)
                    <span className="text-xs text-muted-foreground">(default 30%)</span>
                  </label>
                  <span className="text-lg font-bold text-primary">{conversionRate[0]}%</span>
                </div>
                <Slider
                  value={conversionRate}
                  onValueChange={setConversionRate}
                  min={10}
                  max={60}
                  step={5}
                  className="w-full"
                />
              </div>

              {/* Results - Scenarios */}
              <div className="border-t border-border pt-8 mt-8">
                <h3 className="text-lg font-semibold text-center mb-6 text-foreground">Estimated Annual Recovery</h3>
                
                <div className="grid sm:grid-cols-3 gap-4 text-center mb-8">
                  <div className="bg-muted/30 rounded-xl p-4">
                    <p className="text-xs text-muted-foreground mb-1">Conservative</p>
                    <p className="text-2xl font-bold text-foreground">
                      ~${Math.round(scenarios.conservative).toLocaleString()}
                    </p>
                  </div>
                  <div className="bg-primary/10 rounded-xl p-4 border border-primary/30">
                    <p className="text-xs text-primary mb-1">Expected</p>
                    <p className="text-2xl font-bold text-primary">
                      ~${Math.round(scenarios.expected).toLocaleString()}
                    </p>
                  </div>
                  <div className="bg-muted/30 rounded-xl p-4">
                    <p className="text-xs text-muted-foreground mb-1">Aggressive</p>
                    <p className="text-2xl font-bold text-foreground">
                      ~${Math.round(scenarios.aggressive).toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Cost comparison */}
                <div className="bg-muted/20 rounded-xl p-4 mb-6">
                  <p className="text-sm text-center text-muted-foreground">
                    Clearway AI starts at ${(clearwayCostLow / 12).toLocaleString()}/mo (~${clearwayCostLow.toLocaleString()}/yr)
                  </p>
                </div>

                {/* Disclaimer */}
                <div className="flex items-start gap-2 bg-amber-500/10 border border-amber-500/20 rounded-lg p-3 mb-6">
                  <Info className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-muted-foreground">
                    Estimates are based on your inputs and typical conversion ranges. Actual results vary based on your industry, call quality, and follow-up process.
                  </p>
                </div>

                {/* CTA */}
                <div className="text-center">
                  <Button variant="hero" size="xl" className="w-full sm:w-auto min-h-[48px] btn-glow" asChild>
                    <Link to="/contact">
                      Book a Demo
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </Button>
                  <p className="text-xs text-muted-foreground mt-3">
                    Get a free call audit • 15 minutes • No obligation
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
