## Menjalankan Backend

Ikuti langkah-langkah berikut untuk menjalankan backend:

1. **Kloning repository** ini dan navigasikan ke direktori `backend`:
    ```bash
    git clone https://github.com/username/repository-name.git
    cd repository-name/backend
    ```

2. **Install dependencies** menggunakan npm:
    ```bash
    npm install
    ```

3. **Konfigurasi Environment**: Buat file `.env` di direktori `backend` dan masukkan variabel lingkungan berikut:
    ```env
    MONGODB_URL=mongodb+srv://whitepanther050595:demomongodb@cluster0.usvln.mongodb.net/tickets_app
SESSION_SECRET=83WODFHSA8DAWA8ERWEFUSOSD
APP_PORT=5000
CLIENT_URL=http://localhost:5173
    ```

4. **Jalankan Server**:
    ```bash
    nodemon server.js
    ```

5. Backend Anda sekarang akan berjalan di `http://localhost:5000`.

## Menjalankan Frontend

Setelah backend berjalan, ikuti langkah-langkah berikut untuk menjalankan frontend:

1. **Navigasikan ke direktori `frontend`**:
    ```bash
    cd ../frontend
    ```

2. **Install dependencies** menggunakan npm:
    ```bash
    npm install
    ```

3. **Jalankan Aplikasi Vue**:
    ```bash
    npm run dev
    ```

4. Frontend akan berjalan di `http://localhost:5173`.