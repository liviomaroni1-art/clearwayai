import React from "react";
import { motion } from "framer-motion";
import { Clock, CheckCircle } from "lucide-react";
import { slaTiers } from "./PricingData";

const SLATable: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="max-w-4xl mx-auto mb-12"
    >
      <div className="bg-card/50 border border-border rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-border">
          <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" />
            Service Level Agreements
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Response and resolution times by plan tier
          </p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Tier
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Plan
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  First Response
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Resolution Time
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {slaTiers.map((sla, index) => (
                <tr key={sla.tier} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 text-sm font-medium ${
                      index === 3 ? 'text-primary' : 
                      index === 2 ? 'text-amber-500' : 
                      index === 1 ? 'text-violet-400' : 
                      'text-foreground'
                    }`}>
                      <CheckCircle className="w-4 h-4" />
                      {sla.tier}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {sla.plan}
                  </td>
                  <td className="px-6 py-4 text-sm text-foreground font-medium">
                    {sla.firstResponse}
                  </td>
                  <td className="px-6 py-4 text-sm text-foreground font-medium">
                    {sla.resolution}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

export default SLATable;
