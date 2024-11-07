// Mengimpor modul Express dan membuat instance router
const express = require('express');
const router = express.Router();
// Mengimpor modul express untuk membuat instance router, yang akan digunakan untuk mendefinisikan rute-rute khusus terkait pengguna.


// Database sementara menggunakan array
let users = []; // Array untuk menyimpan data pengguna sementara
let currentUserId = 1; // Variabel untuk menghasilkan ID pengguna secara otomatis
// users adalah array sementara yang berfungsi sebagai database untuk menyimpan data pengguna.
// currentUserId adalah variabel untuk menghasilkan ID unik bagi setiap pengguna baru yang ditambahkan.


// CREATE - Tambah pengguna baru
router.post('/', (req, res) => {
    // Destructuring data yang dikirim dalam body request
    const { name, email, phone, role, status } = req.body;

    // Membuat objek pengguna baru dengan data yang diterima dan ID unik
    const newUser = {
        user_id: currentUserId++, // Menambahkan ID pengguna dan meningkatkan currentUserId
        name,
        email,
        phone,
        role,
        status
    };

    // Menambahkan pengguna baru ke dalam array users
    users.push(newUser);

    // Mengirim respons JSON yang mengonfirmasi penambahan pengguna
    res.status(201).json({
        message: "Pengguna berhasil ditambahkan",
        user_id: newUser.user_id
    });
});

// Fungsi: Menambahkan pengguna baru ke dalam database (dalam hal ini, array users).
// Destructuring: Mengambil data dari req.body untuk mendapatkan name, email, phone, role, dan status yang dikirim dalam request.
// newUser: Membuat objek pengguna baru dengan ID unik (menggunakan currentUserId) dan data yang dikirim.
// Increment currentUserId: currentUserId ditingkatkan untuk memastikan ID unik di pengguna berikutnya.
// Response: Mengirim respons JSON dengan pesan sukses dan ID pengguna baru.


// READ - Tampilkan semua pengguna
router.get('/', (req, res) => {
    // Mengirim respons berisi seluruh data pengguna dalam bentuk JSON
    res.json(users);
});

// Fungsi: Mengambil seluruh pengguna yang tersimpan dalam array users.
// Response: Mengirim semua data pengguna dalam bentuk JSON ke klien.


// READ by ID - Tampilkan pengguna berdasarkan ID
router.get('/:user_id', (req, res) => {
    // Mengambil ID pengguna dari parameter URL dan mengonversinya menjadi integer
    const userId = parseInt(req.params.user_id);

    // Mencari pengguna berdasarkan ID di array users
    const user = users.find(u => u.user_id === userId);

    // Jika pengguna ditemukan, kirim data pengguna dalam bentuk JSON
    if (user) {
        res.json(user);
    } else {
        // Jika pengguna tidak ditemukan, kirim pesan error
        res.status(404).json({ message: "Pengguna tidak ditemukan" });
    }
});

// Fungsi: Mengambil pengguna tertentu berdasarkan ID yang dikirimkan dalam URL.
// userId: Mengonversi req.params.user_id dari URL menjadi integer.
// user: Mencari pengguna dengan ID yang sesuai dalam array users.
// Response: Mengirim data pengguna dalam JSON jika pengguna ditemukan; jika tidak ditemukan, mengirim respons 404 dengan pesan error.


// UPDATE - Perbarui pengguna berdasarkan ID
router.put('/:user_id', (req, res) => {
    // Mengambil ID pengguna dari parameter URL dan mengonversinya menjadi integer
    const userId = parseInt(req.params.user_id);

    // Mencari pengguna berdasarkan ID di array users
    const user = users.find(u => u.user_id === userId);

    // Jika pengguna ditemukan, perbarui data pengguna
    if (user) {
        // Destructuring data yang dikirim dalam body request
        const { name, email, phone, role, status } = req.body;

        // Memperbarui data pengguna jika tersedia, atau tetap menggunakan nilai lama
        user.name = name || user.name;
        user.email = email || user.email;
        user.phone = phone || user.phone;
        user.role = role || user.role;
        user.status = status || user.status;

        // Mengirim respons konfirmasi bahwa pengguna berhasil diperbarui
        res.json({ message: "Pengguna berhasil diperbarui" });
    } else {
        // Jika pengguna tidak ditemukan, kirim pesan error
        res.status(404).json({ message: "Pengguna tidak ditemukan" });
    }
});

// Fungsi: Memperbarui data pengguna tertentu berdasarkan ID.
// user: Mencari pengguna yang cocok dengan userId.
// Destructuring: Mengambil data pengguna dari req.body.
// Pembaruan Data: Menggunakan data baru jika tersedia atau menggunakan nilai lama jika tidak ada data baru.
// Response: Mengirim pesan konfirmasi jika pembaruan berhasil; jika pengguna tidak ditemukan, mengirim pesan error 404.


// DELETE - Hapus pengguna berdasarkan ID
router.delete('/:user_id', (req, res) => {
    // Mengambil ID pengguna dari parameter URL dan mengonversinya menjadi integer
    const userId = parseInt(req.params.user_id);

    // Mencari indeks pengguna berdasarkan ID di array users
    const index = users.findIndex(u => u.user_id === userId);

    // Jika pengguna ditemukan, hapus pengguna dari array
    if (index !== -1) {
        users.splice(index, 1); // Menghapus pengguna berdasarkan indeks
        res.json({ message: "Pengguna berhasil dihapus" }); // Mengirim respons konfirmasi
    } else {
        // Jika pengguna tidak ditemukan, kirim pesan error
        res.status(404).json({ message: "Pengguna tidak ditemukan" });
    }
});

// Fungsi: Menghapus pengguna berdasarkan ID yang diberikan.
// index: Menemukan indeks pengguna dalam array users.
// Hapus Pengguna: Jika indeks ditemukan (index !== -1), menghapus pengguna dari array users.
// Response: Mengirim pesan sukses jika penghapusan berhasil; jika tidak ditemukan, mengirim pesan error 404.

// Mengekspor router untuk digunakan di file lain (misalnya di server.js)
module.exports = router;
// Penjelasan: Mengekspor router agar dapat digunakan di file lain, seperti server.js, untuk mengaktifkan rute pengguna pada server utama.