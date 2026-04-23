const express = require('express');
const mysql = require('mysql2');
require('dotenv').config();

const app = express();
app.use(express.json());

// Isolated connection just for the Asset Service
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'db_wards'
}).promise();

app.get('/api/wards', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM wards');
        res.json({ message: "Ward inventory fetched", data: rows });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(3002, () => console.log('🏥 Ward Service running on port 3002'));