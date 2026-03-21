import { useLanguage } from "@/lib/i18n";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

const Terms = () => {
  const { language } = useLanguage();
  const isDE = language === 'de';

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={isDE ? "Allgemeine Geschäftsbedingungen — Clearway AI" : "Terms of Service — Clearway AI"}
        description={isDE ? "AGB von Clearway AI." : "Terms of service of Clearway AI."}
        canonical="https://clearwayai.co/terms"
      />
      <Navbar />
      <main className="pt-28 pb-20">
        <div className="container mx-auto px-6 max-w-2xl prose prose-sm dark:prose-invert">
          {isDE ? (
            <>
              <h1>Allgemeine Geschäftsbedingungen (AGB)</h1>
              <p><strong>Stand:</strong> März 2026</p>

              <h2>1. Anbieter</h2>
              <p>
                Clearway AI<br />
                Freienbach, Schweiz<br />
                E-Mail: hello@clearwayai.co
              </p>

              <h2>2. Leistungsumfang</h2>
              <p>
                Clearway AI erbringt Dienstleistungen im Bereich der bezahlten Lead-Generierung
                (Meta Ads) sowie der Kampagnenoptimierung für Dienstleistungsunternehmen im
                DACH-Raum. Der genaue Leistungsumfang wird individuell im Dienstleistungsvertrag
                vereinbart.
              </p>

              <h2>3. Vertragsschluss</h2>
              <p>
                Ein Vertragsverhältnis entsteht ausschließlich durch die beidseitige Unterzeichnung
                eines schriftlichen Dienstleistungsvertrags. Das Ausfüllen des Kontaktformulars oder
                die Teilnahme an einem Erstgespräch begründet kein Vertragsverhältnis.
              </p>

              <h2>4. Vergütung</h2>
              <p>
                Die Vergütung wird individuell zwischen den Parteien vereinbart und im
                Dienstleistungsvertrag schriftlich festgehalten. Es gibt keine standardisierten
                Festpreise. Alle Preisangaben in Gesprächen oder Marketingmaterialien sind
                unverbindliche Richtwerte.
              </p>

              <h2>5. Laufzeit und Kündigung</h2>
              <p>
                Laufzeit und Kündigungsfristen werden im individuellen Dienstleistungsvertrag
                geregelt. Sofern nichts anderes vereinbart, beträgt die Mindestlaufzeit 3 Monate
                mit einer Kündigungsfrist von 30 Tagen zum Ende der jeweiligen Laufzeit.
              </p>

              <h2>6. Leistungsversprechen</h2>
              <p>
                Clearway AI verpflichtet sich zur professionellen Durchführung der vereinbarten
                Leistungen. Konkrete Ergebnisgarantien (z. B. eine bestimmte Anzahl an Leads oder
                Umsatzziele) können nicht gegeben werden, da diese von zahlreichen externen Faktoren
                abhängen, die außerhalb unseres Einflussbereichs liegen.
              </p>

              <h2>7. Einrichtung und Onboarding</h2>
              <p>
                Nach Vertragsunterzeichnung beginnt das Onboarding in der Regel innerhalb weniger
                Werktage. Der genaue Zeitplan wird gemeinsam abgestimmt.
              </p>

              <h2>8. Haftungsbeschränkung</h2>
              <p>
                Clearway AI haftet nur für Schäden, die auf grober Fahrlässigkeit oder Vorsatz
                beruhen. Eine Haftung für entgangenen Gewinn oder mittelbare Schäden ist
                ausgeschlossen, soweit gesetzlich zulässig.
              </p>

              <h2>9. Anwendbares Recht und Gerichtsstand</h2>
              <p>
                Es gilt Schweizer Recht. Gerichtsstand ist Freienbach, Schweiz.
              </p>

              <h2>10. Änderungen dieser AGB</h2>
              <p>
                Clearway AI behält sich vor, diese AGB jederzeit zu ändern. Bestehende
                Vertragsverhältnisse bleiben von Änderungen unberührt.
              </p>

              <h2>11. Kontakt</h2>
              <p>hello@clearwayai.co</p>
            </>
          ) : (
            <>
              <h1>Terms of Service</h1>
              <p><strong>Last updated:</strong> March 2026</p>

              <h2>1. Provider</h2>
              <p>
                Clearway AI<br />
                Freienbach, Switzerland<br />
                Email: hello@clearwayai.co
              </p>

              <h2>2. Scope of services</h2>
              <p>
                Clearway AI provides paid lead-generation services (Meta Ads) and campaign
                optimisation for service businesses in the DACH region. The exact scope is agreed
                individually in the service contract.
              </p>

              <h2>3. Formation of contract</h2>
              <p>
                A contractual relationship is formed only upon mutual execution of a written service
                agreement. Completing the contact form or attending an initial call does not create a
                contractual obligation.
              </p>

              <h2>4. Fees</h2>
              <p>
                Fees are agreed individually between the parties and set out in the service contract.
                There are no fixed standard prices. Any figures mentioned in calls or marketing
                materials are non-binding indicative values.
              </p>

              <h2>5. Term and termination</h2>
              <p>
                Term and notice periods are governed by the individual service contract. Unless
                otherwise agreed, the minimum term is 3 months with 30 days' notice to the end of
                the respective term.
              </p>

              <h2>6. Performance commitment</h2>
              <p>
                Clearway AI commits to carrying out the agreed services professionally. We cannot
                guarantee specific outcomes (e.g. a set number of leads or revenue targets) as
                results depend on many external factors outside our control.
              </p>

              <h2>7. Setup and onboarding</h2>
              <p>
                After signing, onboarding typically begins within a few business days. The exact
                timeline will be agreed together.
              </p>

              <h2>8. Limitation of liability</h2>
              <p>
                Clearway AI is liable only for damages caused by gross negligence or wilful
                misconduct. Liability for lost profits or indirect damages is excluded to the extent
                permitted by law.
              </p>

              <h2>9. Governing law and jurisdiction</h2>
              <p>
                Swiss law applies. Place of jurisdiction is Freienbach, Switzerland.
              </p>

              <h2>10. Amendments</h2>
              <p>
                Clearway AI reserves the right to amend these terms at any time. Existing contracts
                are not affected by amendments.
              </p>

              <h2>11. Contact</h2>
              <p>hello@clearwayai.co</p>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;
