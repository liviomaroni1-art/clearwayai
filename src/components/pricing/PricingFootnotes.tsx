import React from "react";
import { HelpCircle } from "lucide-react";

const PricingFootnotes: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto mb-12">
      <div className="bg-card/50 border border-border rounded-2xl px-6 py-5">
        <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-muted-foreground" />
          Plan Details
        </h4>
        <div className="grid sm:grid-cols-2 gap-x-8 gap-y-2 text-sm text-muted-foreground">
          <p>
            <strong className="text-foreground">Minutes:</strong> Total talk time across inbound & outbound AI calls. Fair-use policy applies.
          </p>
          <p>
            <strong className="text-foreground">Overage:</strong> $0.45/min beyond included (Enterprise: custom rates).
          </p>
          <p>
            <strong className="text-foreground">Additional numbers:</strong> $25/month per number.
          </p>
          <p>
            <strong className="text-foreground">SMS:</strong> Carrier fees may apply for high-volume messaging.
          </p>
          <p>
            <strong className="text-foreground">Cancellation:</strong> 3-month written notice required.
          </p>
          <p>
            <strong className="text-foreground">Annual billing:</strong> Save 10%—ask us for details.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PricingFootnotes;
