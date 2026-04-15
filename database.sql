CREATE DATABASE IF NOT EXISTS hospital_assets;
USE hospital_assets;

-- (Assets)
CREATE TABLE assets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(100),
    current_ward VARCHAR(100) NOT NULL,
    status ENUM('Available', 'In Transit', 'Maintenance') DEFAULT 'Available',
    qr_hash VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- (Movement History / Transfer log)
CREATE TABLE transfers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    asset_id INT NOT NULL,
    from_ward VARCHAR(100) NOT NULL,
    to_ward VARCHAR(100) NOT NULL,
    transfer_status ENUM('Pending', 'In Transit', 'Completed') DEFAULT 'Pending',
    requested_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP NULL,
    FOREIGN KEY (asset_id) REFERENCES assets(id) ON DELETE CASCADE
);

-- Dummy data insert
INSERT INTO assets (name, type, current_ward, status, qr_hash) VALUES 
('Patient Monitor A1', 'Electronic', 'ICU', 'Available', 'qr_hash_12345'),
('Wheelchair W-05', 'Transport', 'ER', 'Available', 'qr_hash_67890');
