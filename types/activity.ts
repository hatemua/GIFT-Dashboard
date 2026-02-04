export type ActivityType =
  | "ASSET_MINTED"
  | "TRANSACTION_SETTLED"
  | "MEMBER_JOINED"
  | "ACCOUNT_CREATED";

export interface ActivityItem {
  id: string;
  type: ActivityType;
  title: string;
  reference: string;
  created_at: string;
}

export interface ActivitiesResponse {
  data: ActivityItem[];
  page: number;
  limit: number;
  total: number;
  total_pages: number;
}
