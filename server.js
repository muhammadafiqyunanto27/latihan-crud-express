const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// Import routes dari folder routes
const productsRoute = require('./routes/products');
const usersRoute = require('./routes/users');
const ordersRoute = require('./routes/orders');
const employeesRoute = require('./routes/employees');
const booksRoute = require('./routes/books');

// Gunakan routes dengan path yang sesuai
app.use('/api/products', productsRoute);   // Path untuk products
app.use('/api/users', usersRoute);         // Path untuk users
app.use('/api/orders', ordersRoute);       // Path untuk orders
app.use('/api/employees', employeesRoute); // Path untuk employees
app.use('/api/books', booksRoute);         // Path untuk books

// Jalankan server
app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});