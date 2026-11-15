import React, { useState } from "react";
import { CheckIcon } from "./Icons";

interface TodoItem {
  id: string;
  todoNumber: string;
  category: "Types" | "Mock Data" | "UI Card" | "Form Modal" | "API Route" | "Consume API";
  task: string;
  file: string;
  note: string;
}

const INITIAL_TODOS: TodoItem[] = [
  {
    id: "t-1",
    todoNumber: "TODO 1",
    category: "Types",
    task: "Definisikan Interface Product & DTOs (Create, Update, Patch)",
    file: "src/types/product.ts",
    note: "Menjamin keamanan tipe data untuk payload POST, PUT, dan PATCH.",
  },
  {
    id: "t-2",
    todoNumber: "TODO 2",
    category: "Mock Data",
    task: "Siapkan Data Store In-Memory & Getter/Setter",
    file: "src/data/mockProducts.ts",
    note: "Menyediakan mock data awal agar bisa dicoba tanpa database luar.",
  },
  {
    id: "t-3",
    todoNumber: "TODO 3",
    category: "UI Card",
    task: "Lengkapi Desain Kartu Produk, Format Rupiah, & Tombol Aksi",
    file: "src/components/ProductCard.tsx",
    note: "Tampilkan badge status, rating, tombol PUT, Quick PATCH, dan DELETE.",
  },
  {
    id: "t-4",
    todoNumber: "TODO 4",
    category: "Form Modal",
    task: "Buat Validasi Form & Konstruksi Payload Modal",
    file: "src/components/ProductFormModal.tsx",
    note: "Validasi field title/price dan kirimkan data ke parent handler.",
  },
  {
    id: "t-5",
    todoNumber: "TODO 5",
    category: "API Route",
    task: "Implementasi GET /api/products (Read & Filter)",
    file: "src/app/api/products/route.ts",
    note: "Baca query params search, category, status lalu kembalikan JSON list.",
  },
  {
    id: "t-6",
    todoNumber: "TODO 6",
    category: "API Route",
    task: "Implementasi POST /api/products (Create Item)",
    file: "src/app/api/products/route.ts",
    note: "Validasi input, generate ID baru, simpan ke store, return status 201.",
  },
  {
    id: "t-7",
    todoNumber: "TODO 7",
    category: "API Route",
    task: "Implementasi PUT /api/products/[id] (Full Replacement)",
    file: "src/app/api/products/[id]/route.ts",
    note: "Gantikan seluruh data produk lama dengan payload baru.",
  },
  {
    id: "t-8",
    todoNumber: "TODO 8",
    category: "API Route",
    task: "Implementasi PATCH /api/products/[id] (Partial Update)",
    file: "src/app/api/products/[id]/route.ts",
    note: "Update HANYA atribut yang dikirim (misal: toggle isAvailable atau stok).",
  },
  {
    id: "t-9",
    todoNumber: "TODO 9",
    category: "API Route",
    task: "Implementasi DELETE /api/products/[id] (Hapus Item)",
    file: "src/app/api/products/[id]/route.ts",
    note: "Cari ID produk, filter keluar dari store, kembalikan response 200.",
  },
  {
    id: "t-10",
    todoNumber: "TODO 10",
    category: "Consume API",
    task: "Hubungkan Client ke Endpoint (Fetch GET, POST, PUT, PATCH, DELETE)",
    file: "src/app/page.tsx",
    note: "Hubungkan handler tombol di UI dengan fetch API dan update state React.",
  },
];

export function LearningTodoPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [checkedIds, setCheckedIds] = useState<string[]>([
    "t-1",
    "t-2",
    "t-3",
    "t-4",
    "t-5",
    "t-6",
    "t-7",
    "t-8",
    "t-9",
    "t-10",
  ]);

  const toggleCheck = (id: string) => {
    setCheckedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-indigo-200 bg-gradient-to-r from-indigo-50/70 via-purple-50/40 to-blue-50/60 shadow-xs dark:border-indigo-900/50 dark:from-indigo-950/20 dark:via-purple-950/10 dark:to-blue-950/20">
      <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white font-bold text-sm shadow-xs">
            ✓
          </div>
          <div>
            <h2 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <span>Roadmap TODO 1 s/d TODO 10 Langsung di Kode</span>
              <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-[11px] font-semibold text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300">
                {checkedIds.length} / {INITIAL_TODOS.length} Selesai
              </span>
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Setiap file kode telah dilengkapi panduan `TODO 1` hingga `TODO 10` lengkap dengan penjelasan dan instruksi.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="self-start rounded-xl border border-indigo-300/80 bg-white px-3.5 py-1.5 text-xs font-semibold text-indigo-700 shadow-2xs hover:bg-indigo-50 dark:border-indigo-800 dark:bg-zinc-800 dark:text-indigo-200 sm:self-auto"
        >
          {isOpen ? "Tutup Daftar TODO ▲" : "Buka Daftar TODO (1 s/d 10) ▼"}
        </button>
      </div>

      {isOpen && (
        <div className="border-t border-indigo-100 bg-white/70 p-4 backdrop-blur-xs dark:border-indigo-950 dark:bg-zinc-900/80">
          {/* Penjelasan Singkat Konsep PUT vs PATCH */}
          <div className="mb-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-3 text-xs dark:border-amber-900/40 dark:bg-amber-950/30">
              <span className="font-bold text-amber-800 dark:text-amber-300">
                PUT (Full Replacement):
              </span>
              <p className="mt-1 text-zinc-600 dark:text-zinc-400">
                Menggantikan <strong>seluruh data entitas</strong>. Klien mengirimkan semua atribut produk melalui form edit.
              </p>
            </div>
            <div className="rounded-xl border border-purple-200 bg-purple-50/70 p-3 text-xs dark:border-purple-900/40 dark:bg-purple-950/30">
              <span className="font-bold text-purple-800 dark:text-purple-300">
                PATCH (Partial Update):
              </span>
              <p className="mt-1 text-zinc-600 dark:text-zinc-400">
                Mengubah <strong>hanya field tertentu</strong> tanpa menyentuh field lain. Contoh: tombol toggle status ketersediaan atau stok di kartu!
              </p>
            </div>
          </div>

          {/* Daftar Checklist TODO 1 s/d 10 */}
          <div className="space-y-2">
            {INITIAL_TODOS.map((todo) => {
              const isChecked = checkedIds.includes(todo.id);
              return (
                <div
                  key={todo.id}
                  onClick={() => toggleCheck(todo.id)}
                  className="group flex cursor-pointer items-start gap-3 rounded-xl border border-zinc-200/70 bg-white p-2.5 transition-all hover:border-indigo-300 dark:border-zinc-800 dark:bg-zinc-800/80"
                >
                  <div
                    className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors ${
                      isChecked
                        ? "border-emerald-600 bg-emerald-600 text-white"
                        : "border-zinc-300 bg-white dark:border-zinc-600 dark:bg-zinc-700"
                    }`}
                  >
                    {isChecked && <CheckIcon className="h-3 w-3 stroke-[3]" />}
                  </div>

                  <div className="flex-1 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="rounded bg-indigo-100 px-1.5 py-0.5 font-mono text-[10px] font-bold text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300">
                        {todo.todoNumber}
                      </span>
                      <span className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-[10px] text-zinc-500 dark:bg-zinc-700 dark:text-zinc-400">
                        {todo.file}
                      </span>
                      <span
                        className={`font-semibold ${
                          isChecked
                            ? "text-zinc-500 line-through dark:text-zinc-400"
                            : "text-zinc-800 dark:text-zinc-100"
                        }`}
                      >
                        {todo.task}
                      </span>
                    </div>
                    <p className="mt-0.5 text-zinc-500 dark:text-zinc-400">{todo.note}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
