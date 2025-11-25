# State Management (Simplified)

Panduan ringkas agar setiap state memakai tool yang tepat dan gampang dipahami.

---

## 1. Klasifikasi State
| Jenis | Gunakan | Contoh |
| --- | --- | --- |
| **UI Lokal** | `useState` / `useReducer` | Modal open, input form, tab aktif |
| **Server/Data** | SWR + hook `useXxx` | Data artikel, user list, stats API |
| **Global UI** | Context + `useState/useReducer` | theme, auth info, preferences |

---

## 2. Aturan Utama
1. Tentukan jenis state dulu.
2. **Jangan** duplikasi data SWR ke state lain.
3. **Jangan** prop drilling > 2 level—buat Context.
4. Semua fetch dibungkus hook `useXxx` di `/hooks`.
5. Context hanya untuk UI state, bukan data API.
6. Derived values pakai fungsi/helper atau `useMemo`, bukan state baru.

---

## 3. useState vs useReducer
- `useState`: state sederhana atau hanya 1 aksi (boolean, input).
- `useReducer`: state kompleks, multi-aksi (wizard, form besar).

Tips:
- Taruh logic update dalam reducer/helper, bukan di render.
- Hindari reducer untuk hal sepele (misal toggle).

---

## 4. Context
- Diperlukan saat data UI dibutuhkan lintas komponen (>2 level).
- Provider taruh di `/contexts`.
- Buat hook akses `useXxxContext`.
- Jangan taruh data API di context (pakai SWR).

---

## 5. SWR + Data Hooks
- Semua data remote → SWR (`useSWR`) di hook `useXxx`.
- Hook disimpan di `/hooks` agar reusable.
- Gunakan `mutate` setelah update/mutation.
- Jangan `setState` dengan data SWR, cukup pakai datanya langsung.

---

## 6. Struktur Folder
- `/hooks/useArticles.ts` dsb: fetch + logic data.
- `/contexts/ThemeContext.tsx`: provider global.
- `/components/...`: UI murni, memanggil hook/props saja.

---

## 7. Workflow Cepat
1. Identifikasi state: Lokal / Server / Global.
2. Pilih tool sesuai tabel.
3. Jika butuh fetch → buat hook `useXxx`.
4. Jika butuh global UI → context.
5. Hindari duplikasi atau prop drilling dalam proses.

---

## 8. Anti-patterns (Jangan Dilakukan)
- Menaruh semua state di Context/global.
- Meng-copy data SWR ke `useState`.
- Fetch langsung di komponen tanpa hook.
- Menggabungkan UI dan server state dalam satu context.
- Memakai `useReducer` hanya untuk toggle boolean.

---

Gunakan panduan ini sebagai versi wirid ringkas sebelum nulis fitur. Selalu cek jenis state → pilih tool → ikuti folder rule.*** End Patch
