# Backend Master Boilerplate

A professional, scalable, and robust backend boilerplate built with **Node.js**, **Express**, and **TypeScript**.

## 🚀 Features

- **TypeScript**: Static typing for better developer experience and fewer bugs.
- **Security**: Pre-configured with `helmet` and `cors`.
- **Logging**: Structured logging using `winston` and request logging with `morgan`.
- **Error Handling**: Global error handling middleware with standardized responses.
- **Environment Variables**: Managed via `dotenv`.
- **Code Quality**: Pre-configured with scripts for linting and formatting.

## 🛠️ Tech Stack

- **Framework**: Express.js
- **Language**: TypeScript
- **Validation**: Zod (recommended)
- **Logger**: Winston
- **Process Manager**: Nodemon (for development)

## 📦 Getting Started

### 1. Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### 2. Installation
```bash
npm install
```

### 3. Environment Setup
Create a `.env` file in the root directory (refer to `.env.example` if provided):
```env
PORT=5000
NODE_ENV=development
```

### 4. Running the Project
- **Development**: `npm run dev`
- **Build**: `npm run build`
- **Production**: `npm start`

## 📂 Project Structure

```text
src/
├── config/         # Configuration files (logger, database, etc.)
├── controllers/    # Business logic for routes
├── middlewares/    # Express middlewares (auth, error handler, etc.)
├── models/         # Database models/schemas
├── routes/         # API route definitions
├── utils/          # Utility functions
├── app.ts          # Express app instance
└── server.ts       # Entry point
```

## 🛡️ API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/health` | Check server status |

## 📄 License
MIT
