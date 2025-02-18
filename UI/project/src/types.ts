// Types for content and recommendations
export interface Analytics {
  postImpressions: number;
  followers: number;
  profileViews: number;
  searchAppearances: number;
}

export interface Recommendation {
  id: string;
  title: string;
  transcript: string;
  analytics: Analytics;
}

export interface ContentInfo {
  title: string;
  transcript: string;
  imageUrl: string;
  analytics: Analytics;
}

export interface ChatMessage {
  id: string;
  message: string;
  isUser: boolean;
  timestamp: Date;
}

export interface APIError {
  message: string;
  status: number;
}

// Video player orientation type
export type VideoOrientation = 'landscape' | 'portrait';