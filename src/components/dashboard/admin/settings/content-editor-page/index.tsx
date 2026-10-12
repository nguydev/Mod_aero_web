"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Edit3, Check, Save, ChevronLeft } from "lucide-react";
import RichTextEditor from "@/components/reuseable/rich-text-editor";

interface SettingsContentPageProps {
  title: string;
  initialContent: string;
  backHref?: string;
  backLabel?: string;
  canEdit?: boolean;
  onSave?: (newContent: string) => void;
}

export default function SettingsContentPage({
  title,
  initialContent,
  backHref = "/admin/settings/profile",
  backLabel = "Back to Settings",
  canEdit = true,
  onSave,
}: SettingsContentPageProps) {
  const [content, setContent] = useState(initialContent);
  const [tempContent, setTempContent] = useState(initialContent);
  const [isEditing, setIsEditing] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleStartEdit = () => {
    if (!canEdit) return;
    setTempContent(content);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setTempContent(content);
    setIsEditing(false);
  };

  const handleSave = () => {
    setContent(tempContent);
    setIsEditing(false);
    onSave?.(tempContent);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-5">
      <div>
        <Link
          href={backHref}
          className="inline-flex items-center gap-1 text-xs font-medium text-[#8E8E93] hover:text-white transition-colors"
        >
          <ChevronLeft size={14} />
          <span>{backLabel}</span>
        </Link>
      </div>

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          {isEditing ? `Edit ${title}` : title}
        </h1>

        {canEdit && (
          <div className="flex items-center gap-3">
            {saved && (
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/20 animate-fade-in">
                <Check size={13} />
                Saved Successfully
              </span>
            )}

            {!isEditing ? (
              <button
                type="button"
                onClick={handleStartEdit}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-[#FF2E86] hover:text-white border border-[#FF2E86] hover:bg-[#FF2E86]/10 transition-colors cursor-pointer"
              >
                <Edit3 size={14} />
                <span>Edit</span>
              </button>
            ) : (
              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="py-2 px-4 rounded-xl text-xs font-semibold text-white bg-[#1C1C20] hover:bg-[#28282E] border border-white/10 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="inline-flex items-center gap-1.5 py-2 px-5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#FF2E86] to-[#FF7A1A] hover:opacity-95 transition-all cursor-pointer shadow-none"
                >
                  <Save size={14} />
                  <span>Save</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Content Container */}
      <div className="rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-10 bg-[#141416] border border-[#26262B] min-h-[420px]">
        {isEditing && canEdit ? (
          <div className="space-y-4">
            <RichTextEditor
              value={tempContent}
              onChange={setTempContent}
              placeholder={`Edit ${title.toLowerCase()} content here...`}
              height="380px"
            />
          </div>
        ) : (
          <div
            className="sun-editor-content-view text-sm text-[#CCCCCC] leading-relaxed break-words"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        )}
      </div>
    </div>
  );
}
