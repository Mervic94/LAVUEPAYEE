
export interface ProofData {
  type: 'screenshot' | 'click_tracking' | 'time_spent' | 'geolocation';
  data?: string;
  metadata?: {
    clickCount?: number;
    timeSpent?: number;
    latitude?: number;
    longitude?: number;
  };
}

export interface TaskSubmission {
  taskId: string;
  userId: string;
  proof: ProofData[];
  startTime: number;
  completionTime: number;
  taskType: TaskType;
}

export type TaskType = 'video_watch' | 'ad_click' | 'survey' | 'social_share' | 'app_download';
