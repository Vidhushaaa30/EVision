# EVision

AI‑Powered Route Intelligence Platform for Electric Vehicles

[![Next.js](https://img.shields.io/badge/Next.js-14-black)]()
[![React](https://img.shields.io/badge/React-18-blue)]()
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)]()
[![License](https://img.shields.io/badge/license-MIT-green)]()
[![Status](https://img.shields.io/badge/status-active-success)]()

---

# Overview

EVision is an AI‑driven route intelligence platform designed to optimize route planning for electric vehicles by analyzing energy consumption, battery health, terrain impact, and operational cost.

Traditional navigation systems optimize routes based only on distance or travel time. However, electric vehicles introduce additional constraints such as battery degradation, energy variability, terrain influence, and charging cost dynamics. EVision addresses these challenges by modeling EV behavior and recommending routes that minimize operational cost while maintaining battery health.

The system supports both **fleet operators** and **individual EV users**, providing role‑based dashboards and intelligent route planning tools.

---

# Key Features

### Intelligent Route Optimization
Analyzes multiple route alternatives and recommends the most energy‑efficient path.

### Battery Health Modeling
Predicts battery degradation and energy consumption for route decisions.

### Fleet and Individual Modes
Supports both EV fleet operators and individual EV owners through separate dashboards.

### Route Visualization
Displays optimized routes through interactive map visualizations.

### Cost Prediction
Estimates operational cost based on predicted energy consumption.

### Modular UI System
Reusable UI component architecture built using TypeScript.

---

# System Architecture
User Interface (Next.js + React + TypeScript)
│
▼
Application Components
│
▼
Custom Hooks / State Logic
│
▼
EV Health Prediction Model
│
▼
Route Optimization Engine
│
▼
Recommended Route Output
# Project Structure
EVV
│
├── app
│ ├── globals.css
│ ├── layout.tsx
│ └── page.tsx
│
├── components
│ ├── ui
│ │ ├── button.tsx
│ │ ├── card.tsx
│ │ ├── dialog.tsx
│ │ ├── sidebar.tsx
│ │ └── other reusable UI components
│ │
│ ├── analytics-view.tsx
│ ├── app-sidebar.tsx
│ ├── dashboard-shell.tsx
│ ├── fleet-dashboard.tsx
│ ├── fleet-maintenance.tsx
│ ├── individual-dashboard.tsx
│ ├── individual-maintenance.tsx
│ ├── login-page.tsx
│ ├── route-map-visualization.tsx
│ ├── route-planner-view.tsx
│ ├── settings-view.tsx
│ └── theme-provider.tsx
│
├── hooks
│ ├── use-mobile.ts
│ └── use-toast.ts
│
├── lib
│ ├── auth-context.tsx
│ ├── ev-health-model.ts
│ └── utils.ts
│
├── styles
│
├── package.json
├── tsconfig.json
├── next.config.mjs
└── README.md

---

# Core Modules

### Route Planner
Handles route inputs, route comparison, and route recommendation logic.

### EV Health Model
Predicts battery degradation and energy consumption based on route parameters.

### Dashboard System
Provides analytics dashboards for both fleet operators and individual EV users.

### UI Component Library
Reusable component system built with TypeScript for scalable UI development.

---

# Installation

### Clone the repository
git clone https://github.com/your-username/evision.git
cd evision


### Install dependencies

Using npm
npm install


Using pnpm
pnpm install


---

### Run development server
npm run dev


or
pnpm dev


Application runs at
http://localhost:3000


---

# Screenshots
<img width="1914" height="880" alt="image" src="https://github.com/user-attachments/assets/4cf90a71-0767-44b4-acb0-50264cc84337" />
<img width="1919" height="877" alt="image" src="https://github.com/user-attachments/assets/8ae18f7e-6288-40f9-916c-1b9022f69ad6" />
<img width="1919" height="883" alt="image" src="https://github.com/user-attachments/assets/729c0712-aff8-4d01-9189-13d6c0a5c6d8" />
<img width="1919" height="881" alt="image" src="https://github.com/user-attachments/assets/8eb24332-5097-4138-85f6-153d619a62af" />
<img width="1896" height="879" alt="image" src="https://github.com/user-attachments/assets/211aa2c1-49bc-4491-9ea0-a1623e9c069a" />


---

# Use Cases

• Electric vehicle fleet management  
• Battery‑aware route planning  
• Energy‑efficient navigation  
• Intelligent EV trip optimization  

---

# Future Enhancements

• Real‑time traffic integration  
• Charging station recommendation  
• Advanced battery health prediction  
• Mobile driver application  
• Fleet monitoring analytics  

---

# Author

Vidhusha

Full Stack and AI development project focused on intelligent EV routing and transportation optimization systems.

