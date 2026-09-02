# Md. Ismail - Portfolio & Biography Web Application

A modern, responsive, full-featured personal portfolio, biography, and content management web application built with **React**, **TypeScript**, **Vite**, **Tailwind CSS**, and **Firebase (Firestore & Auth)**.

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### 2. Installation
Open your terminal inside the project root folder and run:
```bash
npm install
```

### 3. Running Locally in Development
To start the local development server:
```bash
npm run dev
```
Open your browser at `http://localhost:3000` (or the port displayed in the terminal).

### 4. Building for Production
To build the production-ready static assets:
```bash
npm run build
```
This generates optimized static HTML, CSS, JavaScript, and asset bundles inside the **`dist/`** directory.

---

## 📂 Output Directory

- **Build Output**: `dist/`
- All assets are built with relative paths (`./`) and SPA routing fallbacks (`404.html`, `_redirects`, `vercel.json`), making the output compatible with all major static web hosting providers.

---

## 🌐 Deploying to Free Web Hosting

This application is **100% STATIC HOSTING READY** (Single Page Application with Firebase as a Backend-as-a-Service). It does not require a custom Node.js server to run in production.

### Option A: Deploy to Vercel (Recommended - 1 Click / GitHub)
1. Push this project to your GitHub repository or upload the ZIP.
2. Go to [Vercel](https://vercel.com) and click **Add New Project**.
3. Select your repository.
4. Framework Preset: **Vite**
5. Build Command: `npm run build`
6. Output Directory: `dist`
7. Click **Deploy**. (The included `vercel.json` automatically handles SPA routing).

### Option B: Deploy to Netlify
1. Go to [Netlify](https://netlify.com) and click **Add new site** > **Import an existing project** (or drag & drop the `dist/` folder).
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Click **Deploy**. (The included `public/_redirects` automatically handles SPA routing).

### Option C: Deploy to GitHub Pages
1. Build the project using `npm run build`.
2. Push the contents of `dist/` to your `gh-pages` branch or configure GitHub Actions to deploy from `dist/`.
3. The build script automatically copies `index.html` to `404.html` and includes `.nojekyll` to support GitHub Pages out-of-the-box.

### Option D: Deploy to Firebase Hosting
1. Install Firebase CLI: `npm install -g firebase-tools`
2. Run `firebase login` and `firebase init hosting`
3. Specify `dist` as your public directory and configure as a single-page app (y).
4. Run `firebase deploy --only hosting`

### Option E: Deploy to Cloudflare Pages / Render
1. Build command: `npm run build`
2. Output directory: `dist`

---

## ⚙️ Environment Variables Configuration

The application includes working default Firebase configuration in `firebase-applet-config.json`. 

If you wish to connect your own custom Firebase project, copy `.env.example` to `.env` and fill in your credentials:

```env
VITE_FIREBASE_API_KEY="your-api-key"
VITE_FIREBASE_AUTH_DOMAIN="your-project.firebaseapp.com"
VITE_FIREBASE_PROJECT_ID="your-project-id"
VITE_FIREBASE_STORAGE_BUCKET="your-project.firebasestorage.app"
VITE_FIREBASE_MESSAGING_SENDER_ID="your-sender-id"
VITE_FIREBASE_APP_ID="your-app-id"
VITE_FIREBASE_DATABASE_ID="(default)"
```

---

## 🔐 Admin Panel Guide

- **Access URL**: Open your website and navigate to `/#/admin` (or click the secret admin link / direct button).
- **Features Available**:
  - **Overview & Cloud Sync**: View live statistics and sync sample data to cloud Firestore.
  - **Live Content Management**: Add, edit, or delete items across Life Story, Education, Projects, Creations, Photo Gallery, Videos, Favorites, Blog Posts, and Future Goals.
  - **Site Settings**: Customize hero titles, social links, contact information, and biography text.
  - **Messages Inbox**: Read incoming contact messages sent through the website contact form.
- **Authentication**:
  - Email/Password sign-in with automatic local secure fallback.
  - One-click direct dashboard access mode.

---

## 🛠️ Tech Stack
- **Framework**: React 19 + TypeScript
- **Bundler**: Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Animations**: Motion (Framer Motion)
- **Database & Auth**: Firebase Firestore & Firebase Authentication
