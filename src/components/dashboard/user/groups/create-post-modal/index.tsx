"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { Modal, Form, ConfigProvider, theme } from "antd";
import { Upload, X, AlertCircle } from "lucide-react";
import FormField from "@/components/form";

export interface CreatePostData {
  caption: string;
  hashtags: string;
  image: string | null;
}

interface CreatePostModalProps {
  open: boolean;
  onClose: () => void;
  onPublish: (data: CreatePostData) => void;
  loading?: boolean;
}

export default function CreatePostModal({
  open,
  onClose,
  onPublish,
  loading = false,
}: CreatePostModalProps) {
  const [caption, setCaption] = useState("");
  const [hashtags, setHashtags] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImage(url);
      setImageError(null);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImage(url);
      setImageError(null);
    }
  };

  const handleSubmit = () => {
    if (!image) {
      setImageError("Please upload an image for the post");
      return;
    }
    if (!caption.trim() || !hashtags.trim()) {
      return;
    }

    onPublish({
      caption,
      hashtags,
      image,
    });

    // Reset fields
    setCaption("");
    setHashtags("");
    setImage(null);
    setImageError(null);
    onClose();
  };

  const handleModalClose = () => {
    setCaption("");
    setHashtags("");
    setImage(null);
    setImageError(null);
    onClose();
  };

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorBgElevated: "#141416",
          colorPrimary: "#FF2E86",
          borderRadius: 24,
        },
        components: {
          Modal: {
            boxShadow: "none",
            boxShadowSecondary: "none",
            boxShadowTertiary: "none",
          },
        },
      }}
    >
      <Modal
        open={open}
        onCancel={handleModalClose}
        footer={null}
        centered
        width={480}
        closeIcon={
          <X className="w-5 h-5 text-[#8E8E93] hover:text-white transition-colors" />
        }
      >
        <div className="space-y-5">
          {/* Header Title */}
          <h2 className="text-xl font-bold text-white tracking-tight">
            Create Post
          </h2>

          <Form layout="vertical" onFinish={handleSubmit} className="space-y-4">
            {/* Image Upload Area */}
            <div className="space-y-1.5">
              {image ? (
                <div className="relative w-full h-[200px] rounded-2xl overflow-hidden border border-[#2E2E34] group">
                  <Image
                    src={image}
                    alt="Post preview"
                    fill
                    className="object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => setImage(null)}
                    className="absolute top-3 right-3 p-1.5 rounded-full bg-black/60 hover:bg-rose-500 text-white transition-colors cursor-pointer"
                    title="Remove image"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <div>
                  <div
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`w-full py-10 px-4 rounded-2xl border border-dashed transition-all cursor-pointer flex flex-col items-center justify-center text-center space-y-2.5 group ${imageError
                      ? "border-rose-500/80 bg-rose-500/5 hover:border-rose-400"
                      : "border-[#2E2E34] hover:border-[#FF2E86]/60 bg-[#18181B]/40 hover:bg-[#18181B]/70"
                      }`}
                  >
                    <div
                      className={`w-12 h-12 rounded-2xl border flex items-center justify-center transition-all ${imageError
                        ? "bg-rose-500/10 border-rose-500/30 text-rose-400"
                        : "bg-[#1F1F23] border-white/5 text-[#8E8E93] group-hover:text-[#FF2E86] group-hover:scale-105"
                        }`}
                    >
                      <Upload size={22} />
                    </div>
                    <p className="text-sm font-semibold text-[#8E8E93] group-hover:text-white transition-colors">
                      Upload images <span className="text-[#FF2E86]">*</span>
                    </p>
                  </div>

                  {imageError && (
                    <div className="flex items-center gap-1.5 text-xs text-rose-400 mt-1.5 px-1 font-medium">
                      <AlertCircle size={13} className="flex-shrink-0" />
                      <span>{imageError}</span>
                    </div>
                  )}
                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: "none" }}
                tabIndex={-1}
              />
            </div>

            {/* Caption FormField */}
            <div className="space-y-1">
              <FormField
                name="caption"
                label="CAPTION"
                required
                placeholder="Share your automotive moment..."
                type="textarea"
                rows={4}
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                labelClassName="!text-xs !font-bold !text-[#CCCCCC] !uppercase !tracking-wider"
                inputClassName="!bg-[#18181B] !border-[#2E2E34] !text-white placeholder:!text-[#5A5A60] !rounded-2xl focus:!border-[#FF2E86] !text-sm resize-none"
              />
            </div>

            {/* Hashtags FormField */}
            <div className="space-y-1">
              <FormField
                name="hashtags"
                label="HASHTAGS"
                required
                placeholder="#carmeet #velocity #supercar"
                type="text"
                value={hashtags}
                onChange={(e) => setHashtags(e.target.value)}
                labelClassName="!text-xs !font-bold !text-[#CCCCCC] !uppercase !tracking-wider"
                inputClassName="!bg-[#18181B] !border-[#2E2E34] !text-white placeholder:!text-[#5A5A60] !rounded-2xl focus:!border-[#FF2E86] !text-sm"
              />
            </div>

            {/* Publish Post Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 rounded-full text-sm font-bold text-white bg-gradient-to-r from-[#FF2E86] to-[#FF7A1A] hover:opacity-95 shadow-lg shadow-pink-500/25 transition-all cursor-pointer disabled:opacity-50"
              >
                {loading ? "Publishing..." : "Publish Post"}
              </button>
            </div>
          </Form>
        </div>
      </Modal>
    </ConfigProvider>
  );
}
