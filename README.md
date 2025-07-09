
# 🌡️ NVROX - Environmental X

**NVROX** is a real-time environmental monitoring system for temperature and humidity, designed for industrial use. It uses **ESP32** microcontrollers with sensors, communicates via **MQTT (EMQX broker)**, and features a powerful backend with **Node.js** and a modern frontend using **React (Vite + TypeScript)**.

> NVROX = **ENVIRonmental + X**  
> A smart, scalable monitoring solution for your factory floor.

---

## 📦 Tech Stack

### 🔌 IoT & Communication
- **ESP32** microcontrollers
- **MQTT protocol** via **EMQX** broker

### 🛠️ Backend
- **Node.js** + **Express.js**
- **Knex.js** (SQL query builder)
- **MariaDB** (relational database)
- **Socket.IO** (WebSocket for real-time data)

### 💻 Frontend
- **React** (Vite + TypeScript)
- **TailwindCSS** + **ShadCN UI**
- **Socket.IO Client** for real-time updates

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

MQTT_BROKER=ws://localhost:8083/mqtt
MQTT_TOPIC=sensor/+
MQTT_QOS=1
```

> Make sure your EMQX broker is running and accessible via WebSocket.

---

### 4. Run the Application

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

- 📶 Real-time temperature & humidity monitoring
- 🔧 MQTT-based device communication (EMQX)
- 📊 Web-based dashboard with live updates
- 🧠 Configurable thresholds & alert logic
- 🗃️ Historical data storage (MariaDB)
- 🔌 Fast WebSocket communication with Socket.IO
- 📱 Ready for industrial & scalable deployment

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

For questions or business inquiries, reach out via [email@example.com] or submit an issue in the repository.
