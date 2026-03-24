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

  const monthlyMissedCalls = callsPerDay[0] * 30 * (missedCallRate[0] / 100);
  const potentialRecoveredCalls = monthlyMissedCalls * (conversionRate[0] / 100);
  const monthlyRecoveredRevenue = potentialRecoveredCalls * avgCallValue[0];
  const yearlyRecoveredRevenue = monthlyRecoveredRevenue * 12;
  
  // Add reactivation estimate (conservative 15% of recovered revenue)
  const reactivationBonus = yearlyRecoveredRevenue * 0.15;
  const totalYearlyGrowth = yearlyRecoveredRevenue + reactivationBonus;
  
  const scenarios = {
    conservative: totalYearlyGrowth * 0.6,
    expected: totalYearlyGrowth,
    aggressive: totalYearlyGrowth * 1.4
  };
  
  const clearwayCostLow = 18000;

  const presets = [
    { label: "Solo Contractor", calls: 8, value: 300, missed: 25, conversion: 25 },
    { label: "Small Service Co.", calls: 20, value: 450, missed: 35, conversion: 30 },
    { label: "Multi-Truck Team", calls: 30, value: 500, missed: 40, conversion: 30 },
    { label: "Clinic / Office", calls: 25, value: 350, missed: 30, conversion: 35 },
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
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            <Calculator className="w-4 h-4" />
            Growth Calculator
          </div>
          <h2 className="text-2xl md:text-4xl font-bold mb-4 text-foreground">
            How Much Revenue Are You <span className="gradient-text">Leaving on the Table?</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            See what missed calls and forgotten customers are actually costing your business.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto mb-8"
        >
          <div className="grid grid-cols-3 gap-4 text-center">
            {[
              { step: "1", text: "Pick your business type or adjust sliders" },
              { step: "2", text: "See estimated revenue from captured leads + reactivation" },
              { step: "3", text: "Compare against the cost of the growth system" },
            ].map((item) => (
              <div key={item.step} className="flex flex-col items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-primary/20 text-primary text-xs font-bold flex items-center justify-center">{item.step}</span>
                <p className="text-xs text-muted-foreground">{item.text}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-4xl mx-auto"
        >
          <div className="glass-card rounded-2xl p-6 md:p-10">
            <div className="mb-8">
              <p className="text-sm text-muted-foreground mb-3 text-center">Quick presets for your business:</p>
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
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="text-sm font-medium text-foreground">Calls per day</label>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => setCallsPerDay([Math.max(1, callsPerDay[0] - 1)])}
                      aria-label="Decrease calls per day"
                      className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="text-lg font-bold text-primary w-12 text-center">{callsPerDay[0]}</span>
                    <button 
                      onClick={() => setCallsPerDay([Math.min(100, callsPerDay[0] + 1)])}
                      aria-label="Increase calls per day"
                      className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <Slider value={callsPerDay} onValueChange={setCallsPerDay} min={1} max={100} step={1} className="w-full" aria-label="Calls per day" />
              </div>

              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="text-sm font-medium text-foreground">Estimated missed call rate</label>
                  <span className="text-lg font-bold text-primary">{missedCallRate[0]}%</span>
                </div>
                <Slider value={missedCallRate} onValueChange={setMissedCallRate} min={10} max={60} step={5} className="w-full" aria-label="Missed call rate" />
              </div>

              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="text-sm font-medium text-foreground">Average value per job/booking</label>
                  <span className="text-lg font-bold text-primary">${avgCallValue[0]}</span>
                </div>
                <Slider value={avgCallValue} onValueChange={setAvgCallValue} min={100} max={2000} step={50} className="w-full" aria-label="Average value per job" />
              </div>

              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="text-sm font-medium text-foreground flex items-center gap-2">
                    Conversion rate (answered → booked)
                    <span className="text-xs text-muted-foreground">(default 30%)</span>
                  </label>
                  <span className="text-lg font-bold text-primary">{conversionRate[0]}%</span>
                </div>
                <Slider value={conversionRate} onValueChange={setConversionRate} min={10} max={60} step={5} className="w-full" aria-label="Conversion rate" />
              </div>

              <div className="border-t border-border pt-8 mt-8">
                <h3 className="text-lg font-semibold text-center mb-2 text-foreground">Estimated Revenue You Could Recover</h3>
                <p className="text-xs text-muted-foreground text-center mb-6">Includes missed call capture + customer reactivation estimate</p>
                
                <div className="grid sm:grid-cols-3 gap-4 text-center mb-8">
                  <div className="bg-muted/30 rounded-xl p-4">
                    <p className="text-xs text-muted-foreground mb-1">Conservative</p>
                    <p className="text-2xl font-bold text-foreground">
                      ~${Math.round(scenarios.conservative).toLocaleString()}<span className="text-sm font-normal text-muted-foreground">/yr</span>
                    </p>
                  </div>
                  <div className="bg-primary/10 rounded-xl p-4 border border-primary/30">
                    <p className="text-xs text-primary mb-1">Expected</p>
                    <p className="text-2xl font-bold text-primary">
                      ~${Math.round(scenarios.expected).toLocaleString()}<span className="text-sm font-normal text-primary/70">/yr</span>
                    </p>
                  </div>
                  <div className="bg-muted/30 rounded-xl p-4">
                    <p className="text-xs text-muted-foreground mb-1">Aggressive</p>
                    <p className="text-2xl font-bold text-foreground">
                      ~${Math.round(scenarios.aggressive).toLocaleString()}<span className="text-sm font-normal text-muted-foreground">/yr</span>
                    </p>
                  </div>
                </div>

                <div className="bg-muted/20 rounded-xl p-4 mb-6">
                  <p className="text-sm text-center text-muted-foreground">
                    Clearway AI growth system starts at ${(clearwayCostLow / 12).toLocaleString()}/mo (~${clearwayCostLow.toLocaleString()}/yr)
                  </p>
                </div>

                <div className="flex items-start gap-2 bg-amber-500/10 border border-amber-500/20 rounded-lg p-3 mb-6">
                  <Info className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-muted-foreground">
                    Estimates are based on your inputs and typical conversion ranges. Actual results vary by industry, call quality, and follow-up process.
                  </p>
                </div>

                <div className="text-center">
                  <Button variant="hero" size="xl" className="w-full sm:w-auto min-h-[48px] btn-glow" asChild>
                    <Link to="https://funnel.clearwayai.co/">
                      Book Your Free Growth Audit
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </Button>
                  <p className="text-xs text-muted-foreground mt-3">
                    15 minutes • We'll map your growth opportunities • No obligation
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
