"use client";

import { useState } from "react";
import { FileUpload } from "@/components/ui/file-upload";
import { Button } from "@/components/ui/button";
import { useDocument } from "@/hooks/useDocument";
import { fileToBase64 } from "@/lib/utils";

interface Props {
  sod_id: string;
}

export function DocumentSetUpload({ sod_id }: Props) {
  const [files, setFiles] = useState<File[]>([]);

  const { uploadDocumentSet, loading, error, documentSet } =
    useDocument();

  const addFile = (file: File | null) => {
    if (!file) return;
    setFiles((prev) => [...prev, file]);
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUploadSet = async () => {
    const documents = await Promise.all(
      files.map(async (file, index) => ({
        sod_id,
        document_id: `DOC_${index + 1}`,
        document_type: "certificate",
        document_url: "",
        document_base64: await fileToBase64(file),
      }))
    );

    await uploadDocumentSet({
      sod_id,
      documents,
    });
  };

  return (
    <div className="space-y-4">
      <FileUpload onChange={addFile} />

      {files.map((file, index) => (
        <div key={index} className="flex items-center gap-2">
          <span className="text-sm">{file.name}</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => removeFile(index)}
          >
            Remove
          </Button>
        </div>
      ))}

      <Button
        onClick={handleUploadSet}
        disabled={!files.length || loading}
        className="w-full"
      >
        Upload document set ({files.length})
      </Button>

      {error && <p className="text-sm text-red-600">{error}</p>}

      {documentSet && (
        <div className="text-sm text-green-600">
          ✅ {documentSet.document_count} documents stored
          <br />
          Set hash: {documentSet.set_hash}
        </div>
      )}
    </div>
  );
}
