const express = require('express'); // Mengimpor modul Express
const router = express.Router(); // Membuat instance router dari Express

// Fungsi: Mengimpor modul express dan membuat instance router yang akan mengatur rute-rute untuk operasi CRUD terkait pesanan.


let orders = []; // Array untuk menyimpan data pesanan sementara sebagai database sementara
let currentOrderId = 1; // Variabel untuk menghasilkan ID pesanan unik secara otomatis

// Fungsi: orders adalah array yang menyimpan data pesanan sementara dalam aplikasi.
// currentOrderId digunakan untuk menghasilkan ID unik bagi setiap pesanan baru.


router.post('/', (req, res) => {
    const { customer_name, product_id, quantity, total_price, status } = req.body;
    const newOrder = {
        order_id: currentOrderId++, // Menyimpan ID unik dan menambah nilai currentOrderId
        customer_name,
        product_id,
        quantity,
        total_price,
        status
    };
    orders.push(newOrder); // Menambahkan pesanan baru ke array orders
    res.status(201).json({
        message: "Pesanan berhasil ditambahkan",
        order_id: newOrder.order_id
    });
});

// Endpoint: POST /api/orders
// Fungsi:
// Mengambil data pesanan (customer_name, product_id, quantity, total_price, status) dari req.body.
// Membuat objek newOrder untuk pesanan baru, termasuk order_id unik.
// Menambahkan newOrder ke array orders.
// Mengirim respons JSON dengan pesan konfirmasi dan order_id baru


router.get('/', (req, res) => {
    res.json(orders); // Mengirim semua data pesanan dalam bentuk JSON
});

// Endpoint: GET /api/orders
// Fungsi: Mengirim semua data pesanan dalam orders sebagai respons JSON.


router.get('/:order_id', (req, res) => {
    const orderId = parseInt(req.params.order_id); // Mengambil dan mengonversi order_id dari parameter URL
    const order = orders.find(o => o.order_id === orderId); // Mencari pesanan berdasarkan ID
    if (order) {
        res.json(order); // Jika ditemukan, kirim data pesanan
    } else {
        res.status(404).json({ message: "Pesanan tidak ditemukan" }); // Kirim pesan error jika tidak ditemukan
    }
});

// Endpoint: GET /api/orders/:order_id
// Fungsi:
// Mengambil order_id dari URL dan mengonversinya ke integer.
// Mencari pesanan dengan order_id yang sesuai dalam array orders.
// Jika pesanan ditemukan, mengirim data pesanan; jika tidak, mengirim respons error.


router.put('/:order_id', (req, res) => {
    const orderId = parseInt(req.params.order_id); // Mengambil dan mengonversi order_id dari parameter URL
    const order = orders.find(o => o.order_id === orderId); // Mencari pesanan berdasarkan ID
    if (order) {
        const {customer_name, quantity, total_price, status } = req.body; // Mengambil data pembaruan dari req.body
        order.customer_name = customer_name || order.customer_name;
        order.quantity = quantity || order.quantity; // Memperbarui nilai quantity jika ada
        order.total_price = total_price || order.total_price; // Memperbarui nilai total_price jika ada
        order.status = status || order.status; // Memperbarui nilai status jika ada
        res.json({ message: "Pesanan berhasil diperbarui" }); // Mengirim respons konfirmasi
    } else {
        res.status(404).json({ message: "Pesanan tidak ditemukan" }); // Kirim pesan error jika tidak ditemukan
    }
});

// Endpoint: PUT /api/orders/:order_id
// Fungsi:
// Mengambil order_id dari URL dan mencari pesanan dalam orders.
// Jika pesanan ditemukan, memperbarui data quantity, total_price, dan status sesuai dengan nilai baru yang ada di req.body.
// Mengirimkan pesan konfirmasi jika pembaruan berhasil, atau pesan error jika pesanan tidak ditemukan.


router.delete('/:order_id', (req, res) => {
    const orderId = parseInt(req.params.order_id); // Mengambil dan mengonversi order_id dari parameter URL
    const index = orders.findIndex(o => o.order_id === orderId); // Mencari indeks pesanan berdasarkan ID
    if (index !== -1) {
        orders.splice(index, 1); // Menghapus pesanan dari array
        res.json({ message: "Pesanan berhasil dihapus" }); // Mengirim respons konfirmasi
    } else {
        res.status(404).json({ message: "Pesanan tidak ditemukan" }); // Kirim pesan error jika tidak ditemukan
    }
});

// Endpoint: DELETE /api/orders/:order_id
// Fungsi:
// Mengambil order_id dari URL dan mencari indeks pesanan dalam orders.
// Jika pesanan ditemukan, menghapusnya dari array dan mengirim pesan konfirmasi.
// Jika tidak ditemukan, mengirimkan pesan error.

module.exports = router; // Mengekspor router untuk digunakan di file lain

// Fungsi: Mengekspor router agar dapat digunakan di file lain, seperti server.js.