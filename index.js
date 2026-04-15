const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies and handle CORS
app.use(express.json());
app.use(cors());

// ==========================================
// 1. WARD MANAGEMENT (Ward Inventory)
// ==========================================
app.get('/api/ward-assets', (req, res) => {
    // TODO: Connect to Ward Service/MySQL Table A
    res.json({ message: "GET: Fetched all ward assets successfully" });
});

app.post('/api/ward-assets', (req, res) => {
    // TODO: Connect to Ward Service/MySQL Table A
    const newAsset = req.body;
    res.status(201).json({ message: "POST: New ward asset created", data: newAsset });
});

// ==========================================
// 2. MOVEMENT LOGIC (Transfer Log)
// ==========================================
app.get('/api/transfers', (req, res) => {
    // TODO: Connect to Transfer Service/MySQL Table B
    res.json({ message: "GET: Fetched transfer history successfully" });
});

app.post('/api/transfers', (req, res) => {
    // TODO: Connect to Transfer Service/MySQL Table B
    const transferData = req.body;
    res.status(201).json({ message: "POST: Asset transfer initiated", data: transferData });
});

app.put('/api/transfers/receive', (req, res) => {
    // TODO: Update transfer status in MySQL Table B
    res.json({ message: "PUT: Asset transfer confirmed and received" });
});

// ==========================================
// 3. DATA INTEGRITY (Asset Validation & QR)
// ==========================================
app.get('/api/internal/asset-check/:id', (req, res) => {
    const assetId = req.params.id;
    // TODO: Validate status from MySQL
    res.json({ message: `GET: Checked status for asset ID: ${assetId}` });
});

app.get('/api/asset-check/qr/:hash', (req, res) => {
    const qrHash = req.params.hash;
    // TODO: Decode QR hash and return asset details
    res.json({ message: `GET: Scanned QR code with hash: ${qrHash}` });
});

// Start the server
app.listen(port, () => {
    console.log(`Hospital Asset Transfer API is running on http://localhost:${port}`);
});
