"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { FileText, X } from "lucide-react";

interface FileUploadProps {
  value?: File | null;
  onChange: (file: File | null) => void;
  accept?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  value,
  onChange,
  accept = "*",
}) => {
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  return (
    <div className="space-y-2">
      {!value ? (
        <Button
          type="button"
          variant="outline"
          onClick={() => inputRef.current?.click()}
          className="w-full justify-start gap-2"
        >
          <FileText className="h-4 w-4" />
          Upload certificate (PDF)
        </Button>
      ) : (
        <div className="flex items-center justify-between rounded-card border p-3">
          <div className="flex items-center gap-2 text-sm">
            <FileText className="h-4 w-4 text-gold-600" />
            {value.name}
          </div>
          <Button
            type="button"
            size="icon"
            variant="ghost"
            onClick={() => onChange(null)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        hidden
        onChange={(e) => onChange(e.target.files?.[0] ?? null)}
      />
    </div>
  );
};
