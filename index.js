const express = require("express");
const { getConnection } = require("./db"); // Import DB connection
const app = express();
const PORT = 5000;

app.get("/", (req, res) => {
    res.send("Welcome to the Node.js API!");
});

app.use(express.json()); // Middleware to parse JSON

// 1️⃣ Get All Products
app.get("/products", async (req, res) => {
    try {
        const conn = await getConnection();
        const rows = await conn.query("SELECT * FROM products");
        conn.release(); // Release connection
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 2️⃣ Add a New Product
app.post("/products", async (req, res) => {
    try {
        const { name, price } = req.body;
        const conn = await getConnection();
        const result = await conn.query("INSERT INTO products (name, price) VALUES (?, ?)", [name, price]);
        conn.release();
        res.status(201).json({ id: result.insertId, name, price });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
