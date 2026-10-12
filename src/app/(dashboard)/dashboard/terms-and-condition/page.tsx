"use client";

import SettingsContentPage from "@/components/dashboard/admin/settings/content-editor-page";

const termsContent = `
<p>Welcome to MOD-AERO and Velocity Events. By accessing or using our platform, mobile applications, or attending any automotive meet, rally, track day, or organized club drive, you agree to be bound by these Terms and Conditions.</p>
<br/>
<h3>1. Eligibility & Account Security</h3>
<p>You must be at least 18 years of age (or have explicit parental/guardian consent where permitted) and possess a valid driver's license to participate as an event organizer or driver. You are responsible for safeguarding your account credentials.</p>
<br/>
<h3>2. Event Rules & Safety Compliance</h3>
<p>Safety is our top priority. Burnouts, street racing, reckless driving, or unauthorized exhibition of speed at or near venue grounds are strictly prohibited. Event organizers and venue management reserve the right to remove any participant without refund.</p>
<br/>
<h3>3. Permits, Insurance & Legal Liability</h3>
<p>Organizers are required to verify venue permissions, local permits, and necessary liability insurance. Participants acknowledge that motorsport activities carry inherent risks and agree to sign applicable event waivers prior to entry.</p>
`;

export default function UserTermsAndConditionPage() {
  return (
    <SettingsContentPage
      title="Terms and Conditions"
      initialContent={termsContent}
      backHref="/dashboard/profile"
      backLabel="Back to Profile"
      canEdit={false}
    />
  );
}
