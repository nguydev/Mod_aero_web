"use client";

import { Modal, Form, ConfigProvider, theme } from "antd";
import { X } from "lucide-react";
import FormField from "@/components/form";
import { ChallengeItem } from "./data";

interface CreateChallengeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (challenge: ChallengeItem) => void;
}

export default function CreateChallengeModal({
  isOpen,
  onClose,
  onCreate,
}: CreateChallengeModalProps) {
  const [form] = Form.useForm();

  const handleFinish = (values: {
    name?: string;
    description?: string;
    progressionPath?: string;
    challengeType?: string;
    requirementValue?: string;
    requirementUnit?: string;
    xpReward?: string;
    startDate?: any;
    endDate?: any;
  }) => {
    const progression = values.progressionPath || "CRUISER";
    const newChallenge: ChallengeItem = {
      id: `c-${Date.now()}`,
      name: values.name || "Weekend Warrior",
      badge: progression,
      badgeColor:
        progression === "CRUISER"
          ? "text-[#14B8A6]"
          : progression === "RACER"
            ? "text-[#FF2E86]"
            : "text-[#F59E0B]",
      badgeBg:
        progression === "CRUISER"
          ? "bg-[#102B28]"
          : progression === "RACER"
            ? "bg-[#3E1428]"
            : "bg-[#3B2810]",
      status: "Active",
      description:
        values.description || "Drive 100 verified miles this weekend.",
      xp: Number(values.xpReward) || 500,
      endDate: values.endDate ? String(values.endDate) : "August 31",
      participantsCount: "0",
      completionRate: "0%",
    };
    onCreate(newChallenge);
    form.resetFields();
    onClose();
  };

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorBgElevated: "#18181A",
          colorBgContainer: "#222226",
          colorBorder: "#2E2E34",
          colorBorderSecondary: "#2A2A30",
          colorText: "#ffffff",
          colorTextPlaceholder: "#5A5A60",
          colorTextHeading: "#8E8E93",
          controlHeight: 44,
          borderRadius: 12,
          boxShadow: "none",
          boxShadowSecondary: "none",
          boxShadowTertiary: "none",
        },
        components: {
          Form: {
            labelColor: "#8E8E93",
            labelFontSize: 12,
          },
          Input: {
            colorBgContainer: "#222226",
            colorBorder: "#2E2E34",
            activeBorderColor: "#FF2E86",
            hoverBorderColor: "#FF2E86",
          },
          Select: {
            colorBgContainer: "#222226",
            colorBorder: "#2E2E34",
            colorPrimaryHover: "#FF2E86",
          },
          DatePicker: {
            colorBgContainer: "#222226",
            colorBorder: "#2E2E34",
          },
        },
      }}
    >
      <Modal
        open={isOpen}
        onCancel={onClose}
        footer={null}
        centered
        width={560}
        className="[&_.ant-modal-content]:!shadow-none"
        closeIcon={
          <div className="w-7 h-7 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-[#8E8E93] hover:text-white transition-colors">
            <X size={15} />
          </div>
        }
      >
        <div className="space-y-5">
          {/* Header */}
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-[#FF2E86] uppercase tracking-wider">
              NEW
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Create Challenge
            </h2>
          </div>

          {/* Form using FormField components */}
          <Form
            form={form}
            layout="vertical"
            onFinish={handleFinish}
            initialValues={{
              progressionPath: "CRUISER",
              challengeType: "Distance",
              requirementValue: "100",
              requirementUnit: "Miles",
              xpReward: "500",
            }}
            className="space-y-3 [&_.ant-form-item]:!mb-3 [&_.ant-form-item-label_label]:!text-[#8E8E93] [&_.ant-form-item-label_label]:!text-xs [&_.ant-form-item-label_label]:!font-medium [&_.ant-form-item-label_label]:!h-auto [&_.ant-form-item-label]:!pb-1"
          >
            {/* Challenge Name */}
            <FormField
              name="name"
              label="Challenge Name"
              placeholder="Weekend Warrior"
              type="text"
              labelClassName="!text-[#8E8E93] !text-xs !font-medium"
              inputClassName="!bg-[#222226] !border-[#2E2E34] !text-white placeholder:!text-[#5A5A60] !rounded-xl !py-2.5"
            />

            {/* Description */}
            <FormField
              name="description"
              label="Description"
              placeholder="Drive 100 verified miles this weekend."
              type="textarea"
              rows={3}
              labelClassName="!text-[#8E8E93] !text-xs !font-medium"
              inputClassName="!bg-[#222226] !border-[#2E2E34] !text-white placeholder:!text-[#5A5A60] !rounded-xl !py-2.5 resize-none"
            />

            {/* Progression Path & Challenge Type */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <FormField
                name="progressionPath"
                label="Progression Path"
                type="select"
                labelClassName="!text-[#8E8E93] !text-xs !font-medium"
                inputClassName="!bg-[#222226] !border-[#2E2E34] !text-white !rounded-xl"
                options={[
                  { label: "CRUISER", value: "CRUISER" },
                  { label: "RACER", value: "RACER" },
                  { label: "ENGINEER", value: "ENGINEER" },
                ]}
              />

              <FormField
                name="challengeType"
                label="Challenge Type"
                type="select"
                labelClassName="!text-[#8E8E93] !text-xs !font-medium"
                inputClassName="!bg-[#222226] !border-[#2E2E34] !text-white !rounded-xl"
                options={[
                  { label: "Distance", value: "Distance" },
                  { label: "Track Laps", value: "Track Laps" },
                  { label: "Modifications", value: "Modifications" },
                  { label: "Night Drive", value: "Night Drive" },
                ]}
              />
            </div>

            {/* Requirement & XP Reward */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <span className="block text-xs font-medium text-[#8E8E93] mb-1">
                  Requirement
                </span>
                <div className="flex items-center gap-2">
                  <div className="flex-1">
                    <FormField
                      name="requirementValue"
                      placeholder="100"
                      type="text"
                      className="!mb-0"
                      inputClassName="!bg-[#222226] !border-[#2E2E34] !text-white placeholder:!text-[#5A5A60] !rounded-xl !py-2.5"
                    />
                  </div>
                  <div className="w-28 shrink-0">
                    <FormField
                      name="requirementUnit"
                      type="select"
                      className="!mb-0"
                      inputClassName="!bg-[#222226] !border-[#2E2E34] !text-white !rounded-xl"
                      options={[
                        { label: "Miles", value: "Miles" },
                        { label: "Laps", value: "Laps" },
                        { label: "Drives", value: "Drives" },
                        { label: "Mods", value: "Mods" },
                      ]}
                    />
                  </div>
                </div>
              </div>

              <FormField
                name="xpReward"
                label="XP Reward"
                placeholder="500"
                type="text"
                labelClassName="!text-[#8E8E93] !text-xs !font-medium"
                inputClassName="!bg-[#222226] !border-[#2E2E34] !text-white placeholder:!text-[#5A5A60] !rounded-xl !py-2.5"
              />
            </div>

            {/* Start Date & End Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <FormField
                name="startDate"
                label="Start Date"
                type="date"
                placeholder="mm/dd/yyyy"
                labelClassName="!text-[#8E8E93] !text-xs !font-medium"
                inputClassName="!bg-[#222226] !border-[#2E2E34] !text-white !rounded-xl !w-full"
              />

              <FormField
                name="endDate"
                label="End Date"
                type="date"
                placeholder="mm/dd/yyyy"
                labelClassName="!text-[#8E8E93] !text-xs !font-medium"
                inputClassName="!bg-[#222226] !border-[#2E2E34] !text-white !rounded-xl !w-full"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pt-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 px-6 rounded-xl text-xs font-semibold text-white bg-[#222226] hover:bg-[#2C2C32] transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-3 px-6 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-[#FF2E86] to-[#FF7A1A] hover:opacity-95 shadow-lg shadow-[#FF2E86]/20 transition-all cursor-pointer"
              >
                Published
              </button>
            </div>
          </Form>
        </div>
      </Modal>
    </ConfigProvider>
  );
}
