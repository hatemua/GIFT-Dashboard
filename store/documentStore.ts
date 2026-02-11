import { create } from "zustand";
import { documentService } from "@/services/documentService";
import {
  DocumentUploadInput,
  DocumentUploadSetInput,
  DocumentUploadResponse,
  DocumentSetUploadResponse,
  DocumentHash,
  DocumentVerification,
} from "@/types/document";

interface DocumentStore {
  documents: DocumentUploadResponse[];
  selectedDocument?: DocumentUploadResponse;
  documentSet?: DocumentSetUploadResponse;
  documentHash?: DocumentHash;
  verificationResult?: DocumentVerification;

  loading: boolean;
  error?: string;

  verifyLoading: boolean;
  verifyError?: string;

  uploadDocument: (data: DocumentUploadInput) => Promise<void>;
  uploadDocumentSet: (data: DocumentUploadSetInput) => Promise<void>;
  fetchDocumentHash: (sod_id: string, document_id: string) => Promise<void>;
  verifyDocument: (document_id: string, document_base64: string) => Promise<DocumentVerification | undefined>;

  setSelectedDocument: (doc?: DocumentUploadResponse) => void;
  clearError: () => void;
  clearVerifyError: () => void;
}

export const useDocumentStore = create<DocumentStore>((set, get) => ({
  documents: [],
  selectedDocument: undefined,
  documentSet: undefined,
  documentHash: undefined,
  verificationResult: undefined,

  loading: false,
  error: undefined,

  verifyLoading: false,
  verifyError: undefined,

  uploadDocument: async (data) => {
    set({ loading: true, error: undefined });
    try {
      const doc: DocumentUploadResponse =
        await documentService.uploadDocument(data);

      set({
        documents: [...get().documents, doc],
        selectedDocument: doc,
        loading: false,
      });
    } catch (err: any) {
      set({
        error: err.message || "Failed to upload document",
        loading: false,
      });
    }
  },

  uploadDocumentSet: async (data) => {
    set({ loading: true, error: undefined });
    try {
      const docSet: DocumentSetUploadResponse =
        await documentService.uploadDocumentSet(data);

      set({
        documentSet: docSet,
        documents: [
          ...get().documents,
          ...docSet.documents.map((d) => ({
            document_id: d.document_id,
            sod_id: data.sod_id,
            document_hash: d.document_hash,
            document_type: d.document_type,
            file_size_bytes: 0,
            stored_at: docSet.stored_at,
            blockchain_tx: docSet.blockchain_tx,
            status: docSet.status,
          })),
        ],
        loading: false,
      });
    } catch (err: any) {
      set({
        error: err.message || "Failed to upload document set",
        loading: false,
      });
    }
  },

  fetchDocumentHash: async (sod_id, document_id) => {
    set({ loading: true, error: undefined });
    try {
      const hash: DocumentHash =
        await documentService.getDocumentHash(sod_id, document_id);

      set({ documentHash: hash, loading: false });
    } catch (err: any) {
      set({
        error: err.message || "Failed to fetch document hash",
        loading: false,
      });
    }
  },

  // ✅ UPDATED VERIFY
  verifyDocument: async (document_id, document_base64) => {
    set({ verifyLoading: true, verifyError: undefined });
    try {
      const result: DocumentVerification =
        await documentService.verifyDocument(
          document_id,
          document_base64
        );

      set({
        verificationResult: result,
        verifyLoading: false,
      });
      return result;
    } catch (err: any) {
      set({
        verifyError: err.message || "Failed to verify document",
        verifyLoading: false,
      });
    }
  },

  setSelectedDocument: (doc) => set({ selectedDocument: doc }),

  clearError: () => set({ error: undefined }),
  clearVerifyError: () => set({ verifyError: undefined }),
}));
