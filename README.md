 [!] What is this 
 =

🏥 Hospital Asset Tracking System (Microservices)
This project is a decentralized web application designed to track the movement of hospital assets (e.g., wheelchairs, patient monitors) across different wards using QR codes. It is built using a Node.js Microservices Architecture with an API Gateway and MySQL databases.

[!] API
=

🌐 API Gateway (Port 3000): Acts as the single entry point. Routes all frontend requests to the appropriate microservice and serves the Swagger API Documentation.

🌐 Asset Service (Port 3001): Manages the master inventory (db_assets). Handles registering new items, generating QR codes, and tracking the current status (Available, In Transit, In Use).

🌐 Ward Service (Port 3002): Manages hospital locations (db_wards). Tracks the capacity and details of the ER, ICU, Radiology, etc.

🌐 Transfer Service (Port 3003): The logistics brain (db_transfers). Handles the movement of assets. It communicates dynamically with the Asset Service to validate availability before allowing a transfer.

[!] Prerequisites
=

- Node.js (v18 or higher recommended)
- XAMPP

[!] How to run?
=

1. Database Setup - Use provided database inside the folder and import them directly into your database client (in this case, we're using XAMPP)

2. Environment Configuration - Ensure you have a .env file in the root directory with your local database credentials:

---> .env
- DB_HOST=127.0.0.1
- DB_USER=root
- DB_PASSWORD=

3. Install Dependencies - Open a terminal in the project folder and run:

- Bash
- npm install

4. Running the application - Because this uses a microservices architecture, you must start the API Gateway and all three services simultaneously.
Open 4 separate terminal windows in your project folder and run the following commands, one in each terminal:

- node gateway.js
- node asset-service.js
- node ward-service.js
- node transfer-service.js

[!] User Interface
=


Once the servers are running, you can access the frontend by double-clicking the HTML files in your browser:

1. Admin Dashboard (index.html): The central hub for hospital admins. Here, you can register new assets, print QR tags, initiate transfers between wards, and monitor the live status of all equipment.

2. Staff Scanner (scanner.html): A mobile-friendly interface for nurses and porters. Uses the device camera to scan asset QR codes. When a transferred item arrives at its destination, scanning it allows the staff to confirm receipt and mark it as "In Use".

📖 API Documentation
This project includes fully interactive OpenAPI (Swagger) documentation.

With the servers running, open your web browser and navigate to:
👉 http://localhost:3000/api-docs
