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
    'nav.howItWorks': 'Wie es funktioniert',
    'nav.whoItsFor': 'Für wen',
    'nav.results': 'Ergebnisse',
    'nav.bookACall': 'Gespräch buchen',
    'nav.contact': 'Kontakt',
    'nav.linkedIn': 'Auf LinkedIn verbinden',

    // Hero
    'hero.headline1': 'Wir füllen Ihren Kalender',
    'hero.headline2': 'mit qualifizierten Leads. Sie schließen ab.',
    'hero.subtitle': 'Clearway AI ist ein Done-for-you Lead-Generation-Service. Wir schalten Ihre Meta-Anzeigen, verwalten unseren Funnel und liefern qualifizierte Leads oder gebuchte Verkaufsgespräche – direkt zu Ihnen.',
    'hero.cta': 'Strategiegespräch buchen',
    'hero.seeHow': 'So funktioniert es',
    'hero.chooseModel': 'Wählen Sie Ihr Modell',
    'hero.qualifiedLeads': 'Qualifizierte Leads',
    'hero.bookedCalls': 'Gebuchte Gespräche',

    // Trusted By
    'trusted.title': 'Vertraut von Dienstleistern in der DACH-Region',
    'trusted.subtitle': 'Von Handwerkern über Kanzleien bis hin zu Coaching-Unternehmen – wir helfen Service-Unternehmen, planbar neue Kunden zu gewinnen.',
    'trusted.link': 'Ergebnisse ansehen',
    'trusted.industry1': 'Handwerk',
    'trusted.industry2': 'Beratung',
    'trusted.industry3': 'Kanzleien',
    'trusted.industry4': 'Agenturen',
    'trusted.industry5': 'Coaching',
    'trusted.industry6': 'Immobilien',
    'trusted.industry7': 'IT & Software',

    // HowItWorks
    'how.title': 'So funktioniert es',
    'how.subtitle': 'Ein einfaches, done-for-you System. Wir kümmern uns um alles – Sie schließen nur die Deals ab.',
    'how.step1.title': 'Wir starten Ihre Meta-Anzeigen',
    'how.step1.desc': 'Wir erstellen und schalten gezielte Meta-Kampagnen, die Ihr Angebot vor die richtigen Entscheidungsträger bringen.',
    'how.step2.title': 'Leads landen in unserem Funnel',
    'how.step2.desc': 'Interessierte Personen klicken auf unsere hochkonvertierende Landingpage und füllen ein kurzes Qualifikationsformular aus.',
    'how.step3.title': 'Sie erhalten Leads oder gebuchte Gespräche',
    'how.step3.desc': 'Wir senden Ihnen die qualifizierten Leads direkt zu oder buchen Meetings in Ihren Kalender. Sie erscheinen einfach und schließen ab.',
    'how.step4.title': 'Kontinuierliche Optimierung',
    'how.step4.desc': 'Wir analysieren die Kampagnendaten fortlaufend und optimieren Anzeigen, Zielgruppen und Funnel – damit Ihre Kosten pro Lead sinken.',
    'how.cta': 'Strategiegespräch buchen',

    // Benefits
    'benefits.title': 'Hören Sie auf, Leads zu jagen. Fangen Sie an, sie abzuschließen.',
    'benefits.subtitle': 'Die meisten Unternehmer verschwenden Stunden mit Kaltakquise und Follow-ups, die ins Leere laufen. Clearway AI eliminiert all das – damit Sie Ihre Zeit für das einsetzen können, was wirklich zählt: Deals abschließen.',
    'benefits.b1.title': 'Done for you, von A bis Z',
    'benefits.b1.desc': 'Wir kümmern uns um Anzeigen, Funnel und Follow-up. Sie müssen nichts anfassen – empfangen Sie einfach Ihre Leads oder gebuchten Gespräche.',
    'benefits.b2.title': 'Nur qualifizierte Leads erreichen Sie',
    'benefits.b2.desc': 'Jeder Lead hat echtes Interesse gezeigt und unser Formular ausgefüllt. Keine Zeitverschwendung mit Personen, die noch nicht kaufbereit sind.',
    'benefits.b3.title': 'Konstante, planbare Pipeline',
    'benefits.b3.desc': 'Schluss mit der Abhängigkeit von Empfehlungen und Kaltakquise. Erhalten Sie einen stetigen Strom neuer Geschäftsanfragen.',
    'benefits.b4.title': 'Vollständig transparent, keine Überraschungen',
    'benefits.b4.desc': 'Sie sehen genau, woher jeder Lead kommt und was er gekostet hat. Keine Black Box, kein Rätselraten – nur klare Ergebnisse.',

    // FitSection
    'fit.title': 'Ist das das Richtige für Sie?',
    'fit.subtitle': 'Wir arbeiten am besten mit Unternehmen, die ein bewährtes Angebot haben und einen zuverlässigeren Lead-Flow wünschen.',
    'fit.good.heading': 'Passt gut zu uns',
    'fit.notgood.heading': 'Passt nicht zu uns',
    'fit.good.1': 'Sie sind ein Dienstleistungsunternehmen (Klinik, Kanzlei, Agentur, Coach, Handwerksbetrieb)',
    'fit.good.2': 'Sie haben ein Angebot, das funktioniert – Sie brauchen nur mehr Leads',
    'fit.good.3': 'Sie möchten ein Done-for-you-System, kein weiteres Tool',
    'fit.good.4': 'Sie sind bereit, in Meta-Anzeigen zu investieren, um planbar zu wachsen',
    'fit.good.5': 'Sie möchten qualifizierte Leads oder gebuchte Gespräche, keine bloßen Klicks',
    'fit.bad.1': 'Sie haben noch kein klares Angebot oder keine Dienstleistung zu verkaufen',
    'fit.bad.2': 'Sie suchen rein organisches Wachstum ohne Werbebudget',
    'fit.bad.3': 'Sie möchten Kampagnen selbst schalten – Sie brauchen nur einen Kurs',
    'fit.bad.4': 'Sie erwarten garantierte Ergebnisse unabhängig von Markt oder Budget',

    // FAQ
    'faq.title': 'Häufig gestellte Fragen',
    'faq.q1': 'Was ist der Unterschied zwischen Leads und gebuchten Gesprächen?',
    'faq.a1': 'Bei Leads Only liefern wir qualifizierte Leads direkt in Ihr CRM oder Postfach. Bei Gebuchten Gesprächen übernimmt unser KI-Follow-up-System auch die Terminplanung – Interessenten landen direkt in Ihrem Kalender.',
    'faq.q2': 'Wie schnell kann die Kampagne starten?',
    'faq.a2': 'Die meisten Kampagnen gehen innerhalb von 7–14 Tagen live. Das umfasst Strategie, Anzeigenerstellung, Funnel-Aufbau und KI-Follow-up-Setup. Danach optimieren wir wöchentlich auf Basis realer Daten.',
    'faq.q3': 'Welche Ergebnisse kann ich erwarten?',
    'faq.a3': 'Ergebnisse hängen von Ihrem Angebot, Markt und Budget ab. Wir geben keine Garantien – aber unser System ist darauf ausgelegt, einen konstanten Strom qualifizierter Leads zu generieren. Wir setzen realistische Erwartungen im Strategiegespräch.',
    'faq.q4': 'Auf welchen Plattformen schalten Sie Anzeigen?',
    'faq.a4': 'Wir konzentrieren uns auf Meta (Facebook & Instagram). Diese Plattformen bieten in der Regel ein starkes Targeting für lokale und Online-Dienstleistungsunternehmen und funktionieren gut mit unserem Funnel und KI-Follow-up-System.',
    'faq.q5': 'Brauche ich ein großes Werbebudget?',
    'faq.a5': 'Wir empfehlen ein Mindest-Werbebudget, das aussagekräftige Daten und Tests ermöglicht. Was für Ihren Markt sinnvoll ist, besprechen wir im Strategiegespräch.',
    'faq.q6': 'Was, wenn ich bereits Anzeigen schalte?',
    'faq.a6': 'Sehr gut – wir können analysieren, was Sie tun, und Lücken identifizieren. Oft liegt das Problem nicht bei den Anzeigen selbst, sondern beim Follow-up-System (oder dessen Fehlen) dahinter.',

    // CTA
    'cta.title': 'Bereit für mehr Leads?',
    'cta.subtitle': 'Buchen Sie ein kostenloses Strategiegespräch. Wir analysieren Ihr Angebot, skizzieren einen Kampagnenplan und zeigen Ihnen, wie das System funktioniert. Kein Druck.',
    'cta.button': 'Strategiegespräch buchen',
    'cta.note': 'Keine Verpflichtung – nur ein klarer Plan für Ihre Lead-Generierung.',

    // Footer
    'footer.desc': 'Meta-Anzeigen, Funnels und KI-Follow-up – entwickelt für Dienstleistungsunternehmen im DACH-Raum, die Leads generieren und Gespräche buchen möchten.',
    'footer.cta': 'Strategiegespräch buchen',
    'footer.links': 'Links',
    'footer.legal': 'Rechtliches',
    'footer.contact': 'Kontakt',
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
    'nav.howItWorks': 'How It Works',
    'nav.whoItsFor': "Who It's For",
    'nav.results': 'Results',
    'nav.bookACall': 'Book a Call',
    'nav.contact': 'Contact Us',
    'nav.linkedIn': 'Connect on LinkedIn',

    // Hero
    'hero.headline1': 'We Fill Your Calendar',
    'hero.headline2': 'With Qualified Leads. You Close Them.',
    'hero.subtitle': 'Clearway AI is a done-for-you lead generation service. We run your Meta ads, manage our funnel, and deliver either qualified leads or booked sales calls — directly to you.',
    'hero.cta': 'Book a Strategy Call',
    'hero.seeHow': 'See How It Works',
    'hero.chooseModel': 'Choose your model',
    'hero.qualifiedLeads': 'Qualified Leads',
    'hero.bookedCalls': 'Booked Calls',

    // Trusted By
    'trusted.title': 'Trusted by service businesses across the DACH region',
    'trusted.subtitle': 'From contractors to law firms to coaching businesses — we help service companies generate predictable new clients.',
    'trusted.link': 'Explore results',
    'trusted.industry1': 'Contractors',
    'trusted.industry2': 'Consulting',
    'trusted.industry3': 'Law Firms',
    'trusted.industry4': 'Agencies',
    'trusted.industry5': 'Coaching',
    'trusted.industry6': 'Real Estate',
    'trusted.industry7': 'IT & Software',

    // HowItWorks
    'how.title': 'How It Works',
    'how.subtitle': 'A simple, done-for-you system. We handle everything — you just close the deals.',
    'how.step1.title': 'We Launch Your Meta Ads',
    'how.step1.desc': 'We build and launch targeted Meta ad campaigns that put your offer in front of the right business owners.',
    'how.step2.title': 'Leads Land in Our Funnel',
    'how.step2.desc': 'Interested prospects click through to our high-converting landing page and fill out a short qualification form.',
    'how.step3.title': 'You Get Leads or Booked Calls',
    'how.step3.desc': 'We send you the qualified leads directly, or book meetings straight onto your calendar. You just show up and close.',
    'how.step4.title': 'Continuous Optimisation',
    'how.step4.desc': 'We continuously analyse campaign data and optimise ads, audiences, and the funnel — so your cost per lead keeps improving.',
    'how.cta': 'Book a Strategy Call',

    // Benefits
    'benefits.title': 'Stop chasing leads. Start closing them.',
    'benefits.subtitle': "Most business owners waste hours on cold outreach and follow-ups that go nowhere. Clearway AI removes all of that — so you can spend your time on what actually makes money: closing deals.",
    'benefits.b1.title': 'Done for you, start to finish',
    'benefits.b1.desc': "We handle the ads, the funnel, and the follow-up. You don't touch a thing — just receive your leads or booked calls.",
    'benefits.b2.title': 'Only qualified leads reach you',
    'benefits.b2.desc': "Every lead has shown real interest and filled out our form. No time wasted on people who aren't ready to buy.",
    'benefits.b3.title': 'Consistent, predictable pipeline',
    'benefits.b3.desc': 'Stop relying on referrals and cold outreach. Get a steady stream of new business inquiries.',
    'benefits.b4.title': 'Fully transparent, no surprises',
    'benefits.b4.desc': 'You see exactly where every lead came from and what it cost. No black boxes, no guesswork — just clear results.',

    // FitSection
    'fit.title': 'Is This Right For You?',
    'fit.subtitle': 'We work best with businesses that have a proven offer and want more predictable lead flow.',
    'fit.good.heading': 'Good fit',
    'fit.notgood.heading': 'Not a fit',
    'fit.good.1': "You're a service business (clinic, law firm, agency, coach, contractor)",
    'fit.good.2': "You have an offer that's working — you just need more leads",
    'fit.good.3': "You want a done-for-you system, not another tool to manage",
    'fit.good.4': "You're ready to invest in Meta ads to grow predictably",
    'fit.good.5': "You want qualified leads or booked calls, not just clicks",
    'fit.bad.1': "You don't have a clear offer or service to sell yet",
    'fit.bad.2': "You're looking for organic-only growth with no ad spend",
    'fit.bad.3': "You want to run campaigns yourself — you just need a course",
    'fit.bad.4': "You expect guaranteed results regardless of market or budget",

    // FAQ
    'faq.title': 'Frequently asked questions',
    'faq.q1': 'What\'s the difference between Leads Only and Booked Calls?',
    'faq.a1': 'With Leads Only, we deliver qualified leads directly to your CRM or inbox. With Booked Calls, our AI follow-up system also handles scheduling — so prospects land on your calendar ready to talk. You choose the model that fits your workflow.',
    'faq.q2': 'How long does it take to launch?',
    'faq.a2': 'Most campaigns go live within 7–14 days. That includes strategy, ad creative, funnel build, and AI follow-up setup. From there, we optimize weekly based on real data.',
    'faq.q3': 'What results can I expect?',
    'faq.a3': 'Results depend on your offer, market, and budget. We don\'t make guarantees — but our system is designed to help you generate a consistent flow of qualified leads and reduce wasted ad spend. We\'ll set realistic expectations during the strategy call.',
    'faq.q4': 'What platforms do you run ads on?',
    'faq.a4': 'We focus on Meta (Facebook & Instagram). These platforms typically offer strong targeting for local and online service businesses, and work well with our funnel and AI follow-up system.',
    'faq.q5': 'Do I need a big ad budget?',
    'faq.a5': 'We typically recommend starting with a minimum ad budget that allows for meaningful data and testing. We\'ll discuss what makes sense for your market during the strategy call.',
    'faq.q6': 'What if I already run ads?',
    'faq.a6': 'Great — we can audit what you\'re doing and identify where the gaps are. Often the issue isn\'t the ads themselves, but the follow-up system (or lack of one) behind them.',

    // CTA
    'cta.title': 'Ready for More Leads?',
    'cta.subtitle': "Book a free strategy call. We'll review your offer, map out a campaign plan, and show you how the system works. No pressure.",
    'cta.button': 'Book Your Strategy Call',
    'cta.note': 'No commitment — just a clear plan for your lead generation.',

    // Footer
    'footer.desc': 'Meta ads, funnels, and AI follow-up — designed to help service businesses in the DACH region generate leads and book calls.',
    'footer.cta': 'Book a Strategy Call',
    'footer.links': 'Links',
    'footer.legal': 'Legal',
    'footer.contact': 'Contact',
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
