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

Server akan berjalan di `http://localhost:3000`. Database `db.sqlite` akan dibuat otomatis.

## 🐳 Cara Menjalankan dengan Docker

Pastikan **Docker Desktop** sudah berjalan.

### 1. Build Image

```bash
docker build -t item-catalog-img .
```

### 2. Jalankan Container

```bash
docker run -p 3000:3000 item-catalog-img
```

Aplikasi dapat diakses di `http://localhost:3000`.

## 🧪 Pengujian (Unit Test)

Untuk menjalankan unit test pada *ItemService* (Logika Bisnis):

```bash
npm run test
```

## 📚 Dokumentasi API & Contoh Request

Anda dapat menggunakan Postman, Insomnia, atau cURL untuk menguji endpoint berikut.

### 1. Membuat Item Baru (POST)

**URL:** `/items`

**Aturan:** title unik, price > 0, category harus valid ('ELECTRONICS', 'CLOTHING', 'FOOD').

```bash
curl -X POST http://localhost:3000/items \
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

### 2. Mengambil Semua Item (GET)

**URL:** `/items`

**Filter:** Secara default hanya menampilkan item yang `isAvailable: true`.

#### Get Active Items (Default):

```bash
curl http://localhost:3000/items
```

#### Get Inactive Items (Filter):

```bash
curl "http://localhost:3000/items?isAvailable=false"
```

### 3. Mengambil Detail Item (GET)

**URL:** `/items/:id`

```bash
curl http://localhost:3000/items/1
```

### 4. Update Item Parsial (PATCH)

**URL:** `/items/:id`

**Deskripsi:** Mengubah sebagian data saja (misal hanya harga).

```bash
curl -X PATCH http://localhost:3000/items/1 \
  -H "Content-Type: application/json" \
  -d '{
    "price": 1850
  }'
```

### 5. Menghapus Item (DELETE)

**URL:** `/items/:id`

```bash
curl -X DELETE http://localhost:3000/items/1
```

## 📝 Struktur Response

### Success Response

```json
{
  "id": 1,
  "title": "Macbook Pro M2",
  "category": "ELECTRONICS",
  "price": 2000,
  "isAvailable": true,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
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
```
https://drive.google.com/file/d/1X4nxFTjoZmlB_BQJ6UAciCY1umL2bz0j/view?usp=sharing 
```

## 📁 Struktur Project

```
item-catalog/
├── src/
│   ├── items/
│   │   ├── dto/
│   │   │   ├── create-item.dto.ts
│   │   │   └── update-item.dto.ts
│   │   ├── entities/
│   │   │   └── item.entity.ts
│   │   ├── items.controller.ts
│   │   ├── items.service.ts
│   │   └── items.module.ts
│   ├── app.module.ts
│   └── main.ts
├── test/
├── .dockerignore
├── Dockerfile
├── package.json
├── tsconfig.json
└── README.md
```
