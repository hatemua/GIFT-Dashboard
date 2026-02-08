export interface DocumentUploadInput {
  document_id: string;
  document_base64: string;
  document_type: string; // e.g., 'certificate'
  document_url: string;
  sod_id?: string;
}

export interface DocumentUploadResponse {
  status: "success" | "failure";
  document_id: string;
  sod_id: string;
  document_hash: string;
  document_type: string;
  file_size_bytes: number;
  stored_at: string; // ISO date string
  blockchain_tx: string;
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

export interface DocumentSetItem {
  document_id: string;
  document_hash: string;
  document_type: string;
}

export interface DocumentSetUploadResponse {
  status: "success" | "failure";
  sod_id: string;
  document_count: number;
  documents: DocumentSetItem[];
  individual_hashes: string[];
  set_hash: string;
  stored_at: string; // ISO date string
  blockchain_tx: string;
}
