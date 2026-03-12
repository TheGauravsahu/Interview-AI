# 🖥 Frontend

The frontend of **Interview AI** is built using **React + Vite** with a **modular architecture** for scalability and maintainability.

The UI allows users to:

* Register and login
* Upload resumes
* Generate interview plans
* View interview reports
* Download interview reports as PDFs

---

# ⚛️ Frontend Architecture

The frontend follows a **feature-based modular architecture**.

Each module contains its own:

* components
* pages
* hooks
* services

This keeps the codebase **clean, scalable, and maintainable**.

```
src
│
├── modules
│   ├── auth
│   ├── interview
│
├── components
├── lib
├── assets
```

---

# 🧩 Frontend Modules

The frontend is divided into **two primary modules**.

---

# 🔐 Auth Module

Responsible for:

* User authentication
* Managing login state
* Protecting routes

### Features

* Sign Up
* Sign In
* Sign Out
* Get current user

### API Integration

The auth module communicates with:

```
/api/auth
```

Endpoints used:

```
POST /api/auth/signUp
POST /api/auth/signIn
POST /api/auth/signOut
GET /api/auth/getCurrentUser
```

### Auth Flow

1. User submits login form
2. Request sent to backend
3. Backend returns JWT cookie
4. Cookie automatically stored by browser
5. Protected routes become accessible

---

# 📄 Interview Module

Responsible for:

* Resume upload
* Interview generation
* Displaying results
* PDF download

### Features

* Upload resume
* Generate interview plan
* View previous interview reports
* Export interview report as PDF

### API Integration

Endpoints used:

```
GET /api/interviews
GET /api/interviews/generate
```

---

# 📤 Resume Upload

Resume uploads are handled using:

```
react-dropzone
```

Features:

* Drag and drop upload
* File validation
* Only accepts PDF files

Example Flow:

1. User uploads resume
2. Resume sent to backend
3. Backend processes resume
4. AI generates interview plan

---

# 📄 PDF Generation

Interview reports can be downloaded as PDFs using:

```
html2pdf.js
```

### Process

1. Interview report is rendered in HTML
2. html2pdf converts HTML → PDF
3. Browser downloads the PDF

Example usage:

```javascript
import html2pdf from "html2pdf.js";

html2pdf().from(element).save("interview-report.pdf");
```

---

# 🔗 API Client

All API requests are handled using a centralized API client.

Location:

```
src/lib/apiClient.ts
```

Responsibilities:

* Configure base URL
* Enable credentials for cookies
* Handle errors globally

Example:

```javascript
axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API_URL,
  withCredentials: true
});
```

---

# 🔄 State Management

State is managed using:

* React Hooks
* Custom hooks
* Local component state

Examples:

```
useInterview()
```

Responsibilities:

### useInterview

Handles:

* Fetch interviews
* Generate interview plans
* Manage loading states

---

# 🔐 Protected Routes

Protected routes ensure that **only authenticated users** can access certain pages.

Example protected routes:

* Interview

Implementation:

```
<ProtectedRoute>
   <Interview />
</ProtectedRoute>
```

The component checks authentication before rendering.

---

# 🎨 UI Styling

The frontend UI is styled using **TailwindCSS**.

Benefits:

* Utility-first styling
* Fast development
* Consistent design system
* Responsive layouts

Example:

```css
bg-gray-900 text-white p-4 rounded-lg
```

---

# ⚡ Vite Configuration

The project uses **Vite** for fast development.

Benefits:

* Lightning-fast HMR
* Optimized builds
* Modern tooling

Run development server:

```
npm run dev
```

Build production app:

```
npm run build
```

---

# 🌍 Environment Variables (Frontend)

Create `.env` inside **client** folder.

```
VITE_BACKEND_API_URL=https://api-interview-ai.onrender.com
```

Used for configuring API requests.

---

# 🚀 Frontend Deployment

The frontend is deployed using **Vercel**.

Steps:

1. Push repository to GitHub
2. Import project into Vercel
3. Set environment variables
4. Deploy

Vercel automatically:

* Builds Vite project
* Deploys optimized assets
* Provides CDN distribution

---

# 📈 Performance Optimizations

The frontend includes several optimizations:

### Lazy Loading

Pages are loaded dynamically to reduce bundle size.

### Modular Architecture

Code splitting by modules improves maintainability.

### Client-side PDF generation

Avoids heavy backend processing.

---

# 🧪 Possible Improvements

Future frontend improvements may include:

* AI chat-based interview preparation
* Mock interview simulation
* Real-time interview feedback
* Resume improvement suggestions
* Interview performance analytics
* Dark/light theme support

---

# 🧑‍💻 Development Guidelines

Recommended practices for contributors:

* Follow modular architecture
* Keep components small and reusable
* Use custom hooks for logic
* Avoid large components
* Write meaningful commit messages