import React, { useEffect } from 'react';
import { ToastMessage } from '../types/toast';
import { CheckCircle2, Heart, Scale, Info, AlertTriangle, X } from 'lucide-react';

interface ToastContainerProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onDismiss }) => {
  return (
    <div
      className="toast-stack-container"
      role="region"
      aria-label="Notificaciones del sistema"
    >
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </div>
  );
};

interface ToastItemProps {
  toast: ToastMessage;
  onDismiss: (id: string) => void;
}

const ToastItem: React.FC<ToastItemProps> = ({ toast, onDismiss }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(toast.id);
    }, toast.duration || 3800);

    return () => clearTimeout(timer);
  }, [toast, onDismiss]);

  const getIcon = () => {
    switch (toast.type) {
      case 'bookmark':
        return <Heart size={16} fill="#E11D48" color="#E11D48" />;
      case 'compare':
        return <Scale size={16} color="var(--accent-gold)" />;
      case 'success':
        return <CheckCircle2 size={16} color="#16A34A" />;
      case 'warning':
        return <AlertTriangle size={16} color="#D97706" />;
      case 'info':
      default:
        return <Info size={16} color="#2563EB" />;
    }
  };

  return (
    <div
      className={`toast-item toast-${toast.type}`}
      role="status"
      aria-live="polite"
    >
      <div className="toast-icon-wrapper">{getIcon()}</div>
      <div className="toast-content">
        <div className="toast-title">{toast.title}</div>
        {toast.description && <div className="toast-desc">{toast.description}</div>}
      </div>
      <button
        className="toast-close-btn"
        onClick={() => onDismiss(toast.id)}
        aria-label="Cerrar notificación"
      >
        <X size={14} />
      </button>
    </div>
  );
};
