import { create } from "zustand";
import { documentService } from "@/services/documentService";
import {
  Document,
  DocumentUploadInput,
  DocumentUploadSetInput,
  DocumentHash,
  DocumentVerification,
} from "@/types/document";

interface DocumentStore {
  documents: Document[];
  selectedDocument?: Document;
  documentHash?: DocumentHash;
  verificationResult?: DocumentVerification;
  loading: boolean;
  error?: string;

  uploadDocument: (data: DocumentUploadInput) => Promise<void>;
  uploadDocumentSet: (data: DocumentUploadSetInput) => Promise<void>;
  fetchDocumentHash: (sod_id: string, document_id: string) => Promise<void>;
  verifyDocument: (document_id: string, document_base64: string) => Promise<void>;
  setSelectedDocument: (doc?: Document) => void;
  clearError: () => void;
}

export const useDocumentStore = create<DocumentStore>((set, get) => ({
  documents: [],
  selectedDocument: undefined,
  documentHash: undefined,
  verificationResult: undefined,
  loading: false,
  error: undefined,

  uploadDocument: async (data) => {
    set({ loading: true, error: undefined });
    try {
      const doc = await documentService.uploadDocument(data);
      set({ documents: [...get().documents, doc], loading: false });
    } catch (err: any) {
      set({ error: err.message || "Failed to upload document", loading: false });
    }
  },

  uploadDocumentSet: async (data) => {
    set({ loading: true, error: undefined });
    try {
      const docs = await documentService.uploadDocumentSet(data);
      set({ documents: [...get().documents, ...docs], loading: false });
    } catch (err: any) {
      set({ error: err.message || "Failed to upload document set", loading: false });
    }
  },

  fetchDocumentHash: async (sod_id, document_id) => {
    set({ loading: true, error: undefined });
    try {
      const hash = await documentService.getDocumentHash(sod_id, document_id);
      set({ documentHash: hash, loading: false });
    } catch (err: any) {
      set({ error: err.message || "Failed to fetch document hash", loading: false });
    }
  },

  verifyDocument: async (document_id, document_base64) => {
    set({ loading: true, error: undefined });
    try {
      const result = await documentService.verifyDocument(document_id, document_base64);
      set({ verificationResult: result, loading: false });
    } catch (err: any) {
      set({ error: err.message || "Failed to verify document", loading: false });
    }
  },

  setSelectedDocument: (doc) => set({ selectedDocument: doc }),
  clearError: () => set({ error: undefined }),
}));
