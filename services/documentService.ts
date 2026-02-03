import { api } from "@/lib/axios";
import {
  DocumentUploadInput,
  Document,
  DocumentUploadSetInput,
  DocumentHash,
  DocumentVerification,
} from "@/types/document";

export const documentService = {
  uploadDocument: async (data: DocumentUploadInput): Promise<Document> => {
    const response = await api.post("/documents/upload", data);
    return response.data as Document;
  },

  uploadDocumentSet: async (
    data: DocumentUploadSetInput,
  ): Promise<Document[]> => {
    const response = await api.post("/documents/upload-set", data);
    return response.data as Document[];
  },

  getDocumentHash: async (
    sod_id: string,
    document_id: string,
  ): Promise<DocumentHash> => {
    const response = await api.get("/documents/hash", {
      params: { sod_id, document_id },
    });
    return response.data as DocumentHash;
  },

  verifyDocument: async (
    document_id: string,
    document_base64: string,
  ): Promise<DocumentVerification> => {
    const response = await api.post("/documents/verify", {
      document_id,
      document_base64,
    });
    return response.data as DocumentVerification;
  },
};
