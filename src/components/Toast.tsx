import React from "react";
import { CheckIcon, CloseIcon } from "./Icons";

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
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full">
      {toasts.map((toast) => {
        const badgeColors = {
          GET: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
          POST: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
          PUT: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
          PATCH: "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300",
          DELETE: "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300",
        };

        return (
          <div
            key={toast.id}
            className="flex items-start gap-3 rounded-2xl border border-zinc-200 bg-white/95 p-3.5 shadow-xl backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-900/95"
          >
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600 dark:bg-emerald-950/70 dark:text-emerald-400">
              <CheckIcon className="h-4 w-4" />
            </div>

            <div className="flex-1 text-xs">
              <div className="flex items-center gap-1.5 font-bold text-zinc-900 dark:text-zinc-100">
                {toast.methodBadge && (
                  <span
                    className={`rounded px-1.5 py-0.5 text-[10px] font-mono font-extrabold ${badgeColors[toast.methodBadge]}`}
                  >
                    {toast.methodBadge}
                  </span>
                )}
                <span>{toast.title}</span>
              </div>
              {toast.detail && (
                <p className="mt-0.5 text-zinc-500 dark:text-zinc-400">{toast.detail}</p>
              )}
            </div>

            <button
              onClick={() => onDismiss(toast.id)}
              className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
            >
              <CloseIcon className="h-4 w-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
