import React from "react";
import { Zap, Shield, TrendingUp } from "lucide-react";

const TrustBadges: React.FC = () => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
      <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium border border-primary/20">
        <Zap className="w-4 h-4" />
        Live in 72 hours
      </div>
      <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-500 px-4 py-2 rounded-full text-sm font-medium border border-emerald-500/20">
        <Shield className="w-4 h-4" />
        99.9% uptime SLA
      </div>
      <div className="inline-flex items-center gap-2 bg-amber-500/10 text-amber-500 px-4 py-2 rounded-full text-sm font-medium border border-amber-500/20">
        <TrendingUp className="w-4 h-4" />
        Avg. 8+ hours/week saved
      </div>
    </div>
  );
};

export default TrustBadges;
