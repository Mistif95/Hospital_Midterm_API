-- ==========================================
-- 1. ASSET DATABASE (For Asset Service)
-- ==========================================
CREATE DATABASE IF NOT EXISTS db_assets;
USE db_assets;

CREATE TABLE assets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(100),
    current_ward VARCHAR(100) NOT NULL,
    status ENUM('Available', 'In Transit', 'Maintenance') DEFAULT 'Available',
    qr_hash VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO assets (name, type, current_ward, status, qr_hash) VALUES 
('Patient Monitor A1', 'Electronic', 'ICU', 'Available', 'qr_hash_12345'),
('Wheelchair W-05', 'Transport', 'ER', 'Available', 'qr_hash_67890');

-- ==========================================
-- 2. WARD DATABASE (For Ward Service)
-- ==========================================
CREATE DATABASE IF NOT EXISTS db_wards;
USE db_wards;

CREATE TABLE wards (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ward_name VARCHAR(100) UNIQUE NOT NULL,
    asset_count INT DEFAULT 0
);

INSERT INTO wards (ward_name, asset_count) VALUES 
('ICU', 1),
('ER', 1),
('Radiology', 0);

-- ==========================================
-- 3. TRANSFER DATABASE (For Transfer Service)
-- ==========================================
CREATE DATABASE IF NOT EXISTS db_transfers;
USE db_transfers;

CREATE TABLE transfers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    asset_id INT NOT NULL,
    from_ward VARCHAR(100) NOT NULL,
    to_ward VARCHAR(100) NOT NULL,
    transfer_status ENUM('Pending', 'In Transit', 'Completed') DEFAULT 'Pending',
    requested_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP NULL
);