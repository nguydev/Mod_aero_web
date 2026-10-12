"use client";

import React, { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  Clock,
  ShieldCheck,
} from "lucide-react";
import { Form, Modal, ConfigProvider, theme } from "antd";
import FormField from "@/components/form";

interface ContactFormData {
  fullName: string;
  email: string;
  subject: string;
  message: string;
}

const initialFormData: ContactFormData = {
  fullName: "",
  email: "",
  subject: "",
  message: "",
};

export default function ContactUs() {
  const [formData, setFormData] = useState<ContactFormData>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsSuccessModalOpen(true);
      setFormData(initialFormData);
      setErrors({});
    }, 1000);
  };

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorBgContainer: "#141416",
          colorBorder: "#26262B",
          colorText: "#FFFFFF",
          colorTextPlaceholder: "#5A5A60",
          colorPrimary: "#FF2E86",
          borderRadius: 9999,
        },
      }}
    >
      <div className="min-h-screen bg-[#0D0D0F] text-white py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Main 2-Column Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Side: Contact Information & Details */}
            <div className="lg:col-span-5 space-y-6">
              {/* Header Info */}
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FF2E86]/10 border border-[#FF2E86]/20 text-[#FF2E86] text-[11px] font-bold tracking-wider uppercase">
                  <MessageSquare size={13} />
                  <span>Get In Touch</span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                  Contact Our Team
                </h1>
                <p className="text-xs sm:text-sm text-[#8E8E93] leading-relaxed">
                  Have questions about Velocity, creator verification, or events? Reach out directly through any of our support channels.
                </p>
              </div>

              {/* Contact Cards Stack */}
              <div className="space-y-3.5">
                {/* Card 1: Email */}
                <div className="rounded-2xl p-4 sm:p-5 bg-[#141416] border border-[#26262B] hover:border-[#FF2E86]/40 transition-all flex items-start gap-4 group">
                  <div className="w-11 h-11 rounded-2xl bg-[#FF2E86]/10 border border-[#FF2E86]/20 text-[#FF2E86] flex items-center justify-center shrink-0 transition-transform group-hover:scale-105">
                    <Mail size={20} />
                  </div>
                  <div className="space-y-0.5 min-w-0">
                    <p className="text-[10px] font-bold text-[#8E8E93] uppercase tracking-wider">
                      EMAIL SUPPORT
                    </p>
                    <a
                      href="mailto:support@velocityplatform.com"
                      className="text-sm font-bold text-white hover:text-[#FF2E86] transition-colors block truncate"
                    >
                      support@velocityplatform.com
                    </a>
                    <p className="text-[11px] text-[#636369]">Available 24/7 for creator & user inquiries</p>
                  </div>
                </div>

                {/* Card 2: Phone */}
                <div className="rounded-2xl p-4 sm:p-5 bg-[#141416] border border-[#26262B] hover:border-[#FF2E86]/40 transition-all flex items-start gap-4 group">
                  <div className="w-11 h-11 rounded-2xl bg-[#FF2E86]/10 border border-[#FF2E86]/20 text-[#FF2E86] flex items-center justify-center shrink-0 transition-transform group-hover:scale-105">
                    <Phone size={20} />
                  </div>
                  <div className="space-y-0.5 min-w-0">
                    <p className="text-[10px] font-bold text-[#8E8E93] uppercase tracking-wider">
                      PHONE CALL
                    </p>
                    <a
                      href="tel:+18008356248"
                      className="text-sm font-bold text-white hover:text-[#FF2E86] transition-colors block truncate"
                    >
                      +1 (800) 835-6248
                    </a>
                    <p className="text-[11px] text-[#636369]">Mon–Fri from 9am to 6pm EST</p>
                  </div>
                </div>

                {/* Card 3: Location */}
                <div className="rounded-2xl p-4 sm:p-5 bg-[#141416] border border-[#26262B] hover:border-[#FF2E86]/40 transition-all flex items-start gap-4 group">
                  <div className="w-11 h-11 rounded-2xl bg-[#FF2E86]/10 border border-[#FF2E86]/20 text-[#FF2E86] flex items-center justify-center shrink-0 transition-transform group-hover:scale-105">
                    <MapPin size={20} />
                  </div>
                  <div className="space-y-0.5 min-w-0">
                    <p className="text-[10px] font-bold text-[#8E8E93] uppercase tracking-wider">
                      HEADQUARTERS
                    </p>
                    <p className="text-sm font-bold text-white truncate">
                      Los Angeles, California
                    </p>
                    <p className="text-[11px] text-[#636369]">Global Automotive Operations</p>
                  </div>
                </div>
              </div>

              {/* Trust Badge Card */}
              <div className="rounded-2xl p-4 bg-[#180D13]/60 border border-[#38101E] flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#FF2E86]/10 text-[#FF2E86] flex items-center justify-center shrink-0">
                  <ShieldCheck size={18} />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Priority Creator Assistance</p>
                  <p className="text-[11px] text-[#8E8E93]">Average reply time is under 12 hours.</p>
                </div>
              </div>
            </div>

            {/* Right Side: Form Container */}
            <div className="lg:col-span-7">
              <div className="rounded-3xl p-6 sm:p-8 lg:p-9 bg-[#141416] border border-[#26262B] shadow-2xl space-y-6">
                <div className="space-y-1 pb-2 border-b border-[#26262B]">
                  <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    Send Us a Message
                  </h2>
                  <p className="text-xs sm:text-sm text-[#8E8E93]">
                    Fill in the details below and our team will get back to your email.
                  </p>
                </div>

                <Form layout="vertical" onFinish={handleSubmit} className="space-y-4">
                  {/* Row 1: Full Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div className="space-y-1">
                      <FormField
                        name="fullName"
                        label="FULL NAME"
                        required
                        placeholder="e.g. John Ramirez"
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => {
                          setFormData((prev) => ({
                            ...prev,
                            fullName: e.target.value,
                          }));
                          if (errors.fullName)
                            setErrors((prev) => ({ ...prev, fullName: "" }));
                        }}
                        labelClassName="!text-[11px] !font-bold !text-[#CCCCCC] !uppercase !tracking-wider"
                        inputClassName={`!bg-[#18181B] !text-white placeholder:!text-[#5A5A60] !rounded-full focus:!border-[#FF2E86] !text-sm px-5 py-3 ${errors.fullName ? "!border-rose-500/80" : "!border-[#2E2E34]"
                          }`}
                      />
                      {errors.fullName && (
                        <p className="text-[11px] text-rose-400 flex items-center gap-1 px-1 font-medium">
                          <AlertCircle size={11} /> {errors.fullName}
                        </p>
                      )}
                    </div>

                    {/* Email Address */}
                    <div className="space-y-1">
                      <FormField
                        name="email"
                        label="EMAIL ADDRESS"
                        required
                        placeholder="e.g. john@example.com"
                        type="email"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData((prev) => ({
                            ...prev,
                            email: e.target.value,
                          }));
                          if (errors.email)
                            setErrors((prev) => ({ ...prev, email: "" }));
                        }}
                        labelClassName="!text-[11px] !font-bold !text-[#CCCCCC] !uppercase !tracking-wider"
                        inputClassName={`!bg-[#18181B] !text-white placeholder:!text-[#5A5A60] !rounded-full focus:!border-[#FF2E86] !text-sm px-5 py-3 ${errors.email ? "!border-rose-500/80" : "!border-[#2E2E34]"
                          }`}
                      />
                      {errors.email && (
                        <p className="text-[11px] text-rose-400 flex items-center gap-1 px-1 font-medium">
                          <AlertCircle size={11} /> {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="space-y-1">
                    <FormField
                      name="subject"
                      label="SUBJECT"
                      required
                      placeholder="e.g. Question about Creator Verification"
                      type="text"
                      value={formData.subject}
                      onChange={(e) => {
                        setFormData((prev) => ({
                          ...prev,
                          subject: e.target.value,
                        }));
                        if (errors.subject)
                          setErrors((prev) => ({ ...prev, subject: "" }));
                      }}
                      labelClassName="!text-[11px] !font-bold !text-[#CCCCCC] !uppercase !tracking-wider"
                      inputClassName={`!bg-[#18181B] !text-white placeholder:!text-[#5A5A60] !rounded-full focus:!border-[#FF2E86] !text-sm px-5 py-3 ${errors.subject ? "!border-rose-500/80" : "!border-[#2E2E34]"
                        }`}
                    />
                    {errors.subject && (
                      <p className="text-[11px] text-rose-400 flex items-center gap-1 px-1 font-medium">
                        <AlertCircle size={11} /> {errors.subject}
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div className="space-y-1">
                    <FormField
                      name="message"
                      label="MESSAGE"
                      required
                      placeholder="Write your message or inquiry here..."
                      type="textarea"
                      rows={5}
                      value={formData.message}
                      onChange={(e) => {
                        setFormData((prev) => ({
                          ...prev,
                          message: e.target.value,
                        }));
                        if (errors.message)
                          setErrors((prev) => ({ ...prev, message: "" }));
                      }}
                      labelClassName="!text-[11px] !font-bold !text-[#CCCCCC] !uppercase !tracking-wider"
                      inputClassName={`!bg-[#18181B] !text-white placeholder:!text-[#5A5A60] !rounded-2xl focus:!border-[#FF2E86] !text-sm resize-none p-4 ${errors.message ? "!border-rose-500/80" : "!border-[#2E2E34]"
                        }`}
                    />
                    {errors.message && (
                      <p className="text-[11px] text-rose-400 flex items-center gap-1 px-1 font-medium">
                        <AlertCircle size={11} /> {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-3">
                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={loading}
                      className="w-full py-4 rounded-full text-sm font-bold text-white gradient hover:opacity-95 shadow-xl shadow-pink-500/25 transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      <Send size={16} />
                      <span>{loading ? "Sending Message..." : "Send Message"}</span>
                    </button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>

        {/* Success Modal */}
        <Modal
          open={isSuccessModalOpen}
          onCancel={() => setIsSuccessModalOpen(false)}
          footer={null}
          centered
          width={440}
          className="[&_.ant-modal-content]:!bg-[#141416] [&_.ant-modal-content]:!border [&_.ant-modal-content]:!border-[#26262B] [&_.ant-modal-content]:!rounded-3xl [&_.ant-modal-content]:!p-6"
        >
          <div className="p-4 text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mx-auto flex items-center justify-center">
              <CheckCircle2 size={32} strokeWidth={2.5} />
            </div>

            <div className="space-y-1.5">
              <h2 className="text-xl font-bold text-white tracking-tight">
                Message Sent Successfully!
              </h2>
              <p className="text-xs text-[#8E8E93] leading-relaxed">
                Thank you for contacting Velocity. We have received your inquiry and our support team will respond to you via email shortly.
              </p>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => setIsSuccessModalOpen(false)}
                className="w-full py-3.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-[#FF2E86] to-[#FF7A1A] hover:opacity-95 shadow-lg shadow-pink-500/25 transition-all cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </ConfigProvider>
  );
}
