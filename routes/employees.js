// Mengimpor modul Express dan membuat instance router
const express = require('express');
const router = express.Router();
// Mengimpor modul express untuk membuat instance router, yang akan digunakan untuk mendefinisikan rute-rute khusus terkait karyawan.


// Database sementara menggunakan array
let employees = []; // Array untuk menyimpan data karyawan sementara
let currentEmployeeId = 1; // Variabel untuk menghasilkan ID karyawan secara otomatis
// employees adalah array sementara yang berfungsi sebagai database untuk menyimpan data karyawan.
// currentEmployeeId adalah variabel untuk menghasilkan ID unik bagi setiap karyawan baru yang ditambahkan.


// CREATE - Tambah karyawan baru
router.post('/', (req, res) => {
    // Destructuring data yang dikirim dalam body request
    const { name, position, salary, date_hired, status } = req.body;

    // Membuat objek karyawan baru dengan data yang diterima dan ID unik
    const newEmployee = {
        employee_id: currentEmployeeId++, // Menambahkan ID karyawan dan meningkatkan currentEmployeeId
        name,
        position,
        salary,
        date_hired,
        status
    };

    // Menambahkan karyawan baru ke dalam array employees
    employees.push(newEmployee);

    // Mengirim respons JSON yang mengonfirmasi penambahan karyawan
    res.status(201).json({
        message: "Karyawan berhasil ditambahkan",
        employee_id: newEmployee.employee_id
    });
});

// Fungsi: Menambahkan karyawan baru ke dalam database (dalam hal ini, array employees).
// Destructuring: Mengambil data dari req.body untuk mendapatkan name, position, salary, date_hired, dan status yang dikirim dalam request.
// newEmployee: Membuat objek karyawan baru dengan ID unik (menggunakan currentEmployeeId) dan data yang dikirim.
// Increment currentEmployeeId: currentEmployeeId ditingkatkan untuk memastikan ID unik di karyawan berikutnya.
// Response: Mengirim respons JSON dengan pesan sukses dan ID karyawan baru.


// READ - Tampilkan semua karyawan
router.get('/', (req, res) => {
    // Mengirim respons berisi seluruh data karyawan dalam bentuk JSON
    res.json(employees);
});

// Fungsi: Mengambil seluruh karyawan yang tersimpan dalam array employees.
// Response: Mengirim semua data karyawan dalam bentuk JSON ke klien.


// READ by ID - Tampilkan karyawan berdasarkan ID
router.get('/:employee_id', (req, res) => {
    // Mengambil ID karyawan dari parameter URL dan mengonversinya menjadi integer
    const employeeId = parseInt(req.params.employee_id);

    // Mencari karyawan berdasarkan ID di array employees
    const employee = employees.find(e => e.employee_id === employeeId);

    // Jika karyawan ditemukan, kirim data karyawan dalam bentuk JSON
    if (employee) {
        res.json(employee);
    } else {
        // Jika karyawan tidak ditemukan, kirim pesan error
        res.status(404).json({ message: "Karyawan tidak ditemukan" });
    }
});

// Fungsi: Mengambil karyawan tertentu berdasarkan ID yang dikirimkan dalam URL.
// employeeId: Mengonversi req.params.employee_id dari URL menjadi integer.
// employee: Mencari karyawan dengan ID yang sesuai dalam array employees.
// Response: Mengirim data karyawan dalam JSON jika karyawan ditemukan; jika tidak ditemukan, mengirim respons 404 dengan pesan error.


// UPDATE - Perbarui karyawan berdasarkan ID
router.put('/:employee_id', (req, res) => {
    // Mengambil ID karyawan dari parameter URL dan mengonversinya menjadi integer
    const employeeId = parseInt(req.params.employee_id);

    // Mencari karyawan berdasarkan ID di array employees
    const employee = employees.find(e => e.employee_id === employeeId);

    // Jika karyawan ditemukan, perbarui data karyawan
    if (employee) {
        // Destructuring data yang dikirim dalam body request
        const { name, position, salary, status } = req.body;

        // Memperbarui data karyawan jika tersedia, atau tetap menggunakan nilai lama
        employee.name = name || employee.name;
        employee.position = position || employee.position;
        employee.salary = salary || employee.salary;
        employee.status = status || employee.status;

        // Mengirim respons konfirmasi bahwa karyawan berhasil diperbarui
        res.json({ message: "Karyawan berhasil diperbarui" });
    } else {
        // Jika karyawan tidak ditemukan, kirim pesan error
        res.status(404).json({ message: "Karyawan tidak ditemukan" });
    }
});

// Fungsi: Memperbarui data karyawan tertentu berdasarkan ID.
// employee: Mencari karyawan yang cocok dengan employeeId.
// Destructuring: Mengambil data karyawan dari req.body.
// Pembaruan Data: Menggunakan data baru jika tersedia atau menggunakan nilai lama jika tidak ada data baru.
// Response: Mengirim pesan konfirmasi jika pembaruan berhasil; jika karyawan tidak ditemukan, mengirim pesan error 404.


// DELETE - Hapus karyawan berdasarkan ID
router.delete('/:employee_id', (req, res) => {
    // Mengambil ID karyawan dari parameter URL dan mengonversinya menjadi integer
    const employeeId = parseInt(req.params.employee_id);

    // Mencari indeks karyawan berdasarkan ID di array employees
    const index = employees.findIndex(e => e.employee_id === employeeId);

    // Jika karyawan ditemukan, hapus karyawan dari array
    if (index !== -1) {
        employees.splice(index, 1); // Menghapus karyawan berdasarkan indeks
        res.json({ message: "Karyawan berhasil dihapus" }); // Mengirim respons konfirmasi
    } else {
        // Jika karyawan tidak ditemukan, kirim pesan error
        res.status(404).json({ message: "Karyawan tidak ditemukan" });
    }
});

// Fungsi: Menghapus karyawan berdasarkan ID yang diberikan.
// index: Menemukan indeks karyawan dalam array employees.
// Hapus Karyawan: Jika indeks ditemukan (index !== -1), menghapus karyawan dari array employees.
// Response: Mengirim pesan sukses jika penghapusan berhasil; jika tidak ditemukan, mengirim pesan error 404.


// Mengekspor router untuk digunakan di file lain (misalnya di server.js)
module.exports = router;
// Penjelasan: Mengekspor router agar dapat digunakan di file lain, seperti server.js, untuk mengaktifkan rute karyawan pada server utama.