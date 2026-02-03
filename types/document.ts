export interface DocumentUploadInput {
  document_id: string;
  document_base64: string;
  document_type: string; // e.g., 'certificate'
  document_url: string;
  sod_id: string;
}

export interface Document {
  document_id: string;
  document_type: string;
  document_url: string;
  sod_id: string;
  created_at: string;
}

export interface DocumentUploadSetInput {
  sod_id: string;
  documents: DocumentUploadInput[];
}

export interface DocumentHash {
  document_id: string;
  sod_id: string;
  document_hash: string;
  set_hash: string;
  document_type: string;
  certification_date: string; // ISO date string
  blockchain_reference: string;
  block_number: number;
}

export interface DocumentVerification {
  valid: boolean;
  document_id: string;
  stored_hash: string;
  calculated_hash: string;
  match: boolean;
  original_certification_date: string;
  verification_timestamp: string;
  blockchain_block: number;
}