import { useState } from "react";
import { motion } from "framer-motion";
import { Calculator, Phone, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Link } from "react-router-dom";

const CostCalculator = () => {
  const [callsPerDay, setCallsPerDay] = useState([10]);
  const [avgCallValue, setAvgCallValue] = useState([300]);
  const [missedCallRate, setMissedCallRate] = useState([30]);

  const monthlyMissedCalls = callsPerDay[0] * 30 * (missedCallRate[0] / 100);
  const monthlyLostRevenue = monthlyMissedCalls * avgCallValue[0];
  const yearlyLostRevenue = monthlyLostRevenue * 12;

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
            Cost Calculator
          </div>
          <h2 className="text-2xl md:text-4xl font-bold mb-4">
            How Much Are <span className="gradient-text">Missed Calls</span> Costing You?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            See your potential savings with an AI receptionist that never misses a call.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-3xl mx-auto"
        >
          <div className="glass-card rounded-2xl p-8 md:p-10">
            <div className="space-y-8">
              {/* Calls per day */}
              <div>
                <div className="flex justify-between mb-3">
                  <label className="text-sm font-medium text-foreground">
                    Inbound calls per day
                  </label>
                  <span className="text-sm font-bold text-primary">{callsPerDay[0]} calls</span>
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
                <div className="flex justify-between mb-3">
                  <label className="text-sm font-medium text-foreground">
                    Average value per lead/booking
                  </label>
                  <span className="text-sm font-bold text-primary">${avgCallValue[0]}</span>
                </div>
                <Slider
                  value={avgCallValue}
                  onValueChange={setAvgCallValue}
                  min={50}
                  max={2000}
                  step={50}
                  className="w-full"
                />
              </div>

              {/* Missed call rate */}
              <div>
                <div className="flex justify-between mb-3">
                  <label className="text-sm font-medium text-foreground">
                    Estimated missed call rate
                  </label>
                  <span className="text-sm font-bold text-primary">{missedCallRate[0]}%</span>
                </div>
                <Slider
                  value={missedCallRate}
                  onValueChange={setMissedCallRate}
                  min={5}
                  max={60}
                  step={5}
                  className="w-full"
                />
              </div>

              {/* Results */}
              <div className="border-t border-border pt-8 mt-8">
                <div className="grid md:grid-cols-3 gap-6 text-center">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Missed Calls/Month</p>
                    <p className="text-2xl font-bold text-foreground">
                      {Math.round(monthlyMissedCalls)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Lost Revenue/Month</p>
                    <p className="text-2xl font-bold text-destructive">
                      ${monthlyLostRevenue.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Lost Revenue/Year</p>
                    <p className="text-3xl font-bold text-destructive">
                      ${yearlyLostRevenue.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-primary/10 rounded-xl text-center">
                  <p className="text-sm text-foreground mb-1">
                    <Phone className="w-4 h-4 inline mr-2" />
                    With Clearway AI, you could recover up to
                  </p>
                  <p className="text-2xl font-bold text-primary">
                    ${yearlyLostRevenue.toLocaleString()}/year
                  </p>
                </div>

                <div className="mt-8 text-center">
                  <Button variant="hero" size="xl" asChild>
                    <Link to="/contact">
                      Get Your Custom Quote
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </Button>
                  <p className="text-xs text-muted-foreground mt-3">
                    Every business is different—we'll build a custom solution for your needs.
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
