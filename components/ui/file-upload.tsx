"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { FileText, X, Upload, CheckCircle } from "lucide-react";

type FileUploadProps =
  | {
      multiple?: false;
      value?: File | null;
      onChange: (file: File | null) => void;
      accept?: string;
      className?: string;
      maxSize?: number;
      disabled?: boolean;
    }
  | {
      multiple: true;
      value?: File[];
      onChange: (files: File[]) => void;
      accept?: string;
      className?: string;
      maxSize?: number;
      disabled?: boolean;
    };

export const FileUpload: React.FC<FileUploadProps> = ({
  value,
  onChange,
  accept = "application/pdf",
  className,
  maxSize = 10,
  disabled = false,
  multiple = false,
}) => {
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const [isDragOver, setIsDragOver] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  /* ---------------- File Validation ---------------- */
  const validateFile = (file: File): string | null => {
    if (!file.type.includes("pdf") && !file.name.toLowerCase().endsWith(".pdf")) {
      return "Only PDF files are allowed";
    }
    if (file.size > maxSize * 1024 * 1024) {
      return `File must be under ${maxSize}MB`;
    }
    return null;
  };

  /* ---------------- Single File ---------------- */
  const handleSingleFile = (file: File | null) => {
    if (disabled) return;
    setError(null);

    if (file) {
      const validationError = validateFile(file);
      if (validationError) {
        setError(validationError);
        return;
      }
    }

    (onChange as (file: File | null) => void)(file);
  };

  /* ---------------- Multiple Files ---------------- */
  const handleMultipleFiles = (files: FileList | null) => {
    if (disabled || !files) return;
    setError(null);

    const currentFiles = (value as File[]) || [];
    const newFiles: File[] = [];

    Array.from(files).forEach((file) => {
      const validationError = validateFile(file);
      if (validationError) {
        setError(validationError);
        return;
      }
      if (!currentFiles.some((f) => f.name === file.name)) {
        newFiles.push(file);
      }
    });

    if (newFiles.length) {
      (onChange as (files: File[]) => void)([...currentFiles, ...newFiles]);
    }
  };

  /* ---------------- Remove File ---------------- */
  const removeFile = (index: number) => {
    if (disabled) return;

    if (multiple) {
      if (!Array.isArray(value)) return;
      const updated = [...value];
      updated.splice(index, 1);
      (onChange as (files: File[]) => void)(updated);
    } else {
      (onChange as (file: File | null) => void)(null);
    }
  };

  /* ---------------- Drag & Drop ---------------- */
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (disabled) return;
    setIsDragOver(false);

    if (multiple) handleMultipleFiles(e.dataTransfer.files);
    else handleSingleFile(e.dataTransfer.files?.[0] ?? null);
  };

  /* ---------------- Render File List ---------------- */
  const fileList =
    multiple && Array.isArray(value)
      ? value
      : value
      ? [value as File]
      : [];

  return (
    <div className={`${className} ${disabled ? "opacity-60" : ""}`}>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        hidden
        multiple={multiple}
        disabled={disabled}
        onChange={(e) =>
          multiple
            ? handleMultipleFiles(e.target.files)
            : handleSingleFile(e.target.files?.[0] ?? null)
        }
      />

      {/* Upload Area */}
      <div
        className="relative cursor-pointer"
        onClick={!disabled ? () => inputRef.current?.click() : undefined}
        onDrop={handleDrop}
        onDragOver={(e) => {
          e.preventDefault();
          if (!disabled) setIsDragOver(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          setIsDragOver(false);
        }}
      >
        <div
          className={`border-2 border-dashed rounded-lg p-4 text-center transition-all duration-200
            ${
              disabled
                ? "border-gray-200 bg-gray-50"
                : isDragOver
                ? "border-gold-500 bg-gold-50 border-solid"
                : "border-gray-300 hover:border-gold-400 hover:bg-gold-50/50"
            }`}
        >
          <Upload className="h-6 w-6 mx-auto text-gray-400 mb-2" />
          <p className="text-sm font-medium text-gray-900">
            {disabled
              ? "Upload disabled"
              : multiple
              ? "Upload documents"
              : "Upload document"}
          </p>
          <p className="text-xs text-gray-500">Drag & drop or click to browse</p>
          <div className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-full inline-block mt-2">
            PDF • Max {maxSize}MB {multiple ? "each" : ""}
          </div>
        </div>
      </div>

      {/* File List */}
      {fileList.length > 0 && (
        <div className="mt-4 space-y-2">
          {fileList.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-white border border-gray-200 rounded-md px-3 py-2"
            >
              <div className="flex items-center gap-2 truncate">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm truncate">{file.name}</span>
                <span className="text-xs text-gray-500">
                  ({(file.size / 1024 / 1024).toFixed(1)}MB)
                </span>
              </div>

              <Button
                type="button"
                variant="ghost"
                size="sm"
                disabled={disabled}
                onClick={() => removeFile(index)}
                className="h-6 w-6 p-0 hover:bg-red-50 hover:text-red-600"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {error && (
        <div className="mt-2 text-xs text-red-600 bg-red-50 border border-red-200 rounded px-2 py-1">
          {error}
        </div>
      )}
    </div>
  );
};
