const express = require('express');
const mysql = require('mysql2');
const QRCode = require('qrcode'); // <-- Added QR library
require('dotenv').config();

const app = express();
app.use(express.json());

// Isolated connection just for the Asset Service
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'db_assets' 
}).promise();

// 1. Get all assets
app.get('/api/assets', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM assets');
        res.json({ message: "Assets fetched", data: rows });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 2. Validate asset by QR Hash (Used internally by Transfer Service & Scanner)
app.get('/api/assets/qr/:hash', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM assets WHERE qr_hash = ?', [req.params.hash]);
        if (rows.length === 0) return res.status(404).json({ error: "Asset not found" });
        res.json({ message: "Asset valid", data: rows[0] });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 3. Update asset location
app.put('/api/assets/:id/location', async (req, res) => {
    try {
        const { current_ward, status } = req.body;
        await db.query('UPDATE assets SET current_ward = ?, status = ? WHERE id = ?', [current_ward, status, req.params.id]);
        res.json({ message: "Asset location updated" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ==========================================
// [!] NEW MISSING ROUTES ADDED BELOW
// ==========================================

// 4. Register a new asset (Used by index.html form)
app.post('/api/assets', async (req, res) => {
    const { name, type, current_ward, qr_hash } = req.body;
    try {
        await db.query(
            "INSERT INTO assets (name, type, current_ward, status, qr_hash) VALUES (?, ?, ?, 'Available', ?)",
            [name, type, current_ward, qr_hash]
        );
        res.status(201).json({ message: "Asset registered successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 5. Generate QR Code Image (Used by index.html Print QR Modal)
app.get('/api/assets/qr/generate/:hash', async (req, res) => {
    try {
        const hash = req.params.hash;
        const qrImageBase64 = await QRCode.toDataURL(hash);
        res.json({ message: "QR Code generated", image: qrImageBase64 });
    } catch (err) {
        console.error("Failed to generate QR", err);
        res.status(500).json({ error: "Failed to generate QR code" });
    }
});

app.listen(3001, () => console.log('📦 Asset Service running on port 3001'));