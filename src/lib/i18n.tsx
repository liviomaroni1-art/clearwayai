import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'de' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  de: {
    // Navbar
    'nav.product': 'Produkt',
    'nav.solutions': 'Lösungen',
    'nav.pricing': 'Preise',
    'nav.results': 'Ergebnisse',
    'nav.bookACall': 'Gespräch buchen',
    'nav.contact': 'Kontakt',

    // Hero
    'hero.headline1': 'Leads. Gespräche. Wachstum.',
    'hero.headline2': 'Automatisiert.',
    'hero.subtitle': 'Clearway AI übernimmt Ihre Meta-Anzeigen, den Funnel und das automatisierte Follow-up – und liefert Ihnen qualifizierte Leads oder gebuchte Verkaufsgespräche. Komplett done-for-you.',
    'hero.cta': 'Demo buchen',
    'hero.seeHow': 'Produkt ansehen',
    'hero.industry1': 'Zahnarztpraxen',
    'hero.industry2': 'Steuerberater',
    'hero.industry3': 'Kanzleien',
    'hero.industry4': 'Agenturen',
    'hero.industry5': 'Coaches',
    'hero.industry6': 'Immobilienmakler',
    'hero.industry7': 'IT-Dienstleister',
    'hero.process.ad': 'Meta-Anzeige',
    'hero.process.lead': 'Qualifizierter Lead',
    'hero.process.call': 'Gebuchtes Gespräch',
    'hero.process.close': 'Abschluss',
    'hero.stats.companies': 'Done-for-you System',
    'hero.stats.leads': 'DACH-Region',
    'hero.stats.rate': 'Für Dienstleister',

    // Social Proof
    'proof.heading': 'Ergebnisse aus aktuellen Kampagnen',
    'proof.r1.metric': '37',
    'proof.r1.desc': 'Gebuchte Gespräche in 30 Tagen',
    'proof.r1.label': 'Steuerberatungskanzlei, DACH',
    'proof.r2.metric': '€23',
    'proof.r2.desc': 'Durchschnittliche Kosten pro qualifiziertem Lead',
    'proof.r2.label': 'Handwerksbetrieb, Schweiz',
    'proof.r3.metric': '4.2×',
    'proof.r3.desc': 'Return on Ad Spend (ROAS) nach 60 Tagen',
    'proof.r3.label': 'Coaching-Unternehmen, Deutschland',

    // Trusted By
    'trusted.title': 'Entwickelt für Dienstleister in der DACH-Region',
    'trusted.subtitle': 'Von Handwerkern über Kanzleien bis hin zu Coaching-Unternehmen – wir helfen Service-Unternehmen, planbar neue Kunden zu gewinnen.',
    'trusted.link': 'Mehr erfahren',
    'trusted.industry1': 'Handwerk',
    'trusted.industry2': 'Beratung',
    'trusted.industry3': 'Kanzleien',
    'trusted.industry4': 'Agenturen',
    'trusted.industry5': 'Coaching',
    'trusted.industry6': 'Immobilien',
    'trusted.industry7': 'IT & Software',

    // Features
    'features.title': 'Alles, was Sie für planbare Leads brauchen',
    'features.subtitle': 'Eine vollständig integrierte Plattform, die jeden Schritt Ihrer Lead-Generierung automatisiert – von der Anzeige bis zum gebuchten Termin.',
    'features.f1.title': 'KI-Qualifizierung',
    'features.f1.desc': 'Unsere KI bewertet und qualifiziert jeden eingehenden Lead automatisch – damit nur wirklich kaufbereite Kontakte zu Ihnen gelangen.',
    'features.f2.title': 'Meta-Ads-Automatisierung',
    'features.f2.desc': 'Automatisierte Meta-Kampagnen, die kontinuierlich optimiert werden – für maximale Reichweite bei minimalen Kosten pro Lead.',
    'features.f3.title': 'Kalender-Integration',
    'features.f3.desc': 'Qualifizierte Leads buchen direkt einen Termin in Ihren Kalender. Kein manuelles Koordinieren, keine Reibungsverluste.',
    'features.f4.title': 'Echtzeit-Dashboard',
    'features.f4.desc': 'Verfolgen Sie Kampagnenleistung, Lead-Kosten und Conversion-Raten in Echtzeit – vollständig transparent und auf einen Blick.',
    'features.f5.title': 'CRM-Sync',
    'features.f5.desc': 'Alle Leads werden automatisch mit Ihrem bestehenden CRM synchronisiert – keine Doppelarbeit, keine verlorenen Kontakte.',
    'features.f6.title': 'Multi-Channel Follow-up',
    'features.f6.desc': 'Automatisierte E-Mail- und SMS-Sequenzen halten Leads warm und steigern die Buchungsrate – ohne manuellen Aufwand Ihrerseits.',

    // How It Works
    'how.title': 'So funktioniert es',
    'how.subtitle': 'Ein einfaches, done-for-you System. Wir kümmern uns um alles – Sie schließen nur die Deals ab.',
    'how.step1.title': 'Wir starten Ihre Meta-Anzeigen',
    'how.step1.desc': 'Wir erstellen und schalten gezielte Meta-Kampagnen, die Ihr Angebot vor die richtigen Entscheidungsträger bringen.',
    'how.step2.title': 'Leads landen in unserem Funnel',
    'how.step2.desc': 'Interessierte Personen klicken auf unsere hochkonvertierende Landingpage und füllen ein kurzes Qualifikationsformular aus.',
    'how.step3.title': 'Automatisiertes Follow-up & Qualifikation',
    'how.step3.desc': 'Unser KI-gestütztes Follow-up-System kontaktiert Leads automatisch per E-Mail und SMS, qualifiziert sie und bucht Termine in Ihren Kalender.',
    'how.step4.title': 'Kontinuierliche Optimierung',
    'how.step4.desc': 'Wir analysieren die Kampagnendaten fortlaufend und optimieren Anzeigen, Zielgruppen und Funnel – damit Ihre Kosten pro Lead sinken.',

    // Benefits
    'benefits.title': 'Hören Sie auf, Leads zu jagen. Fangen Sie an, sie abzuschließen.',
    'benefits.subtitle': 'Die meisten Unternehmer verschwenden Stunden mit Kaltakquise und Follow-ups, die ins Leere laufen. Clearway AI eliminiert all das – damit Sie Ihre Zeit für das einsetzen können, was wirklich zählt: Deals abschließen.',
    'benefits.b1.title': 'Done for you, von A bis Z',
    'benefits.b1.desc': 'Wir kümmern uns um Anzeigen, Funnel und automatisiertes Follow-up. Sie müssen nichts anfassen – empfangen Sie einfach Ihre Leads oder gebuchten Gespräche.',
    'benefits.b2.title': 'Nur qualifizierte Leads erreichen Sie',
    'benefits.b2.desc': 'Jeder Lead hat echtes Interesse gezeigt und unser Formular ausgefüllt. Keine Zeitverschwendung mit Personen, die noch nicht kaufbereit sind.',
    'benefits.b3.title': 'Konstante, planbare Pipeline',
    'benefits.b3.desc': 'Schluss mit der Abhängigkeit von Empfehlungen und Kaltakquise. Erhalten Sie einen stetigen Strom neuer Geschäftsanfragen.',
    'benefits.b4.title': 'Vollständig transparent, keine Überraschungen',
    'benefits.b4.desc': 'Sie sehen genau, woher jeder Lead kommt und was er gekostet hat. Keine Black Box, kein Rätselraten – nur klare Ergebnisse.',

    // Fit Section
    'fit.title': 'Für diese Branchen arbeiten wir',
    'fit.subtitle': 'Wir arbeiten am besten mit Dienstleistungsunternehmen, die ein bewährtes Angebot haben und planbar neue Kunden gewinnen möchten.',
    'fit.good.heading': 'Passt gut zu uns',
    'fit.notgood.heading': 'Passt nicht zu uns',
    'fit.good.1': 'Zahnarztpraxen & Kliniken – die ihren Behandlungskalender füllen möchten',
    'fit.good.2': 'Steuerberater & Kanzleien – die planbar neue Mandanten gewinnen wollen',
    'fit.good.3': 'Coaches & Trainer – die mehr gebuchte Erstgespräche benötigen',
    'fit.good.4': 'Agenturen & Beratungen – die einen stabilen Lead-Strom aufbauen möchten',
    'fit.good.5': 'Handwerksbetriebe – die regionale Aufträge über Online-Werbung gewinnen wollen',
    'fit.bad.1': 'Sie haben noch kein klares Angebot oder keine Dienstleistung zu verkaufen',
    'fit.bad.2': 'Sie suchen rein organisches Wachstum ohne Werbebudget',
    'fit.bad.3': 'Sie möchten Kampagnen selbst schalten – Sie brauchen nur einen Kurs',
    'fit.bad.4': 'Sie erwarten garantierte Ergebnisse unabhängig von Markt oder Budget',

    // Pricing
    'pricing.title': 'Transparente Preise',
    'pricing.subtitle': 'Keine versteckten Kosten, keine bösen Überraschungen. Wählen Sie das Paket, das zu Ihrer Wachstumsphase passt.',
    'pricing.starter.name': 'Starter',
    'pricing.starter.price': '497',
    'pricing.starter.desc': 'Ideal für Unternehmen, die mit automatisierter Lead-Generierung starten möchten.',
    'pricing.starter.f1': 'Meta-Kampagnen-Setup & Management',
    'pricing.starter.f2': 'KI-gestütztes Lead-Qualifizierungs-Formular',
    'pricing.starter.f3': 'Automatisiertes E-Mail-Follow-up',
    'pricing.starter.f4': 'Monatliches Performance-Reporting',
    'pricing.growth.name': 'Growth',
    'pricing.growth.price': '997',
    'pricing.growth.desc': 'Für wachsende Unternehmen, die eine vollständig automatisierte Lead-Pipeline aufbauen wollen.',
    'pricing.growth.badge': 'Beliebteste Wahl',
    'pricing.growth.f1': 'Alles aus Starter, plus:',
    'pricing.growth.f2': 'Kalender-Integration & automatische Terminbuchung',
    'pricing.growth.f3': 'Multi-Channel Follow-up (E-Mail + SMS)',
    'pricing.growth.f4': 'Echtzeit-Dashboard & Kampagnen-Tracking',
    'pricing.growth.f5': 'CRM-Synchronisation',
    'pricing.growth.f6': 'Wöchentliche Optimierungs-Calls',
    'pricing.enterprise.name': 'Enterprise',
    'pricing.enterprise.price': 'Individuell',
    'pricing.enterprise.desc': 'Maßgeschneiderte Lösung für Unternehmen mit hohem Lead-Volumen und komplexen Anforderungen.',
    'pricing.enterprise.f1': 'Alles aus Growth, plus:',
    'pricing.enterprise.f2': 'Dedizierter Account Manager',
    'pricing.enterprise.f3': 'Custom Funnel- & Landingpage-Entwicklung',
    'pricing.enterprise.f4': 'Multi-Kampagnen-Management über mehrere Standorte',
    'pricing.enterprise.f5': 'SLA & priorisierter Support',
    'pricing.hint': 'Investition ab 1.500 €/Monat zzgl. Werbebudget (empfohlen ab 1.000 €/Monat).',

    // FAQ
    'faq.title': 'Häufig gestellte Fragen',
    'faq.q1': 'Gibt es eine Mindestlaufzeit?',
    'faq.a1': 'Wir empfehlen eine Zusammenarbeit von mindestens 3 Monaten, damit wir genügend Daten sammeln und die Kampagnen optimieren können. Es gibt jedoch keine starre Vertragsbindung – Details klären wir im Strategiegespräch.',
    'faq.q2': 'Was kostet ein Lead?',
    'faq.a2': 'Die Kosten pro Lead hängen von Ihrer Branche, Region und Ihrem Angebot ab. Typische Werte liegen zwischen 15 € und 50 € pro qualifiziertem Lead. Im Strategiegespräch geben wir Ihnen eine realistische Einschätzung für Ihren Markt.',
    'faq.q3': 'Was passiert, wenn die Kampagne nicht performt?',
    'faq.a3': 'Wir optimieren fortlaufend auf Basis realer Daten – Anzeigen, Zielgruppen und Funnel werden wöchentlich angepasst. Sollte eine Kampagne trotzdem nicht die erwarteten Ergebnisse liefern, besprechen wir transparent die nächsten Schritte. Wir arbeiten ergebnisorientiert, nicht auf Autopilot.',
    'faq.q4': 'Wie schnell sehe ich erste Ergebnisse?',
    'faq.a4': 'Die meisten Kampagnen gehen innerhalb von 7–14 Tagen live. Erste Leads kommen oft bereits in der ersten Woche nach dem Start. Für stabile, optimierte Ergebnisse rechnen wir mit 4–6 Wochen.',
    'faq.q5': 'Muss ich selbst etwas tun?',
    'faq.a5': 'Nein. Wir übernehmen Anzeigen, Funnel, automatisiertes Follow-up und Terminbuchung komplett. Sie müssen lediglich die gebuchten Gespräche wahrnehmen und Ihre Deals abschließen.',

    // CTA
    'cta.title': 'Bereit für mehr Leads?',
    'cta.subtitle': 'Buchen Sie ein kostenloses Strategiegespräch. Wir analysieren Ihr Angebot, skizzieren einen Kampagnenplan und zeigen Ihnen, wie das System funktioniert. Kein Druck.',
    'cta.button': 'Demo buchen',
    'cta.note': 'Keine Verpflichtung – nur ein klarer Plan für Ihre Lead-Generierung.',

    // Footer
    'footer.tagline': 'Your AI-Powered Revenue Engine.',
    'footer.desc': 'Meta-Anzeigen, Funnels und automatisiertes Follow-up – entwickelt für Dienstleistungsunternehmen im DACH-Raum, die planbar Leads generieren und Gespräche buchen möchten.',
    'footer.cta': 'Demo buchen',
    'footer.product': 'Produkt',
    'footer.company': 'Unternehmen',
    'footer.contact': 'Kontakt',
    'footer.link.features': 'Funktionen',
    'footer.link.pricing': 'Preise',
    'footer.link.howItWorks': 'Wie es funktioniert',
    'footer.link.results': 'Ergebnisse',
    'footer.link.contact': 'Kontakt',
    'footer.link.privacy': 'Datenschutz',
    'footer.link.terms': 'AGB',
    'footer.link.linkedin': 'Auf LinkedIn verbinden',
    'footer.rights': 'Alle Rechte vorbehalten.',
  },

  en: {
    // Navbar
    'nav.product': 'Product',
    'nav.solutions': 'Solutions',
    'nav.pricing': 'Pricing',
    'nav.results': 'Results',
    'nav.bookACall': 'Book a Call',
    'nav.contact': 'Contact Us',

    // Hero
    'hero.headline1': 'Leads. Calls. Growth.',
    'hero.headline2': 'Automated.',
    'hero.subtitle': 'Clearway AI handles your Meta ads, funnel, and automated follow-up — delivering qualified leads or booked sales calls directly to you. Completely done-for-you.',
    'hero.cta': 'Book a Demo',
    'hero.seeHow': 'See Product',
    'hero.industry1': 'Dental Practices',
    'hero.industry2': 'Tax Advisors',
    'hero.industry3': 'Law Firms',
    'hero.industry4': 'Agencies',
    'hero.industry5': 'Coaches',
    'hero.industry6': 'Real Estate Agents',
    'hero.industry7': 'IT Service Providers',
    'hero.process.ad': 'Meta Ad',
    'hero.process.lead': 'Qualified Lead',
    'hero.process.call': 'Booked Call',
    'hero.process.close': 'Closed Deal',
    'hero.stats.companies': 'Done-for-you System',
    'hero.stats.leads': 'DACH Region',
    'hero.stats.rate': 'For Service Businesses',

    // Social Proof
    'proof.heading': 'Results from recent campaigns',
    'proof.r1.metric': '37',
    'proof.r1.desc': 'Booked calls in 30 days',
    'proof.r1.label': 'Tax advisory firm, DACH',
    'proof.r2.metric': '€23',
    'proof.r2.desc': 'Average cost per qualified lead',
    'proof.r2.label': 'Contractor, Switzerland',
    'proof.r3.metric': '4.2×',
    'proof.r3.desc': 'Return on ad spend (ROAS) after 60 days',
    'proof.r3.label': 'Coaching company, Germany',

    // Trusted By
    'trusted.title': 'Built for service businesses across the DACH region',
    'trusted.subtitle': 'From contractors to law firms to coaching businesses — we help service companies generate predictable new clients.',
    'trusted.link': 'Learn more',
    'trusted.industry1': 'Contractors',
    'trusted.industry2': 'Consulting',
    'trusted.industry3': 'Law Firms',
    'trusted.industry4': 'Agencies',
    'trusted.industry5': 'Coaching',
    'trusted.industry6': 'Real Estate',
    'trusted.industry7': 'IT & Software',

    // Features
    'features.title': 'Everything you need for predictable leads',
    'features.subtitle': 'A fully integrated platform that automates every step of your lead generation — from the first ad click to a booked appointment.',
    'features.f1.title': 'AI Qualification',
    'features.f1.desc': 'Our AI automatically scores and qualifies every incoming lead — so only genuinely sales-ready contacts ever reach you.',
    'features.f2.title': 'Meta Ads Automation',
    'features.f2.desc': 'Automated Meta campaigns that are continuously optimised — for maximum reach at the lowest possible cost per lead.',
    'features.f3.title': 'Calendar Integration',
    'features.f3.desc': 'Qualified leads book directly into your calendar. No manual coordination, no friction, no no-shows from poor follow-up.',
    'features.f4.title': 'Real-Time Dashboard',
    'features.f4.desc': 'Track campaign performance, lead costs, and conversion rates in real time — fully transparent and at a glance.',
    'features.f5.title': 'CRM Sync',
    'features.f5.desc': 'Every lead is automatically synced to your existing CRM — no duplicate data entry, no lost contacts.',
    'features.f6.title': 'Multi-Channel Follow-Up',
    'features.f6.desc': 'Automated email and SMS sequences keep leads warm and drive booking rates higher — without any manual effort on your part.',

    // How It Works
    'how.title': 'How It Works',
    'how.subtitle': 'A simple, done-for-you system. We handle everything — you just close the deals.',
    'how.step1.title': 'We Launch Your Meta Ads',
    'how.step1.desc': 'We build and launch targeted Meta ad campaigns that put your offer in front of the right business owners.',
    'how.step2.title': 'Leads Land in Our Funnel',
    'how.step2.desc': 'Interested prospects click through to our high-converting landing page and fill out a short qualification form.',
    'how.step3.title': 'Automated Follow-Up & Qualification',
    'how.step3.desc': 'Our AI-powered follow-up system contacts leads automatically via email and SMS, qualifies them, and books appointments directly into your calendar.',
    'how.step4.title': 'Continuous Optimisation',
    'how.step4.desc': 'We continuously analyse campaign data and optimise ads, audiences, and the funnel — so your cost per lead keeps improving.',

    // Benefits
    'benefits.title': 'Stop chasing leads. Start closing them.',
    'benefits.subtitle': "Most business owners waste hours on cold outreach and follow-ups that go nowhere. Clearway AI removes all of that — so you can spend your time on what actually makes money: closing deals.",
    'benefits.b1.title': 'Done for you, start to finish',
    'benefits.b1.desc': "We handle the ads, the funnel, and the automated follow-up. You don't touch a thing — just receive your leads or booked calls.",
    'benefits.b2.title': 'Only qualified leads reach you',
    'benefits.b2.desc': "Every lead has shown real interest and filled out our form. No time wasted on people who aren't ready to buy.",
    'benefits.b3.title': 'Consistent, predictable pipeline',
    'benefits.b3.desc': 'Stop relying on referrals and cold outreach. Get a steady stream of new business inquiries.',
    'benefits.b4.title': 'Fully transparent, no surprises',
    'benefits.b4.desc': 'You see exactly where every lead came from and what it cost. No black boxes, no guesswork — just clear results.',

    // Fit Section
    'fit.title': 'Built For These Industries',
    'fit.subtitle': 'We work best with service businesses that have a proven offer and want predictable new client acquisition.',
    'fit.good.heading': 'Good fit',
    'fit.notgood.heading': 'Not a fit',
    'fit.good.1': 'Dental practices & clinics — looking to fill their treatment calendar',
    'fit.good.2': 'Tax advisors & law firms — wanting to acquire new clients predictably',
    'fit.good.3': 'Coaches & trainers — needing more booked discovery calls',
    'fit.good.4': 'Agencies & consultancies — building a stable lead pipeline',
    'fit.good.5': 'Contractors & trades — winning regional jobs through online advertising',
    'fit.bad.1': "You don't have a clear offer or service to sell yet",
    'fit.bad.2': "You're looking for organic-only growth with no ad spend",
    'fit.bad.3': "You want to run campaigns yourself — you just need a course",
    'fit.bad.4': "You expect guaranteed results regardless of market or budget",

    // Pricing
    'pricing.title': 'Transparent Pricing',
    'pricing.subtitle': 'No hidden fees, no nasty surprises. Choose the plan that fits your growth stage.',
    'pricing.starter.name': 'Starter',
    'pricing.starter.price': '497',
    'pricing.starter.desc': 'Ideal for businesses ready to launch automated lead generation for the first time.',
    'pricing.starter.f1': 'Meta campaign setup & management',
    'pricing.starter.f2': 'AI-powered lead qualification form',
    'pricing.starter.f3': 'Automated email follow-up',
    'pricing.starter.f4': 'Monthly performance reporting',
    'pricing.growth.name': 'Growth',
    'pricing.growth.price': '997',
    'pricing.growth.desc': 'For growing businesses that want a fully automated lead pipeline running 24/7.',
    'pricing.growth.badge': 'Most Popular',
    'pricing.growth.f1': 'Everything in Starter, plus:',
    'pricing.growth.f2': 'Calendar integration & automatic appointment booking',
    'pricing.growth.f3': 'Multi-channel follow-up (email + SMS)',
    'pricing.growth.f4': 'Real-time dashboard & campaign tracking',
    'pricing.growth.f5': 'CRM synchronisation',
    'pricing.growth.f6': 'Weekly optimisation calls',
    'pricing.enterprise.name': 'Enterprise',
    'pricing.enterprise.price': 'Custom',
    'pricing.enterprise.desc': 'A tailored solution for high-volume businesses with complex requirements and multiple locations.',
    'pricing.enterprise.f1': 'Everything in Growth, plus:',
    'pricing.enterprise.f2': 'Dedicated account manager',
    'pricing.enterprise.f3': 'Custom funnel & landing page development',
    'pricing.enterprise.f4': 'Multi-campaign management across locations',
    'pricing.enterprise.f5': 'SLA & priority support',
    'pricing.hint': 'Investment from €1,500/month plus ad budget (recommended from €1,000/month).',

    // FAQ
    'faq.title': 'Frequently Asked Questions',
    'faq.q1': 'Is there a minimum contract term?',
    'faq.a1': 'We recommend a minimum engagement of 3 months so we can collect enough data and optimise campaigns effectively. However, there is no rigid lock-in — we discuss the details in the strategy call.',
    'faq.q2': 'How much does a lead cost?',
    'faq.a2': "Cost per lead depends on your industry, region, and offer. Typical values range between €15 and €50 per qualified lead. We'll give you a realistic estimate for your market during the strategy call.",
    'faq.q3': "What happens if the campaign doesn't perform?",
    'faq.a3': "We optimise continuously based on real data — ads, audiences, and the funnel are adjusted weekly. If a campaign doesn't deliver expected results, we transparently discuss next steps. We work results-driven, not on autopilot.",
    'faq.q4': 'How quickly will I see results?',
    'faq.a4': 'Most campaigns go live within 7–14 days. First leads often arrive in the first week after launch. For stable, optimised results, we typically see 4–6 weeks.',
    'faq.q5': 'Do I need to do anything myself?',
    'faq.a5': 'No. We handle ads, funnel, automated follow-up, and appointment booking completely. You only need to show up for the booked calls and close your deals.',

    // CTA
    'cta.title': 'Ready for More Leads?',
    'cta.subtitle': "Book a free strategy call. We'll review your offer, map out a campaign plan, and show you how the system works. No pressure.",
    'cta.button': 'Book a Demo',
    'cta.note': 'No commitment — just a clear plan for your lead generation.',

    // Footer
    'footer.tagline': 'Your AI-Powered Revenue Engine.',
    'footer.desc': 'Meta ads, funnels, and automated follow-up — designed to help service businesses in the DACH region generate leads and book calls predictably.',
    'footer.cta': 'Book a Demo',
    'footer.product': 'Product',
    'footer.company': 'Company',
    'footer.contact': 'Contact',
    'footer.link.features': 'Features',
    'footer.link.pricing': 'Pricing',
    'footer.link.howItWorks': 'How It Works',
    'footer.link.results': 'Results',
    'footer.link.contact': 'Contact',
    'footer.link.privacy': 'Privacy Policy',
    'footer.link.terms': 'Terms of Service',
    'footer.link.linkedin': 'Connect on LinkedIn',
    'footer.rights': 'All rights reserved.',
  },
};

const LanguageContext = createContext<LanguageContextType>({
  language: 'de',
  setLanguage: () => {},
  t: (key) => key,
});

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('de');
  const t = (key: string): string =>
    translations[language][key] ?? translations['en'][key] ?? key;
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
