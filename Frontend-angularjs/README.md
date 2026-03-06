# Frontend - Employee Management (AngularJS)

Dokumentasi frontend untuk demo project manajemen data karyawan.

## Ringkasan
Frontend ini dibuat dengan AngularJS 1.x dan berfungsi sebagai antarmuka untuk mengelola data karyawan melalui backend API.

Fitur utama:
- Lihat daftar karyawan
- Cari karyawan (nama/jabatan)
- Tambah karyawan
- Edit karyawan
- Hapus karyawan
- Tampilkan statistik ringkas (jumlah karyawan, jumlah jabatan, rata-rata gaji)

## Teknologi
- AngularJS `1.8.3`
- `angular-route`
- HTML + CSS + JavaScript (vanilla)

## Struktur Folder
```text
Frontend-angularjs/
|-- index.html
|-- app.js
|-- css/
|   `-- style.css
|-- controllers/
|   |-- employeeListCtrl.js
|   `-- employeeFormCtrl.js
|-- services/
|   `-- employeeService.js
`-- views/
    |-- employee-list.html
    `-- employee-form.html
```

## Arsitektur Frontend
- `app.js`
Konfigurasi module AngularJS dan routing (`ngRoute`).

- `services/employeeService.js`
Semua komunikasi HTTP ke backend API terpusat di sini.
Method yang tersedia:
  - `getAll()`
  - `getById(id)`
  - `create(data)`
  - `update(id, data)`
  - `remove(id)`

- `controllers/employeeListCtrl.js`
Mengatur logika halaman daftar, search, statistik, dan delete.

- `controllers/employeeFormCtrl.js`
Mengatur mode tambah/edit, validasi form, dan submit data.

## Routing Halaman
Routing menggunakan hash-bang (`#!/`):
- `#!/` -> halaman list karyawan
- `#!/create` -> halaman tambah karyawan
- `#!/edit/:id` -> halaman edit karyawan

## Integrasi ke Backend
Service frontend saat ini memakai konfigurasi:
- Base URL API: `http://localhost:3000/api/employees`
- Header autentikasi: `x-api-key: secret123`

Catatan:
- Pastikan backend sudah jalan di port `3000`.
- Jika API URL berubah, update di `services/employeeService.js`.

## Cara Menjalankan Frontend
Frontend ini berupa static files, jadi jalankan dengan local web server.

## Opsi A: Live Server (disarankan)
1. Buka folder `Frontend-angularjs` di VS Code.
2. Jalankan `index.html` dengan extension Live Server.
3. Akses URL Live Server di browser.

## Opsi B: Static server lain
Boleh gunakan server statis lain (contoh: `http-server`) selama file diakses lewat HTTP, bukan langsung `file://`.

## Prasyarat Sebelum Demo
1. Database dan backend sudah aktif.
2. Endpoint backend bisa diakses (`http://localhost:3000/api/employees`).
3. Header `x-api-key` valid (`secret123`).

## Alur Demo Frontend (Rekomendasi 3-5 Menit)
1. Buka halaman list (`#!/`) dan tampilkan data karyawan.
2. Tunjukkan fitur search nama/jabatan.
3. Klik `Tambah Karyawan`, isi form valid, lalu simpan.
4. Tunjukkan data baru muncul di list.
5. Edit salah satu data, simpan, lalu verifikasi perubahan.
6. Hapus data dengan konfirmasi.
7. Opsional: matikan backend sebentar untuk menunjukkan error handling.

## Validasi Form (Client-side)
Validasi di `employeeFormCtrl.js`:
- `name` wajib diisi dan minimal 2 karakter
- `position` wajib diisi
- `salary` harus angka dan > 0

Selain validasi frontend, backend juga melakukan validasi ulang untuk keamanan data.

## Troubleshooting
- Data tidak muncul:
  - Pastikan backend aktif di `http://localhost:3000`
  - Cek console browser untuk error request
  - Pastikan `x-api-key` masih benar

- Muncul `401 Unauthorized`:
  - Cek header `x-api-key` di `services/employeeService.js`

- Routing tidak jalan:
  - Pastikan aplikasi dibuka dari web server (bukan `file://`)

- CORS error:
  - Pastikan backend mengaktifkan CORS (saat ini sudah aktif di `app.js`)

## Catatan Pengembangan Lanjutan
- Pindahkan base URL API ke konfigurasi environment frontend.
- Tambah notifikasi global yang lebih konsisten.
- Tambah unit test frontend.
- Pertimbangkan migrasi dari AngularJS 1.x ke framework yang lebih modern jika dibutuhkan.
