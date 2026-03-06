# Backend API - Employee Management

Dokumentasi backend untuk demo project manajemen data karyawan.

## Ringkasan
Backend ini menyediakan REST API untuk CRUD data karyawan dengan:
- Express.js
- SQL Server (`mssql`)
- Autentikasi header `x-api-key`

Base URL:
`http://localhost:3000/api/employees`

## Struktur Utama
```text
Backend/
|-- app.js
|-- package.json
|-- .env.example
|-- config/db.js
|-- middlewares/authMiddleware.js
|-- routes/employeeRoutes.js
|-- controllers/employeeController.js
|-- models/employeeModel.js
`-- scripts/
    |-- create-employees-table.sql
    `-- db-test.js
```

## Prasyarat
- Node.js 18+
- SQL Server aktif
- Database tersedia

## Setup
## 1. Install dependency
Jalankan dari folder `Backend/`:

```bash
npm install
```

## 2. Buat file `.env`
Salin dari `.env.example` lalu sesuaikan.

Contoh:
```env
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_SERVER=localhost
DB_DATABASE=EmployeeDB
DB_ENCRYPT=false
DB_TRUST_CERTIFICATE=true
PORT=3000
```

## 3. Buat tabel Employees
Jalankan SQL berikut (tersedia di `scripts/create-employees-table.sql`):

```sql
IF OBJECT_ID('dbo.Employees', 'U') IS NULL
BEGIN
    CREATE TABLE dbo.Employees (
        EmployeeID INT IDENTITY(1,1) PRIMARY KEY,
        Name VARCHAR(100) NOT NULL,
        Position VARCHAR(50) NOT NULL,
        Salary DECIMAL(12,2) NOT NULL,
        CreatedAt DATETIME NOT NULL CONSTRAINT DF_Employees_CreatedAt DEFAULT GETDATE()
    );
END;
```

## 4. Test koneksi database
```bash
npm run db:test
```

## 5. Jalankan backend
```bash
npm run dev
```

## Autentikasi
Semua endpoint dilindungi middleware `authMiddleware` dan wajib header:

```http
x-api-key: secret123
```

Jika tidak ada/salah, API merespons `401 Unauthorized`.

## Endpoint API
Prefix endpoint: `/api/employees`

## 1. GET `/api/employees`
Ambil semua data karyawan.

Response `200`:
```json
[
  {
    "EmployeeID": 1,
    "Name": "Budi Santoso",
    "Position": "Software Engineer",
    "Salary": 8000000,
    "CreatedAt": "2026-03-06T07:19:35.363Z"
  }
]
```

## 2. GET `/api/employees/:id`
Ambil data karyawan berdasarkan ID.

Status:
- `200` data ditemukan
- `400` ID tidak valid
- `404` data tidak ditemukan

## 3. POST `/api/employees`
Tambah data karyawan.

Body:
```json
{
  "name": "Siti Rahma",
  "position": "QA Engineer",
  "salary": 7500000
}
```

Status:
- `201` sukses
- `400` validasi gagal

## 4. PUT `/api/employees/:id`
Ubah data karyawan.

Body:
```json
{
  "name": "Siti Rahma",
  "position": "Senior QA Engineer",
  "salary": 9000000
}
```

Status:
- `200` sukses
- `400` ID/body tidak valid
- `404` data tidak ditemukan

## 5. DELETE `/api/employees/:id`
Hapus data karyawan.

Status:
- `200` sukses
- `400` ID tidak valid
- `404` data tidak ditemukan

## Implementasi di Postman
Berikut langkah agar demo API langsung jalan di Postman.

Jika kamu sudah punya file export Postman, gunakan file ini:
- `Backend/postman/Employee API Test.postman_collection.json`

Setelah import collection tersebut, pastikan variable environment yang dipakai adalah `{{base_url}}`.

## 1. Import Collection (disarankan)
- Buka Postman
- Klik `Import`
- Pilih file `Backend/postman/Employee API Test.postman_collection.json`
- Collection akan muncul dengan nama `Employee API Test`

## 1b. Buat Collection Manual (opsional)
- Buka Postman
- Klik `New` -> `Collection`
- Nama collection: `Employee API Demo`

## 2. Buat Environment
- Klik `Environments` -> `New`
- Nama environment: `Local Employee API`
- Tambahkan variable:
  - `base_url` = `http://localhost:3000`
  - `api_key` = `secret123`
- Save lalu pilih environment tersebut

## 3. Set Header Global di Collection
Di level Collection, tab `Authorization` bisa dibiarkan `No Auth`.
Gunakan header di setiap request:
- Key: `x-api-key`
- Value: `{{api_key}}`

Atau tambahkan di tab `Headers` pada masing-masing request.

## 4. Request yang Perlu Dibuat
## A. Get All Employees
- Method: `GET`
- URL: `{{base_url}}/api/employees`
- Header: `x-api-key: {{api_key}}`

## B. Get Employee By ID
- Method: `GET`
- URL: `{{base_url}}/api/employees/1`
- Header: `x-api-key: {{api_key}}`

## C. Create Employee
- Method: `POST`
- URL: `{{base_url}}/api/employees`
- Headers:
  - `x-api-key: {{api_key}}`
  - `Content-Type: application/json`
- Body (raw JSON):
```json
{
  "name": "Andi Wijaya",
  "position": "Backend Developer",
  "salary": 10000000
}
```

## D. Update Employee
- Method: `PUT`
- URL: `{{base_url}}/api/employees/1`
- Headers:
  - `x-api-key: {{api_key}}`
  - `Content-Type: application/json`
- Body (raw JSON):
```json
{
  "name": "Andi Wijaya",
  "position": "Lead Backend Developer",
  "salary": 12000000
}
```

## E. Delete Employee
- Method: `DELETE`
- URL: `{{base_url}}/api/employees/1`
- Header: `x-api-key: {{api_key}}`

## 5. Skenario Validasi untuk Demo
Agar implementasi security dan validasi terlihat saat presentasi:

1. Kirim `GET /api/employees` tanpa `x-api-key` -> harus `401`.
2. Kirim `GET /api/employees` dengan `x-api-key` salah -> harus `401`.
3. Kirim `POST /api/employees` dengan salary `0` -> harus `400`.
4. Kirim `GET /api/employees/abc` -> harus `400`.
5. Kirim `GET /api/employees/999999` -> harus `404` bila ID tidak ada.

## 6. Contoh Tests Script di Postman
Tambahkan script ini di tab `Tests` masing-masing request:

```javascript
pm.test("Status code is success", function () {
  pm.expect(pm.response.code).to.be.oneOf([200, 201]);
});
```

Untuk request unauthorized:

```javascript
pm.test("Status code is 401", function () {
  pm.response.to.have.status(401);
});
```

## Catatan Penting
- Jalankan command npm dari folder `Backend/`, bukan root workspace.
- API key saat ini hardcoded untuk kebutuhan demo.
- Untuk production, gunakan JWT + environment secrets + HTTPS.
