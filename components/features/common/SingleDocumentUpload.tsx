"use client";

import { useState } from "react";
import { FileUpload } from "@/components/ui/file-upload";
import { Button } from "@/components/ui/button";
import { useDocument } from "@/hooks/useDocument";
import { fileToBase64 } from "@/lib/utils";

interface Props {
  sod_id: string;
  document_id: string;
  document_type?: string;
  auto_verify_hash?: boolean;
}

export function SingleDocumentUpload({
  sod_id,
  document_id,
  document_type = "certificate",
  auto_verify_hash = false,
}: Props) {
  const [file, setFile] = useState<File | null>(null);

  const {
    uploadDocument,
    verifyDocument,
    loading,
    error,
    verificationResult,
  } = useDocument();

  const handleUpload = async () => {
    if (!file) return;

    const base64 = await fileToBase64(file);

    await uploadDocument({
      document_id,
      document_type,
      document_url: "https://url_of_the_document",
      document_base64: base64,
    });

    if (auto_verify_hash) {
      await verifyDocument(document_id, base64);
    }
  };

  return (
    <div className="space-y-4">
      <FileUpload value={file} onChange={setFile} />

      <Button
        onClick={handleUpload}
        disabled={!file || loading}
        className="w-full"
      >
        Upload document
      </Button>

      {error && <p className="text-sm text-red-600">{error}</p>}
      {verificationResult && verificationResult.match && (
        <p className="text-sm text-green-600">
          ✅ Document verified
        </p>
      )}
    </div>
  );
}
