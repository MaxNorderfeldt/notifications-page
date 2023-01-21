export interface INotification {
  read: Boolean;
  name: string;
  action: { type: string; target?: string };
  date: string;
  type: string;
}

interface readAllNotifications {
  readAllNotifications(): void;
}
