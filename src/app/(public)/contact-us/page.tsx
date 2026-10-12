import React from "react";
import ContactUs from "@/components/contact-us";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Velocity",
  description: "Get in touch with the Velocity team for questions, support, and creator inquiries.",
};

export default function ContactUsPage() {
  return <ContactUs />;
}
