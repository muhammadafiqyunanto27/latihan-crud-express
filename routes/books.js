// Mengimpor modul Express dan membuat instance router
const express = require('express');
const router = express.Router();
// Mengimpor modul express untuk membuat instance router, yang akan digunakan untuk mendefinisikan rute-rute khusus terkait buku.

// Database sementara menggunakan array
let books = []; // Array untuk menyimpan data buku sementara
let currentBookId = 1; // Variabel untuk menghasilkan ID buku secara otomatis
// `books` adalah array sementara yang berfungsi sebagai database untuk menyimpan data buku.
// `currentBookId` adalah variabel untuk menghasilkan ID unik bagi setiap buku baru yang ditambahkan.


// CREATE - Tambah buku baru
router.post('/', (req, res) => {
    // Destructuring data yang dikirim dalam body request
    const { title, author, published_year, genre, status } = req.body;

    // Membuat objek buku baru dengan data yang diterima dan ID unik
    const newBook = {
        book_id: currentBookId++, // Menambahkan ID buku dan meningkatkan currentBookId
        title,
        author,
        published_year,
        genre,
        status
    };

    // Menambahkan buku baru ke dalam array books
    books.push(newBook);

    // Mengirim respons JSON yang mengonfirmasi penambahan buku
    res.status(201).json({
        message: "Buku berhasil ditambahkan",
        book_id: newBook.book_id
    });
});

// Fungsi: Menambahkan buku baru ke dalam database sementara (books).
// Destructuring: Mengambil data dari req.body untuk mendapatkan title, author, published_year, genre, dan status yang dikirim dalam permintaan.
// newBook: Membuat objek buku baru dengan ID unik (menggunakan currentBookId) dan data yang diterima.
// Increment currentBookId: currentBookId ditingkatkan untuk memastikan ID unik pada buku berikutnya.
// Response: Mengirim respons JSON dengan pesan sukses dan ID buku baru.


// READ - Tampilkan semua buku
router.get('/', (req, res) => {
    // Mengirim respons berisi seluruh data buku dalam bentuk JSON
    res.json(books);
});

// Fungsi: Mengambil seluruh buku yang tersimpan dalam array books.
// Response: Mengirim semua data buku dalam bentuk JSON ke klien.


// READ by ID - Tampilkan buku berdasarkan ID
router.get('/:book_id', (req, res) => {
    // Mengambil ID buku dari parameter URL dan mengonversinya menjadi integer
    const bookId = parseInt(req.params.book_id);

    // Mencari buku berdasarkan ID di array books
    const book = books.find(b => b.book_id === bookId);

    // Jika buku ditemukan, kirim data buku dalam bentuk JSON
    if (book) {
        res.json(book);
    } else {
        // Jika buku tidak ditemukan, kirim pesan error
        res.status(404).json({ message: "Buku tidak ditemukan" });
    }
});

// Fungsi: Mengambil buku tertentu berdasarkan ID yang dikirimkan dalam URL.
// bookId: Mengonversi req.params.book_id dari URL menjadi integer.
// book: Mencari buku dengan ID yang sesuai dalam array books.
// Response: Mengirim data buku dalam JSON jika buku ditemukan; jika tidak ditemukan, mengirim respons 404 dengan pesan error.


// UPDATE - Perbarui buku berdasarkan ID
router.put('/:book_id', (req, res) => {
    // Mengambil ID buku dari parameter URL dan mengonversinya menjadi integer
    const bookId = parseInt(req.params.book_id);

    // Mencari buku berdasarkan ID di array books
    const book = books.find(b => b.book_id === bookId);

    // Jika buku ditemukan, perbarui data buku
    if (book) {
        // Destructuring data yang dikirim dalam body request
        const { title, author, published_year, genre, status } = req.body;

        // Memperbarui data buku jika tersedia, atau tetap menggunakan nilai lama
        book.title = title || book.title;
        book.author = author || book.author;
        book.published_year = published_year || book.published_year;
        book.genre = genre || book.genre;
        book.status = status || book.status;

        // Mengirim respons konfirmasi bahwa buku berhasil diperbarui
        res.json({ message: "Buku berhasil diperbarui" });
    } else {
        // Jika buku tidak ditemukan, kirim pesan error
        res.status(404).json({ message: "Buku tidak ditemukan" });
    }
});

// Fungsi: Memperbarui data buku tertentu berdasarkan ID.
// book: Mencari buku yang cocok dengan bookId.
// Destructuring: Mengambil data buku dari req.body.
// Pembaruan Data: Menggunakan data baru jika tersedia atau menggunakan nilai lama jika tidak ada data baru.
// Response: Mengirim pesan konfirmasi jika pembaruan berhasil; jika buku tidak ditemukan, mengirim pesan error 404.


// DELETE - Hapus buku berdasarkan ID
router.delete('/:book_id', (req, res) => {
    // Mengambil ID buku dari parameter URL dan mengonversinya menjadi integer
    const bookId = parseInt(req.params.book_id);

    // Mencari indeks buku berdasarkan ID di array books
    const index = books.findIndex(b => b.book_id === bookId);

    // Jika buku ditemukan, hapus buku dari array
    if (index !== -1) {
        books.splice(index, 1); // Menghapus buku berdasarkan indeks
        res.json({ message: "Buku berhasil dihapus" }); // Mengirim respons konfirmasi
    } else {
        // Jika buku tidak ditemukan, kirim pesan error
        res.status(404).json({ message: "Buku tidak ditemukan" });
    }
});

// Fungsi: Menghapus buku berdasarkan ID yang diberikan.
// index: Menemukan indeks buku dalam array books.
// Hapus Buku: Jika indeks ditemukan (index !== -1), menghapus buku dari array books.
// Response: Mengirim pesan sukses jika penghapusan berhasil; jika tidak ditemukan, mengirim pesan error 404.


// Mengekspor router untuk digunakan di file lain (misalnya di server.js)
module.exports = router;

// Penjelasan: Mengekspor router agar dapat digunakan di file lain, seperti server.js, untuk mengaktifkan rute buku pada server utama.