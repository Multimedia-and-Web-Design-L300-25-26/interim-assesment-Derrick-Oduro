[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/fcRde9Vj)

# Coinbase Clone - React & Tailwind CSS Assignment

## 📋 Overview

In this assignment, you will build a full clone of the [Coinbase](https://www.coinbase.com/) website using **React.js** and **Tailwind CSS**. This project will help you practice component-based architecture, client-side routing, responsive design, and modern CSS utilities.

---

## 🚀 Getting Started

After accepting this assignment, follow these steps:

### 1. Clone Your Repository

```bash
git clone <your-repository-url>
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

---

### Technical Requirements

- [ ] Use **React Router** for client-side navigation
- [ ] Use **functional components** with React hooks
- [ ] Create **reusable components** (Button, Card, CryptoRow, etc.)
- [ ] Use **Tailwind CSS** for all styling (no external CSS frameworks)
- [ ] Implement **responsive design** (mobile, tablet, desktop)
- [ ] Use **React state management** (useState, useContext, or similar)
- [ ] Follow **proper file structure** and naming conventions
- [ ] Write **clean, readable code** with appropriate comments

---

## 📁 Project Structure

```
src/
├── assets/          # Images, icons, and other static files
├── components/      # Reusable React components
│   ├── common/      # Shared components (Button, Card, Input, etc.)
│   ├── layout/      # Layout components (Navbar, Footer, Sidebar)
│   └── crypto/      # Crypto-specific components (CryptoCard, PriceChart)
├── pages/           # Page components
│   ├── Home.jsx
│   ├── Explore.jsx
│   ├── AssetDetail.jsx
│   ├── Learn.jsx
│   ├── SignIn.jsx
│   └── SignUp.jsx
├── data/            # Mock data and constants
├── hooks/           # Custom React hooks (optional)
├── App.jsx          # Main application with routing
├── App.css          # Global styles (if needed)
├── main.jsx         # Application entry point
└── index.css        # Tailwind CSS imports
```

---

## 🎨 Design Reference

Visit [coinbase.com](https://www.coinbase.com/)

- Overall layout and structure across all pages
- Consistent color scheme and typography
- Navigation flow between pages
- Responsive behavior on all screen sizes
- User interface patterns and interactions

---

## 💡 Helpful Resources

- [React Documentation](https://react.dev/)
- [React Router Documentation](https://reactrouter.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vite Documentation](https://vitejs.dev/)
- [Heroicons](https://heroicons.com/) - Free SVG icons
- [reacticons](https://react-icons.github.io/react-icons/) - Free SVG icons

---

## 🌐 Deployment on Netlify

You must deploy your completed project on **Netlify**.

---

## IA Integration Setup (Node + MongoDB)

This repository now includes a backend API in `backend/` for authentication, protected profile access, and crypto data integration.

### Backend setup

1. Install backend dependencies:

```bash
cd backend
npm install
```

2. Create `backend/.env` using `backend/.env.example`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_strong_secret
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

3. Start backend:

```bash
npm run start
```

### Frontend setup

From project root:

```bash
npm install
npm run dev
```

Optional frontend API URL override (root `.env`):

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

### Implemented IA endpoints

- `POST /register` and `POST /api/auth/register`
- `POST /login` and `POST /api/auth/login`
- `GET /profile` and `GET /api/auth/profile` (protected)
- `GET /crypto` and `GET /api/crypto`
- `GET /crypto/gainers` and `GET /api/crypto/gainers`
- `GET /crypto/new` and `GET /api/crypto/new`
- `POST /crypto` and `POST /api/crypto` (protected)

### Frontend IA features wired

- Register and login forms submit to backend.
- JWT auth handled via HTTP-only cookie.
- Protected profile page at `/profile`.
- Home, Explore, and Asset Detail pull crypto data from backend.
- Profile page contains authenticated add-crypto form for POST crypto testing.
