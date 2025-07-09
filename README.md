# 🌡️ NVROX - Environmental X

**NVROX** is a real-time environmental monitoring system for temperature and humidity, designed for industrial use. It uses **ESP32** microcontrollers with sensors, communicates via **MQTT (EMQX broker)**, and features a powerful backend with **Node.js** and a modern frontend using **React (Vite + TypeScript)**.

> NVROX = **ENVIRonmental + X**  
> A smart, scalable monitoring solution for your factory floor.

---

## ⚙️ Prerequisites

- **Node.js (v18+)**

- **EMQX Broker (MQTT)**  
  > Make sure EMQX is installed and running as a background service.

- **Redis**  
  > Make sure Redis is installed and running as a background service.

- **MariaDB** atau **MySQL**  
  > Ensure the database server is installed and accessible.

---

## 📦 Tech Stack

### 🔌 IoT & Communication

-   **ESP32** microcontrollers
-   **MQTT protocol** via **EMQX** broker

### 🛠️ Backend

-   **Node.js** + **Express.js**
-   **Knex.js** (SQL query builder)
-   **MariaDB** (relational database)
-   **Socket.IO** (WebSocket for real-time data)
-   **Redis** (caching & fast data access)

### 💻 Frontend

-   **React** (Vite + TypeScript)
-   **TailwindCSS** + **ShadCN UI**
-   **Socket.IO Client** for real-time updates

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/nvrox.git
cd nvrox
```

### 2. Install Dependencies

#### Backend

```bash
cd backend
npm install
```

#### Frontend

```bash
cd ../frontend
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the `backend/` directory:

```env
DB_HOST=localhost
DB_USER=root
DB_PASS=yourpassword
DB_NAME=nvrox_db

MQTT_BROKER=mqtt://localhost:1883
MQTT_TOPIC=nvrox/temp-hum
MQTT_QOS=1
```

---

### 4. Setup the Database

Run the following commands to apply migrations and seed initial data:

```bash
npx knex migrate:latest --knexfile ./database/knexConfig.js
npx knex seed:run --knexfile ./database/knexConfig.js
```

---

### 5. Run the Application

#### Start Backend

```bash
cd backend
npm run dev
```

#### Start Frontend

```bash
cd ../frontend
npm run dev
```

Open your browser and go to `http://localhost:5173` to access the monitoring dashboard.

---

## ✨ Features

-   📶 Real-time temperature & humidity monitoring
-   🔧 MQTT-based device communication (EMQX)
-   📊 Web-based dashboard with live updates
-   🧠 Configurable thresholds & alert logic
-   🗃️ Historical data storage (MariaDB)
-   🔌 Fast WebSocket communication with Socket.IO
-   📱 Ready for industrial & scalable deployment

---

## 🗂 Project Structure

```
nvrox/
├── backend/          # API, MQTT client, database handlers
│   ├── index.js
│   ├── routes/
│   ├── mqtt/
│   ├── database/
│   └── ...
├── frontend/         # Web UI (React + Vite)
│   ├── src/
│   ├── public/
│   └── ...
├── README.md
```

---

## 📷 Screenshots (optional)

> Add UI screenshots here if available, for better visual reference.

---

## 📃 License

This project is licensed under the **MIT License**.  
Feel free to use, modify, and distribute as needed.

---

## 🤝 Contribution

Contributions are welcome!  
Feel free to open issues, fork the repo, and submit pull requests.

---

## 📬 Contact

For questions or support, please open an issue or contact [debugmeAI](https://github.com/debugmeAI)
