import React from "react";
import { HelpCircle } from "lucide-react";
import { billingRules } from "./PricingData";

const PricingFootnotes: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto mb-12">
      <div className="bg-card/50 border border-border rounded-2xl px-6 py-5">
        <h4 className="text-sm md:text-base font-semibold text-foreground mb-3 flex items-center gap-2">
          <HelpCircle className="w-4 h-4 md:w-5 md:h-5 text-muted-foreground" />
          Plan Details
        </h4>
        <div className="grid sm:grid-cols-2 gap-x-8 gap-y-2 md:gap-y-3 text-sm md:text-base text-muted-foreground">
          <p>
            <strong className="text-foreground">Minutes:</strong> Total talk time across inbound & outbound AI calls.
          </p>
          <p>
            <strong className="text-foreground">Overage:</strong> {billingRules.overageRate}/min beyond included (Enterprise: custom rates).
          </p>
          <p>
            <strong className="text-foreground">Additional numbers:</strong> $25/month per number.
          </p>
          <p>
            <strong className="text-foreground">SMS:</strong> Carrier fees may apply for high-volume messaging.
          </p>
          <p>
            <strong className="text-foreground">Cancellation:</strong> Rolling 90-day cancellation notice.
          </p>
          <p>
            <strong className="text-foreground">Annual billing:</strong> Save {billingRules.annualDiscount} on monthly fees.
          </p>
          <p>
            <strong className="text-foreground">Setup fee:</strong> Includes call flow design, integrations, knowledge base, testing, and go-live support.
          </p>
          <p>
            <strong className="text-foreground">Usage alert:</strong> Notification at {billingRules.usageWarning} of included minutes.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PricingFootnotes;
