"use client";

import { useState } from "react";
import { FileUpload } from "@/components/ui/file-upload";
import { useDocument } from "@/hooks/useDocument";
import { fileToBase64 } from "@/lib/utils";

interface Props {
  document_type?: string;
  auto_verify_hash?: boolean;
  onVerified?: (base64: string) => void;
}

export function SingleDocumentUpload({
  document_type = "certificate",
  auto_verify_hash = false,
  onVerified,
}: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [verificationResult, setVerificationResult] = useState(false);
  
  const {
    uploadDocument,
    verifyDocument,
    loading,
    verifyLoading,
    error,
    verifyError,
  } = useDocument();

  const isProcessing = loading || verifyLoading;

  const handleUpload = async (selectedFile: File, document_id: string) => {
    const b64 = await fileToBase64(selectedFile);

    // Upload document
    await uploadDocument({
      document_id,
      document_type,
      document_url: "https://url_of_the_document",
      document_base64: b64,
    });

    // Verify if enabled
    if (auto_verify_hash) {
      const result = await verifyDocument(document_id, b64);
      if (result?.valid && onVerified) {
        onVerified(b64);
        setVerificationResult(true)
      }
    }
  };

  const handleFileChange = async (newFile: File | null) => {
    // Remove file
    if (!newFile) {
      setFile(null);
      setVerificationResult(false)
      if (onVerified) onVerified("");
      return;
    }

    setFile(newFile);

    const document_id = crypto.randomUUID();

    // Upload & verify
    await handleUpload(newFile, document_id);
  };

  return (
    <div className="space-y-4">
      <FileUpload value={file} onChange={handleFileChange} disabled={isProcessing} />

      {loading && (
        <p className="text-sm text-gray-600">
          <span className="inline-block animate-bounce">⏳</span> Uploading document...
        </p>
      )}

      {verifyLoading && (
        <p className="text-sm text-gray-600">
          <span className="inline-block animate-bounce">🔎</span> Verifying document...
        </p>
      )}

      {error && <p className="text-sm text-red-600">{error}</p>}

      {verifyError && <p className="text-sm text-red-600">{verifyError}</p>}

      {file && verificationResult && (
        <p className="text-sm text-green-600">✅ Document verified successfully</p>
      )}
    </div>
  );
}
