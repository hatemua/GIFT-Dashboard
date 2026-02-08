import { useCallback } from "react";
import { useDocumentStore } from "@/store/documentStore";
import {
  DocumentUploadInput,
  DocumentUploadSetInput,
  DocumentUploadResponse,
} from "@/types/document";

export const useDocument = () => {
  const {
    documentSet,
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
    (data: DocumentUploadInput): Promise<void> => uploadDocument(data),
    [uploadDocument]
  );

  const handleUploadDocumentSet = useCallback(
    (data: DocumentUploadSetInput): Promise<void> => uploadDocumentSet(data),
    [uploadDocumentSet]
  );

  const handleFetchDocumentHash = useCallback(
    (sod_id: string, document_id: string): Promise<void> =>
      fetchDocumentHash(sod_id, document_id),
    [fetchDocumentHash]
  );

  const handleVerifyDocument = useCallback(
    (document_id: string, document_base64: string): Promise<void> =>
      verifyDocument(document_id, document_base64),
    [verifyDocument]
  );

  const handleSelectDocument = useCallback(
    (doc?: DocumentUploadResponse) => setSelectedDocument(doc),
    [setSelectedDocument]
  );

  const handleClearError = useCallback(() => clearError(), [clearError]);

  return {
    documentSet,
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
