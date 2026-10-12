"use client";
import React, { ReactNode } from "react";
import {
  Form,
  Input,
  InputNumber,
  Select,
  Radio,
  Checkbox,
  DatePicker,
  TimePicker,
  Upload,
} from "antd";
import type { Rule } from "antd/es/form";
import { UploadCloud } from "lucide-react";

const { TextArea } = Input;
const { Dragger } = Upload;

export type Option = {
  label: string;
  value: string | number;
  extraText?: string;
};

export interface FormFieldProps {
  /** The type of input field to render */
  type?:
    | "text"
    | "email"
    | "password"
    | "number"
    | "select"
    | "radio"
    | "checkbox"
    | "file"
    | "file-input"
    | "textarea"
    | "tel"
    | "date"
    | "time";
  /** The name of the field, used by antd Form for binding */
  name: string | (string | number)[];
  /** The label displayed above the field */
  label?: string;
  /** Additional custom classes specifically for the label element */
  labelClassName?: string;
  /** Placeholder text for text, email, password, number, textarea, and select */
  placeholder?: string;
  /** Optional icon to display alongside text-based inputs */
  icon?: ReactNode;
  /** Which side of the input the icon sits on (default "left") */
  iconPosition?: "left" | "right";
  /** antd validation rules */
  rules?: Rule[];
  /** Marks the field as required (adds a rule + asterisk) */
  required?: boolean;
  /** Options array for select and radio types */
  options?: Option[];
  /** Custom color classes for focus states */
  colorClass?: string;
  /** Additional custom classes for the Form.Item wrapper */
  className?: string;
  /** Additional custom classes specifically for the inner input control */
  inputClassName?: string;
  /** Whether to allow multiple file uploads (only for type="file") */
  multiple?: boolean;
  /** Accept attribute for file uploads (e.g. 'image/*') */
  accept?: string;
  rows?: number;
  fileUploadClass?: string;
  maxCount?: number;
  showSearch?: boolean;
  maxLength?: number;
  onChange?: (...args: any[]) => void;
  disabled?: boolean;
  value?: any;
}

// Normalize the Upload event into the file list antd Form expects
const normFile = (e: any) => (Array.isArray(e) ? e : e?.fileList);

type FileLineInputProps = {
  fileList?: any[];
  onChange?: (info: any) => void;
  placeholder?: string;
  accept?: string;
  icon?: ReactNode;
  className?: string;
};

const FileLineInput: React.FC<FileLineInputProps> = ({
  fileList,
  onChange,
  placeholder,
  accept,
  icon,
  className,
}) => {
  const fileName =
    Array.isArray(fileList) && fileList.length > 0 ? fileList[0]?.name : "";

  return (
    <Upload
      accept={accept}
      maxCount={1}
      showUploadList={false}
      beforeUpload={() => false}
      fileList={Array.isArray(fileList) ? fileList : []}
      onChange={onChange}
      className="w-full [&_.ant-upload-select]:!block [&_.ant-upload-select]:!w-full"
    >
      <Input
        readOnly
        value={fileName}
        placeholder={placeholder}
        suffix={icon}
        className={className}
        style={{ width: "100%", cursor: "pointer" }}
      />
    </Upload>
  );
};

const FormSelect: React.FC<any> = ({ value, ...props }) => (
  <Select value={value === "" ? undefined : value} {...props} />
);

const FormField: React.FC<FormFieldProps> = ({
  type = "text",
  name,
  label,
  labelClassName = "",
  placeholder,
  icon,
  iconPosition = "left",
  rules = [],
  required = false,
  options = [],
  colorClass = "",
  className = "",
  inputClassName = "",
  multiple = false,
  accept,
  rows = 4,
  fileUploadClass = "",
  maxCount,
  showSearch = true,
  maxLength,
  onChange,
  disabled,
  value,
}) => {
  const hasRequiredRule = rules.some(
    (r) =>
      typeof r === "object" &&
      r !== null &&
      "required" in r &&
      (r as any).required,
  );

  const mergedRules: Rule[] = [
    ...rules,
    ...(required && !hasRequiredRule
      ? [{ required: true, message: `${label || "This field"} is required` }]
      : []),
  ];

  // Filter margin utility classes (e.g. mb-8) so margin applies ONLY to Form.Item and not inner input control
  const innerClass = (inputClassName || className || "")
    .split(" ")
    .filter((c) => !/^(m[btlryx]?-)/.test(c))
    .join(" ");

  const controlClass =
    `${colorClass} ${innerClass} !py-2.5 !px-3 !focus:outline-none !focus:ring-0 [&.ant-input-focused]:!border-[#FF2E86] [&.ant-input-affix-wrapper-focused]:!border-[#FF2E86] hover:!border-[#FF2E86]/70`.trim();

  const itemWrapperClass =
    `[&_.ant-form-item-label_label]:!text-sm [&_.ant-form-item-label_label]:!font-semibold [&_.ant-form-item-label_label]:!text-[#1a1a2e] ${className}`.trim();

  const labelNode = label ? (
    <span
      className={`text-sm font-semibold text-[#1a1a2e] ${labelClassName}`.trim()}
    >
      {label}
    </span>
  ) : undefined;

  const draggerName =
    typeof name === "string"
      ? name
      : Array.isArray(name)
        ? String(name[0])
        : "";

  const renderControl = () => {
    switch (type) {
      case "select":
        return (
          <FormSelect
            placeholder={placeholder}
            className={controlClass}
            mode={multiple ? "multiple" : undefined}
            maxCount={maxCount}
            showSearch={showSearch}
            optionFilterProp="label"
            disabled={disabled}
            value={value}
            onChange={onChange}
            options={options.map((opt) => ({
              value: opt.value,
              label: opt.extraText ? (
                <div className="flex flex-col">
                  <span className="!font-semibold">{opt.label}</span>
                  <span className="text-[10px] text-gray-500">
                    {opt.extraText}
                  </span>
                </div>
              ) : (
                opt.label
              ),
            }))}
          />
        );

      case "textarea":
        return (
          <TextArea
            rows={rows}
            placeholder={placeholder}
            className={controlClass}
            disabled={disabled}
            value={value}
            onChange={onChange}
          />
        );

      case "radio":
        return (
          <Radio.Group className={className} disabled={disabled} value={value} onChange={onChange}>
            {options.map((opt) => (
              <Radio key={opt.value} value={opt.value}>
                {opt.label}
              </Radio>
            ))}
          </Radio.Group>
        );

      case "number":
        return (
          <Input
            type="number"
            placeholder={placeholder}
            prefix={iconPosition === "left" ? icon : undefined}
            suffix={iconPosition === "right" ? icon : undefined}
            disabled={disabled}
            value={value}
            onChange={onChange}
            className={controlClass}
          />
        );

      case "password":
        return (
          <Input.Password
            placeholder={placeholder}
            prefix={icon}
            className={controlClass}
            disabled={disabled}
            value={value}
            onChange={onChange}
          />
        );

      case "date":
        return (
          <DatePicker
            placeholder={placeholder}
            className={`${controlClass} [&_.ant-picker-input_input]:!text-white [&_.ant-picker-input_input::placeholder]:!text-[#5A5A60] [&_.ant-picker-suffix]:!text-[#8E8E93] [&_.ant-picker-clear]:!text-[#8E8E93] [&.ant-picker-focused]:!border-[#FF2E86] hover:!border-[#FF2E86]/70`.trim()}
            style={{ width: "100%" }}
            disabled={disabled}
            value={value}
            onChange={onChange}
          />
        );

      case "time":
        return (
          <TimePicker
            placeholder={placeholder}
            className={`${controlClass} [&_.ant-picker-input_input]:!text-white [&_.ant-picker-input_input::placeholder]:!text-[#5A5A60] [&_.ant-picker-suffix]:!text-[#8E8E93] [&_.ant-picker-clear]:!text-[#8E8E93] [&.ant-picker-focused]:!border-[#FF2E86] hover:!border-[#FF2E86]/70`.trim()}
            style={{ width: "100%" }}
            disabled={disabled}
            value={value}
            onChange={onChange}
            format="h:mm a"
            use12Hours
          />
        );

      default:
        // text, email, tel
        return (
          <Input
            type={type}
            placeholder={placeholder}
            maxLength={maxLength}
            onChange={onChange}
            disabled={disabled}
            value={value}
            prefix={iconPosition === "left" ? icon : undefined}
            suffix={iconPosition === "right" ? icon : undefined}
            className={controlClass}
          />
        );
    }
  };

  // Checkbox binds its value via "checked"
  if (type === "checkbox") {
    return (
      <Form.Item
        name={name}
        layout="vertical"
        valuePropName="checked"
        rules={mergedRules}
        className={itemWrapperClass}
      >
        <Checkbox>{placeholder || label}</Checkbox>
      </Form.Item>
    );
  }

  // Single-line file picker styled like a text input
  if (type === "file-input") {
    return (
      <Form.Item
        name={name}
        label={labelNode}
        layout="vertical"
        rules={mergedRules}
        valuePropName="fileList"
        getValueFromEvent={normFile}
        className={itemWrapperClass}
      >
        <FileLineInput
          placeholder={placeholder}
          accept={accept}
          icon={icon}
          className={controlClass}
        />
      </Form.Item>
    );
  }

  // Drag & drop file upload area
  if (type === "file") {
    return (
      <Form.Item
        name={name}
        label={labelNode}
        layout="vertical"
        required={required}
        rules={mergedRules}
        valuePropName="fileList"
        getValueFromEvent={normFile}
        className={itemWrapperClass}
      >
        <Dragger
          name={draggerName}
          multiple={multiple}
          accept={accept}
          beforeUpload={() => false}
          listType="picture"
          className="!h-[360px]"
          rootClassName={fileUploadClass}
        >
          <p className="flex justify-center">
            <UploadCloud className="h-6 w-6 text-gray-400" />
          </p>
          <p className="ant-upload-text">
            Click to upload or Drag &amp; drop or{" "}
          </p>
          <p className="ant-upload-hint">PDF, JPG, PNG - max 10 MB each</p>
        </Dragger>
      </Form.Item>
    );
  }

  return (
    <Form.Item
      name={name}
      label={labelNode}
      layout="vertical"
      required={required}
      rules={mergedRules}
      className={itemWrapperClass}
    >
      {renderControl()}
    </Form.Item>
  );
};

export default FormField;
