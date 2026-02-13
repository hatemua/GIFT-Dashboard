export interface SearchResult {
  type: "asset" | "transaction" | "member";
  id: string;
  name: string;
  extra?: string;
}