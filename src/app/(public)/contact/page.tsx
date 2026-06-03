import { ContactForm } from "@/components/contact/contact-form";
import { FadeIn } from "@/components/shared/fade-in";
import { PageContainer, PageHeader, Section } from "@/components/shared/page-shell";
import { getSiteSettings } from "@/lib/data/site-settings";
import { getContactEmail } from "@/lib/site-settings";
import { getServerDictionary } from "@/lib/i18n/server";

export default async function ContactPage() {
  const [siteSettings, { dict }] = await Promise.all([
    getSiteSettings(),
    getServerDictionary(),
  ]);

  return (
    <Section>
      <PageContainer>
        <FadeIn>
          <PageHeader title={dict.contact.title} subtitle={dict.contact.subtitle} />
        </FadeIn>
        <div className="mt-12">
          <ContactForm contactEmail={getContactEmail(siteSettings)} />
        </div>
      </PageContainer>
    </Section>
  );
}
