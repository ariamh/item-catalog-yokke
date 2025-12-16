# Item Catalog Service (NestJS Backend)

**Technical Test: Item Catalog Service**. Aplikasi ini adalah RESTful API backend yang dibangun menggunakan **NestJS**, **TypeORM (SQLite)**, dan mendukung **Containerization (Docker)**.

## 📋 Deskripsi

Sistem ini memungkinkan pengelolaan katalog item dengan fitur:

- **CRUD Operasi:** Create, Read, Update, Partial Update, Delete.
- **Validasi Ketat:** Input divalidasi menggunakan `class-validator` (misal: harga harus positif, kategori harus sesuai Enum).
- **Aturan Bisnis:**
  - Title item harus unik (Mencegah duplikasi).
  - Default filter hanya menampilkan item yang tersedia (`isAvailable: true`).
- **Arsitektur Modular:** Mengikuti best practice NestJS (Module, Controller, Service, DTO).

## 🛠️ Teknologi yang Digunakan

- [NestJS](https://nestjs.com/) - Framework Node.js
- TypeORM - ORM untuk interaksi database
- SQLite - Database (In-file)
- Docker - Containerization
- Jest - Unit Testing

## 🚀 Cara Instalasi & Menjalankan (Local)

Pastikan **Node.js** (v16+) sudah terinstall.

### 1. Clone Repository & Masuk ke Folder

```bash
git clone <URL_REPOSITORY_ANDA>
cd item-catalog
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Jalankan Aplikasi (Mode Development)

```bash
npm run start:dev
```

Server akan berjalan di http://localhost:3000. Database `db.sqlite` akan dibuat otomatis.

## 🐳 Cara Menjalankan dengan Docker

Pastikan Docker Desktop sudah berjalan.

### 1. Build Image

```bash
docker build -t item-catalog-img .
```

### 2. Jalankan Container

```bash
docker run -p 3000:3000 item-catalog-img
```

Aplikasi dapat diakses di http://localhost:3000.

## 🧪 Pengujian (Unit Test)

Untuk menjalankan unit test pada ItemService (Logika Bisnis):

```bash
npm run test
```

## 📚 Dokumentasi API & Contoh Request

Anda dapat menggunakan Postman, Insomnia, atau cURL untuk menguji endpoint berikut.

### Master Data Category

#### 1. Membuat Kategori Baru (POST)

**URL:** `/api/categories`

```bash
curl -X POST http://localhost:3000/api/categories \
  -H "Content-Type: application/json" \
  -d '{
    "name": "ELECTRONICS"
  }'
```

#### 2. Mengambil Semua Kategori (GET)

**URL:** `/api/categories`

```bash
curl http://localhost:3000/api/categories
```

### Items

#### 1. Membuat Item Baru (POST)

**URL:** `/api/items`

**Aturan:** category harus sudah ada di Master Data.

```bash
curl -X POST http://localhost:3000/api/items \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Macbook Pro M2",
    "category": "ELECTRONICS",
    "price": 2000,
    "isAvailable": true
  }'
```

**Response:**
- Sukses: `201 Created`
- Gagal Validasi: `400 Bad Request`
- Duplikasi: `409 Conflict`

#### 2. Mengambil Semua Item (GET)

**URL:** `/api/items`

**Filter:** Secara default hanya menampilkan item yang `isAvailable: true`.

**Get Active Items (Default):**

```bash
curl http://localhost:3000/api/items
```

**Get Inactive Items (Filter):**

```bash
curl "http://localhost:3000/api/items?isAvailable=false"
```

#### 3. Mengambil Detail Item (GET)

**URL:** `/api/items/:id`

```bash
curl http://localhost:3000/api/items/1
```

#### 4. Update Item Parsial (PATCH)

**URL:** `/api/items/:id`

```bash
curl -X PATCH http://localhost:3000/api/items/1 \
  -H "Content-Type: application/json" \
  -d '{
    "price": 1850
  }'
```

#### 5. Menghapus Item (DELETE)

**URL:** `/api/items/:id`

```bash
curl -X DELETE http://localhost:3000/api/items/1
```

## 📝 Struktur Response

### Success Response

```json
{
  "id": 1,
  "title": "Macbook Pro M2",
  "category": "ELECTRONICS",
  "price": "2000",
  "isAvailable": true
}
```

### Error Response

```json
{
  "statusCode": 400,
  "message": ["price must be a positive number"],
  "error": "Bad Request"
}
```

## 🎥 Screen Recording Link

https://drive.google.com/file/d/1X4nxFTjoZmlB_BQJ6UAciCY1umL2bz0j/view?usp=sharing

## 📁 Struktur Project

```
item-catalog/
├── src/
│   ├── items/
│   │   ├── dto/
│   │   ├── entities/
│   │   ├── items.controller.ts
│   │   ├── items.service.ts
│   │   └── items.module.ts
│   ├── categories/
│   │   ├── dto/
│   │   ├── entities/
│   │   ├── categories.controller.ts
│   │   ├── categories.service.ts
│   │   └── categories.module.ts
│   ├── app.module.ts
│   └── main.ts
├── test/
├── .dockerignore
├── Dockerfile
├── package.json
├── tsconfig.json
└── README.md
```
```

**Perbaikan yang dilakukan:**

1. ✅ Menambahkan code block (```) untuk semua perintah bash/shell
2. ✅ Memperbaiki struktur heading yang tidak konsisten
3. ✅ Memisahkan code block yang tercampur dengan teks biasa
4. ✅ Memperbaiki format JSON response
5. ✅ Memperbaiki struktur folder tree
6. ✅ Menambahkan syntax highlighting (bash, json) untuk readability yang lebih baik
7. ✅ Memastikan semua URL dan endpoint terformat dengan benar
