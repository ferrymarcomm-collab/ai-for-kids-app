# AI FOR KIDS V4 — Login + Supabase

Konfigurasi Supabase sudah dimasukkan ke `.env.local`.

## Penting
- `.env.local` jangan diunggah ke GitHub atau dibagikan publik.
- Yang digunakan hanya Project URL dan Publishable Key.
- Jangan pernah memasukkan Secret Key / Service Role Key / Database Password ke frontend.

## Untuk tablet
Versi ini adalah SOURCE PROJECT Vite/React. Jangan drag-and-drop source ZIP langsung ke Netlify sebagai situs statis; project perlu di-build (`npm run build`) terlebih dahulu.

Jika tidak ingin memakai terminal di tablet, gunakan GitHub + Netlify:
1. Buat repository GitHub baru.
2. Unggah isi folder project ini (bukan ZIP sebagai satu file).
3. Hubungkan repository ke Netlify.
4. Build command: `npm run build`
5. Publish directory: `dist`
6. Karena `.env.local` sengaja tidak masuk Git, masukkan dua Environment Variables di Netlify:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_PUBLISHABLE_KEY`

## Supabase
Project URL: https://kqvbqbgjtyklxbzzqbbk.supabase.co

## Fitur V4
- Daftar akun siswa
- Login
- Logout
- Profil siswa
- Demo/Premium access check dari tabel `subscriptions`
- Penguncian premium tetap aktif
