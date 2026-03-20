import { useLanguage } from "@/lib/i18n";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

const Privacy = () => {
  const { language } = useLanguage();
  const isDE = language === 'de';

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={isDE ? "Datenschutzerklärung — Clearway AI" : "Privacy Policy — Clearway AI"}
        description={isDE ? "Datenschutzerklärung von Clearway AI." : "Privacy policy of Clearway AI."}
        canonical="https://clearwayai.co/privacy"
      />
      <Navbar />
      <main className="pt-28 pb-20">
        <div className="container mx-auto px-6 max-w-2xl prose prose-sm dark:prose-invert">
          {isDE ? (
            <>
              <h1>Datenschutzerklärung</h1>
              <p><strong>Stand:</strong> März 2026</p>

              <h2>1. Verantwortlicher</h2>
              <p>
                Clearway AI<br />
                Freienbach, Schweiz<br />
                E-Mail: hello@clearwayai.co
              </p>

              <h2>2. Welche Daten wir erheben</h2>
              <p>
                Wenn Sie unser Kontaktformular ausfüllen, erheben wir folgende Daten:
                Vorname, Nachname, E-Mail-Adresse, Telefonnummer, Unternehmen, Art des Unternehmens,
                Website (optional) sowie eine kurze Beschreibung Ihrer Herausforderung.
                Diese Angaben verwenden wir ausschließlich zur Kontaktaufnahme und zur Erstellung
                eines individuellen Kampagnenplans.
              </p>

              <h2>3. Zweck der Datenverarbeitung</h2>
              <p>
                Wir verarbeiten Ihre Daten, um:
              </p>
              <ul>
                <li>Ihre Anfrage zu bearbeiten und Sie zurückzurufen</li>
                <li>Ihnen einen individuellen Lead-Generierungsplan vorzustellen</li>
                <li>im Falle einer Zusammenarbeit die vereinbarten Leistungen zu erbringen</li>
              </ul>
              <p>
                Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (Vertragsanbahnung) bzw.
                Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse).
              </p>

              <h2>4. Weitergabe an Dritte</h2>
              <p>
                Wir geben Ihre Daten nur weiter, soweit dies für die Leistungserbringung
                erforderlich ist. Folgende Unterauftragsverarbeiter setzen wir ein:
              </p>
              <ul>
                <li><strong>Supabase</strong> — Datenbankhosting (USA, SCCs)</li>
                <li><strong>Meta Platforms</strong> — Werbeanzeigen zur Lead-Generierung (USA, SCCs)</li>
                <li><strong>OpenAI</strong> — KI-gestützte Kampagnenoptimierung (USA, SCCs)</li>
              </ul>
              <p>
                Eine Weitergabe an sonstige Dritte oder ein Verkauf Ihrer Daten findet nicht statt.
              </p>

              <h2>5. Speicherdauer</h2>
              <p>
                Wir speichern Ihre Daten so lange, wie dies für den jeweiligen Zweck erforderlich
                ist oder gesetzliche Aufbewahrungspflichten bestehen. Anfragen ohne Vertragsabschluss
                werden nach spätestens 12 Monaten gelöscht.
              </p>

              <h2>6. Ihre Rechte</h2>
              <p>
                Sie haben das Recht auf Auskunft, Berichtigung, Löschung und Einschränkung der
                Verarbeitung Ihrer personenbezogenen Daten sowie das Recht auf Datenübertragbarkeit
                und Widerspruch. Wenden Sie sich dazu an hello@clearwayai.co.
              </p>
              <p>
                Zudem haben Sie das Recht, sich bei der zuständigen Datenschutzbehörde zu beschweren.
              </p>

              <h2>7. Cookies & Tracking</h2>
              <p>
                Unsere Website verwendet keine Drittanbieter-Tracking-Cookies. Wir setzen lediglich
                technisch notwendige Cookies ein, die für den Betrieb der Website erforderlich sind.
              </p>

              <h2>8. Kontakt</h2>
              <p>
                Bei Fragen zum Datenschutz erreichen Sie uns unter: hello@clearwayai.co
              </p>
            </>
          ) : (
            <>
              <h1>Privacy Policy</h1>
              <p><strong>Last updated:</strong> March 2026</p>

              <h2>1. Controller</h2>
              <p>
                Clearway AI<br />
                Freienbach, Switzerland<br />
                Email: hello@clearwayai.co
              </p>

              <h2>2. Data we collect</h2>
              <p>
                When you complete our contact form, we collect: first name, last name, email address,
                phone number, company name, type of business, website (optional), and a brief
                description of your challenge. We use this information solely to contact you and to
                prepare a tailored campaign plan.
              </p>

              <h2>3. Purpose of processing</h2>
              <p>We process your data in order to:</p>
              <ul>
                <li>Handle your enquiry and follow up with you</li>
                <li>Present you with a personalised lead-generation plan</li>
                <li>Deliver the agreed services if we work together</li>
              </ul>
              <p>
                The legal basis is Art. 6(1)(b) GDPR (pre-contractual measures) and
                Art. 6(1)(f) GDPR (legitimate interest).
              </p>

              <h2>4. Third-party processors</h2>
              <p>
                We share your data only to the extent necessary for service delivery.
                Sub-processors we use:
              </p>
              <ul>
                <li><strong>Supabase</strong> — database hosting (USA, SCCs)</li>
                <li><strong>Meta Platforms</strong> — advertising for lead generation (USA, SCCs)</li>
                <li><strong>OpenAI</strong> — AI-powered campaign optimisation (USA, SCCs)</li>
              </ul>
              <p>We do not sell your data to third parties.</p>

              <h2>5. Retention</h2>
              <p>
                We retain your data for as long as necessary for the stated purpose or as required
                by law. Enquiries that do not lead to a contract are deleted within 12 months.
              </p>

              <h2>6. Your rights</h2>
              <p>
                You have the right to access, rectify, erase, and restrict the processing of your
                personal data, as well as rights to data portability and objection. Please contact
                hello@clearwayai.co to exercise these rights.
              </p>
              <p>You also have the right to lodge a complaint with the relevant supervisory authority.</p>

              <h2>7. Cookies & tracking</h2>
              <p>
                Our website does not use third-party tracking cookies. We only use technically
                necessary cookies required for the operation of the website.
              </p>

              <h2>8. Contact</h2>
              <p>For privacy-related questions, reach us at: hello@clearwayai.co</p>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;
