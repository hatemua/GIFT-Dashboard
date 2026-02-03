"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { FileText, X, Upload, CheckCircle } from "lucide-react";

interface FileUploadProps {
  value?: File | null;
  onChange: (file: File | null) => void;
  accept?: string;
  className?: string;
  maxSize?: number;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  value,
  onChange,
  accept = "application/pdf",
  className,
  maxSize = 10,
}) => {
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const [isDragOver, setIsDragOver] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleFileChange = (file: File | null) => {
    setError(null);
    
    if (file) {
      if (!file.type.includes('pdf') && !file.name.toLowerCase().endsWith('.pdf')) {
        setError('Only PDF files are allowed');
        return;
      }
      
      if (file.size > maxSize * 1024 * 1024) {
        setError(`File must be under ${maxSize}MB`);
        return;
      }
    }
    
    onChange(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFileChange(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  return (
    <div className={className}>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        hidden
        onChange={(e) => handleFileChange(e.target.files?.[0] ?? null)}
      />
      
      <div
        className={`relative ${!value ? 'cursor-pointer' : ''}`}
        onClick={!value ? () => inputRef.current?.click() : undefined}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        {!value ? (
          <div
            className={`
              border-2 border-dashed rounded-lg p-4 text-center transition-all duration-200
              ${isDragOver 
                ? 'border-gold-500 bg-gold-50 border-solid' 
                : 'border-gray-300 hover:border-gold-400 hover:bg-gold-50/50'
              }
            `}
          >
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className={`
                w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-200
                ${isDragOver 
                  ? 'bg-gold-100 scale-110' 
                  : 'bg-gray-100 group-hover:bg-gold-100'
                }
              `}>
                <Upload className={`
                  h-5 w-5 sm:h-6 sm:w-6 transition-colors duration-200
                  ${isDragOver ? 'text-gold-600' : 'text-gray-400 group-hover:text-gold-600'}
                `} />
              </div>
              <div className="text-left sm:text-center flex-1">
                <p className="text-sm font-medium text-gray-900 mb-1">
                  {isDragOver ? 'Drop file here' : 'Upload document'}
                </p>
                <p className="text-xs text-gray-500 mb-2">
                  Drag & drop or click to browse
                </p>
                <div className="inline-flex items-center gap-1.5 text-xs text-gray-600 bg-gray-100 px-2.5 py-1 rounded-full">
                  <FileText className="h-3 w-3" />
                  PDF • Max {maxSize}MB
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-lg border border-gray-200 bg-white p-3 hover:shadow-sm transition-shadow">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-50 rounded-lg">
                <CheckCircle className="h-4 w-4 text-green-600" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {value.name}
                  </p>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onChange(null);
                    }}
                    className="h-6 w-6 p-0 hover:bg-red-50 hover:text-red-600"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <FileText className="h-3 w-3" />
                    PDF
                  </span>
                  <span>{(value.size / 1024 / 1024).toFixed(1)}MB</span>
                  <span className="text-green-600 font-medium">✓ Uploaded</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {error && (
        <div className="mt-1.5 text-xs text-red-600 bg-red-50 border border-red-200 rounded px-2.5 py-1.5 animate-in fade-in">
          {error}
        </div>
      )}
    </div>
  );
};