# 🛡️ PolyPharm Guard

**Safe Medication Management for Elderly Patients**

A modern React + Vite web application for detecting drug interactions, scanning prescriptions, and
providing clear medication information — designed with elderly users in mind.

---

## ✨ Features

| Page | Features |
|---|---|
| 🏠 **Home** | Hero search, quick-access cards, recent checks, stats strip |
| 💊 **Drug Checker** | Up to 6 drugs, quick-add tags, risk levels (High / Moderate / Safe), detailed recommendations |
| 🔍 **Drug Info** | Search 10 medications, tabbed details (Uses, Dosage, Side Effects, Warnings) |
| 📋 **Prescription Scanner** | Drag-and-drop upload, animated progress bar, detected drugs + interaction report |
| 🩺 **Health Tools** | Pill Identifier, Symptom Checker, Dosage Calculator, Interaction History, Emergency Contacts |
| 📚 **Resources** | Articles grid, animated FAQ accordion, Safety Tips, Newsletter CTA |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn

### Installation

```bash
# 1. Navigate into the project folder
cd polypharm-guard

# 2. Install all dependencies
npm install

# 3. Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
npm run preview   # Preview the production build locally
```

---

## 🗂️ Folder Structure

```
polypharm-guard/
├── index.html                     # HTML entry point
├── vite.config.js                 # Vite configuration
├── tailwind.config.js             # Tailwind CSS + custom tokens
├── postcss.config.js
├── package.json
└── src/
    ├── main.jsx                   # React DOM entry
    ├── App.jsx                    # Router + AnimatePresence wrapper
    ├── index.css                  # Global styles + Tailwind directives
    │
    ├── data/
    │   ├── drugData.js            # Drug interactions, drug info, articles, FAQs, tips
    │   └── helpers.js             # normKey(), riskMeta() utilities
    │
    ├── components/
    │   ├── Navbar.jsx             # Sticky navbar with mobile menu
    │   ├── Footer.jsx             # Footer with link columns
    │   └── UI.jsx                 # Reusable: Card, Button, Input, RiskBadge, Stagger, etc.
    │
    └── pages/
        ├── HomePage.jsx           # Hero + quick cards + stats
        ├── DrugCheckerPage.jsx    # Multi-drug interaction checker
        ├── DrugInfoPage.jsx       # Searchable drug information
        ├── ScannerPage.jsx        # Prescription upload + scan simulation
        ├── HealthToolsPage.jsx    # 6 health tools
        └── ResourcesPage.jsx      # Articles, FAQs, Safety Tips
```

---

## 🎨 Design System

| Token | Value |
|---|---|
| Primary font | `Outfit` (Google Fonts) |
| Heading font | `Fraunces` (serif, Google Fonts) |
| Navy (primary) | `#0d2b5e` |
| Navy dark | `#081c3f` |
| Navy mid | `#1a4080` |
| Sky light | `#dbeafe` |
| High risk | Red `#dc2626` |
| Moderate risk | Amber `#d97706` |
| Safe | Emerald `#059669` |

---

## 🔧 Tech Stack

- **React 18** — UI library
- **Vite 5** — Build tool & dev server
- **Tailwind CSS 3** — Utility-first styling
- **Framer Motion 11** — Page transitions & micro-animations
- **React Router DOM 6** — Client-side routing

---

## ⚕️ Disclaimer

This application is for **educational purposes only**. It does not constitute medical advice. Always
consult a qualified doctor or pharmacist before making any changes to your medication regimen.

---

© 2024 PolyPharm Guard — Safe Medication, Better Health
