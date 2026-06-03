import { SiteSettingsForm } from "@/components/admin/site-settings-form";
import { getAdminSiteSettings } from "@/lib/data/site-settings";

export default async function AdminSettingsPage() {
  const settings = await getAdminSiteSettings();

  return (
    <div>
      <h1 className="font-heading text-3xl font-bold">Settings</h1>
      <p className="mt-2 text-lumi-muted">
        Footer content, contact email and social links shown on the public site.
      </p>

      <div className="mt-10 rounded-xl border border-white/10 bg-lumi-bg-secondary p-6">
        <SiteSettingsForm settings={settings} />
      </div>
    </div>
  );
}
