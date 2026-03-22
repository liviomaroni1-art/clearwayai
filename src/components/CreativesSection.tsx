import React from "react";

interface Creative {
  url: string;
  alt: string;
}

const creatives: Creative[] = [
  {
    url: "https://www.vibiz.ai/media/org_3BIjs02VoMt4mvY0wjBCIq8fnv1/cd143fc0-da99-4e75-a84e-4be49410a553/85879f60-a606-4537-8f1d-d2ccbbb75b7f/v1-1774186032594.png",
    alt: "Nie wieder kalte Akquise",
  },
  {
    url: "https://www.vibiz.ai/media/org_3BIjs02VoMt4mvY0wjBCIq8fnv1/cd143fc0-da99-4e75-a84e-4be49410a553/64fad027-f451-452c-82fa-d8a6d8840339/v1-1774186016674.png",
    alt: "Wir verstehen Dienstleister",
  },
  {
    url: "https://www.vibiz.ai/media/org_3BIjs02VoMt4mvY0wjBCIq8fnv1/cd143fc0-da99-4e75-a84e-4be49410a553/7df9703a-cfe1-4675-9ba2-aafd934502ad/v1-1774186027653.png",
    alt: "Meta Ads auf Autopilot",
  },
  {
    url: "https://www.vibiz.ai/media/org_3BIjs02VoMt4mvY0wjBCIq8fnv1/cd143fc0-da99-4e75-a84e-4be49410a553/eb9cb143-ae7b-4668-8811-9954ac477641/v1-1774185951726.png",
    alt: "Leads kommen von allein",
  },
  {
    url: "https://www.vibiz.ai/media/org_3BIjs02VoMt4mvY0wjBCIq8fnv1/cd143fc0-da99-4e75-a84e-4be49410a553/750123a7-3b75-4271-bfd7-f4c9d3e848fa/v1-1774185970776.png",
    alt: "Planbare Leads fuer Steuerberater",
  },
];

function CreativeCard({ creative }: { creative: Creative }) {
  return (
    <div className="rounded-xl overflow-hidden border border-white/10 hover:border-primary/50 transition-all duration-300 hover:scale-105 shadow-lg">
      <img
        src={creative.url}
        alt={creative.alt}
        className="w-full h-auto object-cover"
        loading="lazy"
      />
    </div>
  );
}

function renderCreative(creative: Creative, index: number) {
  return <CreativeCard key={index} creative={creative} />;
}

const CreativesSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            So sehen unsere Kampagnen aus
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Beispiel-Anzeigen aus unserer laufenden Arbeit. Kundenkampagnen zeigen
            wir aus Datenschutzgruenden nicht.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 justify-items-center">
          {creatives.map(renderCreative)}
        </div>
      </div>
    </section>
  );
};

export default CreativesSection;
