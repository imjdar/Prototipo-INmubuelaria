export type ToastType = 'success' | 'info' | 'bookmark' | 'compare' | 'warning';

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type: ToastType;
  duration?: number;
}
