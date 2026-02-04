import React from "react";
import { Zap, Shield, TrendingUp } from "lucide-react";

const TrustBadges: React.FC = () => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
      <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium border border-primary/20">
        <Zap className="w-4 h-4" />
        Live in ~72 hours
      </div>
      <div className="inline-flex items-center gap-2 bg-success/10 text-success px-4 py-2 rounded-full text-sm font-medium border border-success/20">
        <Shield className="w-4 h-4" />
        99.9% uptime target
      </div>
      <div className="inline-flex items-center gap-2 bg-warning/10 text-warning px-4 py-2 rounded-full text-sm font-medium border border-warning/20">
        <TrendingUp className="w-4 h-4" />
        Avg. 8+ hours/week saved
      </div>
    </div>
  );
};

export default TrustBadges;
