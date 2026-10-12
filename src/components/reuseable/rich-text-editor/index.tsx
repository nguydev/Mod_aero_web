"use client";

import React from "react";
import dynamic from "next/dynamic";
import "suneditor/dist/css/suneditor.min.css";

// Dynamic import SunEditor to prevent SSR issues in Next.js
const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[320px] bg-[#1C1C20] rounded-xl border border-[#2E2E34] flex items-center justify-center text-xs text-[#8E8E93] animate-pulse">
      Loading Editor...
    </div>
  ),
});

interface RichTextEditorProps {
  value: string;
  onChange: (content: string) => void;
  placeholder?: string;
  height?: string;
}

export default function RichTextEditor({
  value,
  onChange,
  placeholder = "Write your content here...",
  height = "350px",
}: RichTextEditorProps) {
  return (
    <div className="custom-sun-editor w-full">
      <SunEditor
        setContents={value}
        onChange={onChange}
        placeholder={placeholder}
        setOptions={{
          height: height,
          buttonList: [
            ["undo", "redo"],
            ["font", "fontSize", "formatBlock"],
            ["bold", "underline", "italic", "strike", "subscript", "superscript"],
            ["fontColor", "hiliteColor"],
            ["removeFormat"],
            ["outdent", "indent"],
            ["align", "horizontalRule", "list", "table"],
            ["link", "image"],
            ["fullScreen", "showBlocks", "codeView"],
          ],
        }}
      />
      <style jsx global>{`
        .custom-sun-editor .sun-editor {
          border-color: #2e2e34 !important;
          border-radius: 16px !important;
          overflow: hidden !important;
          background-color: #1c1c20 !important;
        }
        .custom-sun-editor .sun-editor .se-toolbar {
          background-color: #222226 !important;
          border-bottom: 1px solid #2e2e34 !important;
          outline: none !important;
        }
        .custom-sun-editor .sun-editor .se-btn {
          color: #cccccc !important;
        }
        .custom-sun-editor .sun-editor .se-btn:hover {
          background-color: #2e2e34 !important;
          color: #ffffff !important;
        }
        .custom-sun-editor .sun-editor .se-btn-module-border {
          border-color: #2e2e34 !important;
        }
        .custom-sun-editor .sun-editor .se-resizing-bar {
          background-color: #222226 !important;
          border-top: 1px solid #2e2e34 !important;
        }
        .custom-sun-editor .sun-editor .se-wrapper .se-wrapper-wysiwyg {
          background-color: #18181a !important;
          color: #e0e0e0 !important;
          min-height: 250px !important;
          font-family: inherit !important;
          font-size: 14px !important;
          line-height: 1.7 !important;
          padding: 20px !important;
        }
        .custom-sun-editor .sun-editor-editable {
          background-color: #18181a !important;
          color: #e0e0e0 !important;
        }
        .custom-sun-editor .sun-editor .se-dialog .se-dialog-inner .se-dialog-content {
          background-color: #222226 !important;
          border: 1px solid #2e2e34 !important;
          color: #ffffff !important;
          border-radius: 12px !important;
        }
        .custom-sun-editor .sun-editor .se-dialog .se-dialog-header {
          border-bottom: 1px solid #2e2e34 !important;
        }
        .custom-sun-editor .sun-editor .se-input-form,
        .custom-sun-editor .sun-editor .se-input-control {
          background-color: #18181a !important;
          border: 1px solid #2e2e34 !important;
          color: #ffffff !important;
        }
      `}</style>
    </div>
  );
}
