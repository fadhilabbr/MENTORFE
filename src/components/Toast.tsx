import React from "react";

export interface ToastMessage {
  id: string;
  type: "success" | "error" | "info";
  title: string;
  detail?: string;
  methodBadge?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export function Toast({ toasts, onDismiss }: ToastProps) {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="flex items-start justify-between gap-3 rounded-lg border border-zinc-200 bg-white p-3 shadow-lg"
        >
          <div className="flex-1 text-xs">
            <div className="flex items-center gap-1.5 font-semibold text-zinc-900">
              {toast.methodBadge && (
                <span className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[10px] text-zinc-700">
                  {toast.methodBadge}
                </span>
              )}
              <span>{toast.title}</span>
            </div>
            {toast.detail && (
              <p className="mt-1 text-zinc-500">{toast.detail}</p>
            )}
          </div>

          <button
            onClick={() => onDismiss(toast.id)}
            className="text-zinc-400 hover:text-zinc-600 text-xs"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}
