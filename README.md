# EVision

AI‑Powered Route Intelligence Platform for Electric Vehicles

[![Next.js](https://img.shields.io/badge/Next.js-14-black)]()
[![React](https://img.shields.io/badge/React-18-blue)]()
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)]()
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
```
EVV/
│
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── ui/
│   │   ├── accordion.tsx
│   │   ├── alert-dialog.tsx
│   │   ├── alert.tsx
│   │   ├── aspect-ratio.tsx
│   │   ├── avatar.tsx
│   │   ├── badge.tsx
│   │   ├── breadcrumb.tsx
│   │   ├── button-group.tsx
│   │   ├── button.tsx
│   │   ├── calendar.tsx
│   │   ├── card.tsx
│   │   ├── carousel.tsx
│   │   ├── chart.tsx
│   │   ├── checkbox.tsx
│   │   ├── collapsible.tsx
│   │   ├── command.tsx
│   │   ├── context-menu.tsx
│   │   ├── dialog.tsx
│   │   ├── drawer.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── field.tsx
│   │   ├── form.tsx
│   │   ├── hover-card.tsx
│   │   ├── input-group.tsx
│   │   ├── input-otp.tsx
│   │   ├── input.tsx
│   │   ├── item.tsx
│   │   ├── kbd.tsx
│   │   ├── label.tsx
│   │   ├── menubar.tsx
│   │   ├── navigation-menu.tsx
│   │   ├── pagination.tsx
│   │   ├── popover.tsx
│   │   ├── progress.tsx
│   │   ├── radio-group.tsx
│   │   ├── resizable.tsx
│   │   ├── scroll-area.tsx
│   │   ├── select.tsx
│   │   ├── separator.tsx
│   │   ├── sheet.tsx
│   │   ├── sidebar.tsx
│   │   ├── skeleton.tsx
│   │   ├── slider.tsx
│   │   ├── sonner.tsx
│   │   ├── spinner.tsx
│   │   ├── switch.tsx
│   │   ├── table.tsx
│   │   ├── tabs.tsx
│   │   ├── textarea.tsx
│   │   ├── toast.tsx
│   │   ├── toaster.tsx
│   │   ├── toggle-group.tsx
│   │   ├── toggle.tsx
│   │   ├── tooltip.tsx
│   │   ├── use-mobile.tsx
│   │   └── use-toast.ts
│   │
│   ├── analytics-view.tsx
│   ├── app-sidebar.tsx
│   ├── dashboard-shell.tsx
│   ├── fleet-dashboard.tsx
│   ├── fleet-maintenance.tsx
│   ├── individual-dashboard.tsx
│   ├── individual-maintenance.tsx
│   ├── login-page.tsx
│   ├── route-map-visualization.tsx
│   ├── route-planner-view.tsx
│   ├── settings-view.tsx
│   └── theme-provider.tsx
│
├── hooks/
│   ├── use-mobile.ts
│   └── use-toast.ts
│
├── lib/
│   ├── auth-context.tsx
│   ├── ev-health-model.ts
│   └── utils.ts
│
├── styles/
│
├── node_modules/
│
├── .gitignore
├── components.json
├── next-env.d.ts
├── next.config.mjs
├── package.json
├── package-lock.json
├── pnpm-lock.yaml
├── postcss.config.mjs
└── tsconfig.json
```
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

