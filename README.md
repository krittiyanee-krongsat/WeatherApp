# 🌤️ Weather App

A weather forecast application built with **Angular** that fetches real-time data from the [Open-Meteo API](https://open-meteo.com/).

---

## 🛠️ Tech Stack

| Layer     | Technology                           |
|-----------|---------------------------------------|
| Framework | Angular                               |
| Language  | TypeScript                            |
| Styling   | Tailwind CSS                          |
| Data      | Open-Meteo API                        |

---

## 📁 Project Structure

```
WEATHERAPP/
├── src/
│   ├── app/
│   │   ├── weather/
│   │   │   ├── weather.css
│   │   │   ├── weather.html
│   │   │   ├── weather.spec.ts
│   │   │   └── weather.ts
│   │   ├── app-module.ts
│   │   ├── app-routing-module.ts
│   │   ├── app.css
│   │   ├── app.html
│   │   ├── app.module.server.ts
│   │   ├── app.routes.server.ts
│   │   ├── app.spec.ts
│   │   ├── app.ts
│   │   ├── weather.spec.ts
│   │   └── weather.ts
│   ├── index.html
│   ├── main.server.ts
│   ├── main.ts
│   ├── server.ts
│   └── styles.css
├── .postcssrc.json
├── angular.json
├── package.json
├── tsconfig.json
├── tsconfig.app.json
└── tsconfig.spec.json
```

---

## ✅ Prerequisites

Make sure you have **Node.js** installed on your machine.

```bash
node -v
```

> If Node.js is not installed, download it at: [https://nodejs.org](https://nodejs.org)

---

## 🚀 Getting Started

### 1. Install Angular CLI

```bash
npm install -g @angular/cli
```

### 2. Create a New Project

```bash
ng new <my-project> --no-standalone
cd <my-project>
```

### 3. Open in VS Code

```bash
code .
```

### 4. Run the App

```bash
ng serve --open
```

The app will automatically open at [http://localhost:4200](http://localhost:4200)

---

## 🌐 API Reference

This app utilizes two endpoints from [Open-Meteo](https://open-meteo.com/), both of which are free and require no API key.

| Endpoint  | URL                                              | Description            |
|-----------|--------------------------------------------------|------------------------|
| Geocoding | `https://geocoding-api.open-meteo.com/v1/search` | Search city by name    |
| Forecast  | `https://api.open-meteo.com/v1/forecast`         | Get weather by lat/lon |

---

## ✨ Features

- 🎨 Glassmorphism UI built with Tailwind CSS.
- 🔍 Search the weather by city name via the input field.
- 🖥️ Display current temperature on the weather card with city name.
- 🌡️ Show high/low temperature, humidity, and wind speed.

---

## 📸 Screenshots

### Home Screen
<img width="300" height="300" alt="menu" src="https://github.com/user-attachments/assets/d70740c6-766a-4eee-b4ec-1ca2c5f79ce1" />

### Information Screen
<img width="300" height="300" alt="Information" src="https://github.com/user-attachments/assets/e8004d7c-c2b4-4db7-b449-bb9acdca211a" />
