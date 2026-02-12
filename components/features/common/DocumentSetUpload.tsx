"use client";

import { useState } from "react";
import { FileUpload } from "@/components/ui/file-upload";
import { Button } from "@/components/ui/button";
import { useDocument } from "@/hooks/useDocument";
import { fileToBase64 } from "@/lib/utils";

interface Props {
  sodId: string;
  documentType: "audit_report" | "agreement" | "certificate";
  onUpload?: (sod_id: string) => void;
}

export function DocumentSetUpload({ sodId, documentType, onUpload }: Props) {
  const [files, setFiles] = useState<File[]>([]);

  const { uploadDocumentSet, loading, error, documentSet } = useDocument();

  /* ---------------- Add files ---------------- */
  const addFiles = async (newFiles: File | File[] | null) => {
    if (!newFiles) {
      setFiles([]);
      if (onUpload) onUpload("");
      return;
    }

    const filesArray = Array.isArray(newFiles) ? newFiles : [newFiles];
    setFiles((prev) => [...prev, ...filesArray]);
    // Upload & verify
    await handleUploadSet(filesArray);
  };

  /* ---------------- Upload the set ---------------- */
  const handleUploadSet = async (files: File[], ) => {
    if (!files.length) return;

    const documents = await Promise.all(
      files.map(async (file, index) => ({
        document_id: `DOC_${crypto.randomUUID()}`,
        document_type: documentType,
        document_url: "https://url_of_the_document",
        document_base64: await fileToBase64(file),
      })),
    );

    await uploadDocumentSet({
      sod_id: sodId,
      documents,
    });
  };

  return (
    <div className="space-y-4">
      {/* Multiple file upload */}
      <FileUpload multiple value={files} onChange={addFiles} />

      {/* Error */}
      {error && <p className="text-sm text-red-600">{error}</p>}

      {/* Success */}
      {documentSet && (
        <div className="text-sm text-green-600">
          ✅ {documentSet.document_count} documents stored
        </div>
      )}
    </div>
  );
}
