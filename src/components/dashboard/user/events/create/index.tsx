"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft, FileText, Shield, BookOpen, Check } from "lucide-react";
import { Modal, ConfigProvider, Tabs, App, theme } from "antd";
import BasicStep from "./basic-step";
import SafetyStep from "./safety-step";
import LegalStep from "./legal-step";
import { CreateEventStep, EventFormData, initialEventFormData } from "./types";

function CreateEventInner() {
  const router = useRouter();
  const { message: appMessage } = App.useApp();
  const [activeStep, setActiveStep] = useState<CreateEventStep>("basic");
  const [formData, setFormData] = useState<EventFormData>(initialEventFormData);
  const [isPublishing, setIsPublishing] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  // Track completion state for locking forward tabs
  const [isBasicCompleted, setIsBasicCompleted] = useState(false);
  const [isSafetyCompleted, setIsSafetyCompleted] = useState(false);

  // Validation functions
  const validateBasic = (): boolean => {
    if (!formData.bannerImage) {
      return false;
    }
    if (
      !formData.name.trim() ||
      !formData.description.trim() ||
      !formData.location.trim() ||
      !formData.startDate ||
      !formData.startTime ||
      !formData.endTime ||
      !formData.expectedAttendance ||
      !formData.organizerEmail.trim() ||
      !formData.organizerPhone.trim() ||
      (formData.isRegistrationCapped && !formData.maxRegistrations) ||
      (formData.entryFeeType === "paid" && !formData.ticketPrice)
    ) {
      appMessage.warning("Please fill in all required basic details before proceeding.");
      return false;
    }
    return true;
  };

  const validateSafety = (): boolean => {
    if (
      !formData.rulesCodeOfConduct.trim() ||
      !formData.emergencyContactName.trim() ||
      !formData.emergencyContactPhone.trim() ||
      !formData.emergencyActionPlan.trim()
    ) {
      appMessage.warning("Please fill in all required safety information before proceeding.");
      return false;
    }
    return true;
  };

  const validateLegal = (): boolean => {
    if (
      !formData.venueAuthorizationNotes.trim() ||
      !formData.venueAgreementFile
    ) {
      appMessage.warning("Please complete all required legal documentation before publishing.");
      return false;
    }
    return true;
  };

  const handleNextToSafety = () => {
    if (validateBasic()) {
      setIsBasicCompleted(true);
      setActiveStep("safety");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleNextToLegal = () => {
    if (validateSafety()) {
      setIsSafetyCompleted(true);
      setActiveStep("legal");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePublish = () => {
    if (!validateBasic() || !validateSafety() || !validateLegal()) {
      return;
    }
    setIsPublishing(true);
    setTimeout(() => {
      setIsPublishing(false);
      setIsSuccessModalOpen(true);
    }, 1200);
  };

  const handleFinish = () => {
    setIsSuccessModalOpen(false);
    router.push("/dashboard/events");
  };

  // Ant Design Tab Items with matching icon + label
  const tabItems = [
    {
      key: "basic",
      label: (
        <div className="flex items-center gap-2 font-medium text-xs sm:text-sm">
          <FileText size={15} />
          <span>Basic</span>
        </div>
      ),
    },
    {
      key: "safety",
      disabled: !isBasicCompleted,
      label: (
        <div className="flex items-center gap-2 font-medium text-xs sm:text-sm">
          <Shield size={15} />
          <span>Safety</span>
        </div>
      ),
    },
    {
      key: "legal",
      disabled: !isSafetyCompleted,
      label: (
        <div className="flex items-center gap-2 font-medium text-xs sm:text-sm">
          <BookOpen size={15} />
          <span>Legal</span>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-8 max-w-[820px] mx-auto pb-12">
      {/* Top Header Row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3.5">
          <Link
            href="/dashboard/events"
            className="w-9 h-9 rounded-full bg-[#1C1C20] hover:bg-[#28282E] border border-[#2E2E34] flex items-center justify-center text-[#8E8E93] hover:text-white transition-colors"
          >
            <ChevronLeft size={18} />
          </Link>
          <div className="space-y-0.5">
            <p className="text-[10px] font-bold text-[#8E8E93] uppercase tracking-widest">
              FILL IN ALL THREE SECTIONS BEFORE PUBLISHING
            </p>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Create New Event
            </h1>
          </div>
        </div>

        {/* 3 Step Indicator Dots */}
        <div className="flex items-center gap-1.5">
          <div
            className={`w-2.5 h-2.5 rounded-full transition-colors ${activeStep === "basic" || isBasicCompleted
              ? "bg-[#FF2E86]"
              : "bg-[#2A2A30]"
              }`}
          />
          <div
            className={`w-2.5 h-2.5 rounded-full transition-colors ${activeStep === "safety" || isSafetyCompleted
              ? "bg-[#FF2E86]"
              : "bg-[#2A2A30]"
              }`}
          />
          <div
            className={`w-2.5 h-2.5 rounded-full transition-colors ${activeStep === "legal" ? "bg-[#FF2E86]" : "bg-[#2A2A30]"
              }`}
          />
        </div>
      </div>

      {/* Ant Design Tabs Navigation */}
      <div className="custom-event-tabs w-full">
        <Tabs
          activeKey={activeStep}
          onChange={(key) => {
            setActiveStep(key as CreateEventStep);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          centered
          items={tabItems}
          className="!w-full"
        />
      </div>

      {/* Step Form Content */}
      <div className="transition-all duration-300">
        {activeStep === "basic" && (
          <BasicStep
            formData={formData}
            setFormData={setFormData}
            onNext={handleNextToSafety}
          />
        )}

        {activeStep === "safety" && (
          <SafetyStep
            formData={formData}
            setFormData={setFormData}
            onNext={handleNextToLegal}
            onBack={() => {
              setActiveStep("basic");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        )}

        {activeStep === "legal" && (
          <LegalStep
            formData={formData}
            setFormData={setFormData}
            onSubmit={handlePublish}
            onBack={() => {
              setActiveStep("safety");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            isPublishing={isPublishing}
          />
        )}
      </div>

      {/* Event Created Success Modal */}
      <Modal
        open={isSuccessModalOpen}
        onCancel={handleFinish}
        footer={null}
        centered
        width={440}
        className="[&_.ant-modal-content]:!shadow-none"
      >
        <div className="p-4 text-center space-y-5">
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mx-auto flex items-center justify-center">
            <Check size={32} strokeWidth={2.5} />
          </div>

          <div className="space-y-1.5">
            <h2 className="text-xl font-bold text-white tracking-tight">
              Event Published Successfully!
            </h2>
            <p className="text-xs text-[#8E8E93] leading-relaxed">
              Your automotive event &quot;{formData.name || "New Event"}&quot; is now live and open for registrations.
            </p>
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={handleFinish}
              className="w-full py-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#FF2E86] to-[#FF7A1A] hover:opacity-95 transition-all cursor-pointer"
            >
              Go to Events Dashboard
            </button>
          </div>
        </div>
      </Modal>

      {/* Custom Tab Styles for exact match */}
      <style jsx global>{`
        .custom-event-tabs .ant-tabs-nav {
          margin-bottom: 0 !important;
          width: 100% !important;
        }
        .custom-event-tabs .ant-tabs-nav-wrap {
          width: 100% !important;
        }
        .custom-event-tabs .ant-tabs-nav-list {
          display: grid !important;
          grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
          width: 100% !important;
        }
        .custom-event-tabs .ant-tabs-nav::before {
          border-bottom: 1px solid #26262b !important;
        }
        .custom-event-tabs .ant-tabs-ink-bar {
          background: #ff2e86 !important;
          height: 2.5px !important;
        }
        .custom-event-tabs .ant-tabs-tab {
          width: 100% !important;
          display: flex !important;
          justify-content: center !important;
          align-items: center !important;
          padding: 14px 16px !important;
          margin: 0 !important;
          border-radius: 8px 8px 0 0 !important;
          transition: all 0.2s ease !important;
        }
        .custom-event-tabs .ant-tabs-tab-btn {
          display: flex !important;
          justify-content: center !important;
          align-items: center !important;
          width: 100% !important;
        }
        .custom-event-tabs .ant-tabs-tab-active {
          background: #240d18 !important;
        }
        .custom-event-tabs .ant-tabs-tab-active .ant-tabs-tab-btn {
          color: #ffffff !important;
          font-weight: 600 !important;
        }
        .custom-event-tabs .ant-tabs-tab-disabled {
          cursor: not-allowed !important;
          opacity: 0.35 !important;
        }
      `}</style>
    </div>
  );
}

export default function CreateEvent() {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorBgContainer: "#1C1C20",
          colorBorder: "#2E2E34",
          colorText: "#FFFFFF",
          colorTextPlaceholder: "#5A5A60",
          colorPrimary: "#FF2E86",
          colorPrimaryHover: "#FF2E86",
          controlOutline: "transparent",
          borderRadius: 12,
        },
        components: {
          Input: {
            colorBgContainer: "#1C1C20",
            colorBorder: "#2E2E34",
            colorText: "#FFFFFF",
            colorTextPlaceholder: "#5A5A60",
            colorPrimary: "#FF2E86",
            colorPrimaryHover: "#FF2E86",
            activeBorderColor: "#FF2E86",
            hoverBorderColor: "#FF2E86",
          },
          DatePicker: {
            colorBgContainer: "#1C1C20",
            colorBorder: "#2E2E34",
            colorText: "#FFFFFF",
            colorTextPlaceholder: "#5A5A60",
            colorPrimary: "#FF2E86",
            activeBorderColor: "#FF2E86",
            hoverBorderColor: "#FF2E86",
          },
          Tabs: {
            itemColor: "#8E8E93",
            itemSelectedColor: "#FFFFFF",
            itemHoverColor: "#FFFFFF",
            inkBarColor: "#FF2E86",
            titleFontSize: 13,
          },
        },
      }}
    >
      <App>
        <CreateEventInner />
      </App>
    </ConfigProvider>
  );
}
