"use client";

import SettingsContentPage from "@/components/dashboard/admin/settings/content-editor-page";

const privacyContent = `
<p>Your privacy is important to us. This Privacy Policy describes how MOD-AERO and Velocity Events collect, use, process, and protect your personal information when you use our dashboard, register for automotive events, or interact with fellow club members.</p>
<br/>
<h3>1. Information We Collect</h3>
<p>We collect information you provide directly to us when creating a profile, organizing meets, purchasing tickets, or submitting vehicle registration details (such as your full name, email, phone number, vehicle make/model/year, and club affiliations).</p>
<br/>
<h3>2. How We Use Your Information</h3>
<p>We use your information to operate and enhance our automotive community platform, process event registrations, communicate emergency updates, verify organizer credentials, and maintain venue safety standards.</p>
<br/>
<h3>3. Data Protection & Sharing</h3>
<p>We do not sell your personal information. Event attendance manifests and emergency contact numbers are only shared with authorized event directors and venue safety marshals for event operational security.</p>
`;

export default function UserPrivacyPolicyPage() {
  return (
    <SettingsContentPage
      title="Privacy Policy"
      initialContent={privacyContent}
      backHref="/dashboard/profile"
      backLabel="Back to Profile"
      canEdit={false}
    />
  );
}
