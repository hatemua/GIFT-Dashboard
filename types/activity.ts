export interface ActivitiesResponse {
  data: ActivityLog[];
  count: number;
  limit: number;
  page: number;
}

export interface NewMemberAddedLog {
  created_at: string;
  event: "new_member_added";
  member_gic: string;
}

export interface NewUserAddedLog {
  created_at: string;
  event: "new_user_added";
  user_id: string;
}

export interface NewAssetMintedLog {
  created_at: string;
  event: "new_asset_minted";
  token_id: string;
}

export interface NewGoldAccountAddedLog {
  created_at: string;
  event: "new_gold_account_added";
  igan: string;
}

export interface AssetStatusChangeLog {
  created_at: string;
  event: "asset_status_change";
  token_id: string;
}

export interface AssetBurnedLog {
  created_at: string;
  event: "asset_burned";
  token_id: string;
}

export interface AssetCustodyChangeLog {
  created_at: string;
  event: "asset_custody_change";
  token_id: string;
}

export type ActivityLog =
  | NewMemberAddedLog
  | NewUserAddedLog
  | NewAssetMintedLog
  | NewGoldAccountAddedLog
  | AssetStatusChangeLog
  | AssetBurnedLog
  | AssetCustodyChangeLog;
