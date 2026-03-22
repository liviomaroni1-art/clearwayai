import React from "react";

interface Creative {
    url: string;
    alt: string;
}

const creatives: Creative[] = [
  {
        url: "https://www.vibiz.ai/media/org_3BIjs02VoMt4mvY0wjBCIq8fnv1/cd143fc0-da99-4e75-a84e-4be49410a553/ca69c4e7-8f55-4c0a-a090-70828fd13da6/v1-1774186025378.png",
        alt: "Vom Einzelkaempfer zum Champion",
  },
  {
        url: "https://www.vibiz.ai/media/org_3BIjs02VoMt4mvY0wjBCIq8fnv1/cd143fc0-da99-4e75-a84e-4be49410a553/d208e8f1-1644-4626-8ca6-ad521345d0e5/v1-1774185960903.png",
        alt: "Dominiere deinen Markt",
  },
  {
        url: "https://www.vibiz.ai/media/org_3BIjs02VoMt4mvY0wjBCIq8fnv1/cd143fc0-da99-4e75-a84e-4be49410a553/6847d5bd-d26e-45b2-a67a-d3b0d01225c1/v1-1774185963401.png",
        alt: "Deine Konkurrenz schlaeft noch",
  },
  {
        url: "https://www.vibiz.ai/media/org_3BIjs02VoMt4mvY0wjBCIq8fnv1/cd143fc0-da99-4e75-a84e-4be49410a553/96d39f6d-9007-4515-abfd-7052f12c71f7/v1-1774185973670.png",
        alt: "Endlich Zeit fuer Business",
  },
  {
        url: "https://www.vibiz.ai/media/org_3BIjs02VoMt4mvY0wjBCIq8fnv1/cd143fc0-da99-4e75-a84e-4be49410a553/49ae7619-7617-4bf1-afb1-82e6e1ed89f6/v1-1774185999675.png",
        alt: "DACH-Region Leadgeneration Experten",
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
          </div>div>
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
                                  </h2>h2>
                                  <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                                              Beispiel-Anzeigen aus unserer laufenden Arbeit. Kundenkampagnen zeigen
                                              wir aus Datenschutzgruenden nicht.
                                  </p>p>
                        </div>div>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 justify-items-center">
                          {creatives.map(renderCreative)}
                        </div>div>
                </div>div>
          </section>section>
        );
};

export default CreativesSection;</div>
