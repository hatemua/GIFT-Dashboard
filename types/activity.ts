export interface ActivitiesResponse {
  data: ActivityLog[];
  count: number;
  limit: number;
  page: number;
}

export interface NewMemberAddedLog {
  created_at: string;
  event: 'new_member_added';
  member_gic: string;
}

export interface NewUserAddedLog {
  created_at: string;
  event: 'new_user_added';
  user_id: string;
}

export type ActivityLog = NewMemberAddedLog | NewUserAddedLog;
