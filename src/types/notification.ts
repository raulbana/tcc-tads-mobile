export enum NotificationType {
  COMMENT = 'comment',
  LIKE = 'like',
  REPLY = 'reply',
  REMINDER = 'reminder',
  GENERAL = 'general',
}

export interface NotificationData {
  type: NotificationType;
  contentId?: string;
  commentId?: string;
  userId?: string;
  [key: string]: any;
}

export interface NotificationPayload {
  notification?: {
    title: string;
    body: string;
    sound?: string;
    badge?: number;
  };
  data?: NotificationData;
  messageId?: string;
  from?: string;
}

