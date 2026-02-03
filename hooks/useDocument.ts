import { useCallback } from "react";
import { useDocumentStore } from "@/store/documentStore";
import {
  DocumentUploadInput,
  DocumentUploadSetInput,
} from "@/types/document";

export const useDocument = () => {
  const {
    documents,
    selectedDocument,
    documentHash,
    verificationResult,
    loading,
    error,
    uploadDocument,
    uploadDocumentSet,
    fetchDocumentHash,
    verifyDocument,
    setSelectedDocument,
    clearError,
  } = useDocumentStore();

  const handleUploadDocument = useCallback(
    (data: DocumentUploadInput) => uploadDocument(data),
    [uploadDocument]
  );

  const handleUploadDocumentSet = useCallback(
    (data: DocumentUploadSetInput) => uploadDocumentSet(data),
    [uploadDocumentSet]
  );

  const handleFetchDocumentHash = useCallback(
    (sod_id: string, document_id: string) => fetchDocumentHash(sod_id, document_id),
    [fetchDocumentHash]
  );

  const handleVerifyDocument = useCallback(
    (document_id: string, document_base64: string) =>
      verifyDocument(document_id, document_base64),
    [verifyDocument]
  );

  const handleSelectDocument = useCallback(
    (doc?: typeof selectedDocument) => setSelectedDocument(doc),
    [setSelectedDocument]
  );

  const handleClearError = useCallback(() => clearError(), [clearError]);

  return {
    documents,
    selectedDocument,
    documentHash,
    verificationResult,
    loading,
    error,
    uploadDocument: handleUploadDocument,
    uploadDocumentSet: handleUploadDocumentSet,
    fetchDocumentHash: handleFetchDocumentHash,
    verifyDocument: handleVerifyDocument,
    selectDocument: handleSelectDocument,
    clearError: handleClearError,
  };
};
