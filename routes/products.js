// Mengimpor modul Express dan membuat instance router
const express = require("express");
const router = express.Router();

// Mengimpor modul express untuk membuat instance router, yang akan digunakan untuk mendefinisikan rute-rute khusus terkait produk.

// Database sementara menggunakan array
let products = []; // Array untuk menyimpan data produk sementara
let currentId = 1; // Variabel untuk menghasilkan ID produk secara otomatis

// products adalah array sementara yang berfungsi sebagai database untuk menyimpan data produk.
//currentId adalah variabel untuk menghasilkan ID unik bagi setiap produk baru yang ditambahkan.

// CREATE - Tambah produk baru
router.post("/", (req, res) => {
  // Destructuring data yang dikirim dalam body request
  const { name, price, stock, description, category } = req.body;

  // Membuat objek produk baru dengan data yang diterima dan ID unik
  const newProduct = {
    product_id: currentId++, // Menambahkan ID produk dan meningkatkan currentId
    name,
    price,
    stock,
    description,
    category,
  };

  // Menambahkan produk baru ke dalam array products
  products.push(newProduct);

  // Mengirim respons JSON yang mengonfirmasi penambahan produk
  res.status(201).json({
    message: "Produk berhasil ditambahkan",
    product_id: newProduct.product_id,
  });
});

// Fungsi: Menambahkan produk baru ke dalam database (dalam hal ini, array products).
// Destructuring: Mengambil data dari req.body untuk mendapatkan name, price, stock, description, dan category yang dikirim dalam request.
// newProduct: Membuat objek produk baru dengan ID unik (menggunakan currentId) dan data yang dikirim.
// Increment currentId: currentId ditingkatkan untuk memastikan ID unik di produk berikutnya.
// Response: Mengirim respons JSON dengan pesan sukses dan ID produk baru.

// READ - Tampilkan semua produk
router.get("/", (req, res) => {
  // Mengirim respons berisi seluruh data produk dalam bentuk JSON
  res.json(products);
});

// Fungsi: Mengambil seluruh produk yang tersimpan dalam array products.
// Response: Mengirim semua data produk dalam bentuk JSON ke klien.

// READ by ID - Tampilkan produk berdasarkan ID
router.get("/:product_id", (req, res) => {
  // Mengambil ID produk dari parameter URL dan mengonversinya menjadi integer
  const productId = parseInt(req.params.product_id);

  // Mencari produk berdasarkan ID di array products
  const product = products.find((p) => p.product_id === productId);

  // Jika produk ditemukan, kirim data produk dalam bentuk JSON
  if (product) {
    res.json(product);
  } else {
    // Jika produk tidak ditemukan, kirim pesan errorw
    res.status(404).json({ message: "Produk tidak ditemukan" });
  }
});

// Fungsi: Mengambil produk tertentu berdasarkan ID yang dikirimkan dalam URL.
// productId: Mengonversi req.params.product_id dari URL menjadi integer.
// product: Mencari produk dengan ID yang sesuai dalam array products.
// Response: Mengirim data produk dalam JSON jika produk ditemukan; jika tidak ditemukan, mengirim respons 404 dengan pesan error.

// UPDATE - Perbarui produk berdasarkan ID
router.put("/:product_id", (req, res) => {
  // Mengambil ID produk dari parameter URL dan mengonversinya menjadi integer
  const productId = parseInt(req.params.product_id);

  // Mencari produk berdasarkan ID di array products
  const product = products.find((p) => p.product_id === productId);

  // Jika produk ditemukan, perbarui data produk
  if (product) {
    // Destructuring data yang dikirim dalam body request
    const { name, price, stock, description, category } = req.body;

    // Memperbarui data produk jika tersedia, atau tetap menggunakan nilai lama
    product.name = name || product.name;
    product.price = price || product.price;
    product.stock = stock || product.stock;
    product.description = description || product.description;
    product.category = category || product.category;

    // Mengirim respons konfirmasi bahwa produk berhasil diperbarui
    res.json({ message: "Produk berhasil diperbarui" });
  } else {
    // Jika produk tidak ditemukan, kirim pesan error
    res.status(404).json({ message: "Produk tidak ditemukan" });
  }
});

//Fungsi: Memperbarui data produk tertentu berdasarkan ID.
// product: Mencari produk yang cocok dengan productId.
// Destructuring: Mengambil data produk dari req.body.
// Pembaruan Data: Menggunakan data baru jika tersedia atau menggunakan nilai lama jika tidak ada data baru.
// Response: Mengirim pesan konfirmasi jika pembaruan berhasil; jika produk tidak ditemukan, mengirim pesan error 404.
// DELETE - Hapus produk berdasarkan ID
router.delete("/:product_id", (req, res) => {
  // Mengambil ID produk dari parameter URL dan mengonversinya menjadi integer
  const productId = parseInt(req.params.product_id);

  // Mencari indeks produk berdasarkan ID di array products
  const index = products.findIndex((p) => p.product_id === productId);

  // Jika produk ditemukan, hapus produk dari array
  if (index !== -1) {
    products.splice(index, 1); // Menghapus produk berdasarkan indeks
    res.json({ message: "Produk berhasil dihapus" }); // Mengirim respons konfirmasi
  } else {
    // Jika produk tidak ditemukan, kirim pesan error
    res.status(404).json({ message: "Produk tidak ditemukan" });
  }
});

// Fungsi: Menghapus produk berdasarkan ID yang diberikan.
// index: Menemukan indeks produk dalam array products.
// Hapus Produk: Jika indeks ditemukan (index !== -1), menghapus produk dari array products.
// Response: Mengirim pesan sukses jika penghapusan berhasil; jika tidak ditemukan, mengirim pesan error 404.

// Mengekspor router untuk digunakan di file lain (misalnya di server.js)
module.exports = router;

//Mengekspor router agar dapat digunakan di file lain, seperti server.js, untuk mengaktifkan rute produk pada server utama.
