# WILD TRAVELS

Wild travels is a web application for discovering and saving recreational locations. Users can browse places, view detailed information, leave reviews, and manage their personal profiles.

---

## About the Project

Wild travels is a team project developed as part of a collaborative learning process. The application helps users find interesting places for leisure and recreation while providing a convenient way to store and explore location information.

The project consists of a frontend application built with Next.js and a backend API built with Express.js and MongoDB.

## Features

- User registration and authentication
- User profile management
- Browse available locations
- Search and filter locations
- View detailed information about locations
- Create and view reviews
- Upload images
- Responsive design for desktop and mobile devices

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- TanStack Query
- Axios
- Zustand
- Formik
- Yup
- Swiper
- CSS Modules

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- Celebrate / Joi Validation
- Cookie Parser
- Multer
- Cloudinary
- Helmet
- CORS

# Live Demo

### Frontend

https://wild-travels.vercel.app/

### Backend API

https://wild-travels-backend.onrender.com/

# Installation and Setup

## Clone the Repositories

### Frontend

```bash
git clone https://github.com/SCBProd/wild-travels.git
cd wild-travels
```

### Backend

```bash
git clone https://github.com/SCBProd/wild-travels-Backend.git
cd wild-travels-Backend
```

# Frontend Setup

### Install dependencies

```bash
npm install
```

### Create a `.env.local` file

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### Run the development server

```bash
npm run dev
```

The frontend will be available at:

```text
http://localhost:3001
```

---

# Backend Setup

### Install dependencies

```bash
npm install
```

### Create a `.env` file

```env
PORT=3000
NODE_ENV=development

MONGO_URL=your_mongodb_connection_string

SMTP_HOST=smtp-relay.brevo.com
SMTP_PORT=587
SMTP_USER=your_brevo_username
SMTP_PASSWORD=your_brevo_password
SMTP_FROM=your_email@example.com

JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Run in development mode

```bash
npm run dev
```

### Run in production mode

```bash
npm start
```

---

# Project Structure

## Frontend

```text
app/              # App Router pages
components/       # Reusable UI and feature components
├── ui/           # Shared UI components
├── layout/       # Layout components
└── providers/    # React providers

lib/
├── api/          # API requests
└── store/        # Zustand store

schemas/          # Validation schemas
types/            # TypeScript types
public/           # Static assets
```

## Backend

```text
src/
├── controllers/   # Request handlers
├── services/      # Business logic
├── routes/        # API routes
├── models/        # Database models
├── middleware/    # Express middleware
├── validations/   # Request validation
├── db/            # Database connection
├── utils/         # Helper functions
├── constants/     # Shared constants
├── docs/          # Swagger/OpenAPI documentation
└── server.js      # Application entry point
```

# Implementation Details

- Client-side state management with Zustand
- Server-state management and caching with TanStack Query
- Form handling and validation with Formik and Yup
- Image uploading through Cloudinary
- MongoDB database integration using Mongoose
- REST API communication between frontend and backend
- Secure authentication using HTTP-only cookies

# Team

| Name                     | Role             | GitHub                                                                 |
| ------------------------ | ---------------- | ---------------------------------------------------------------------- |
| Yevhen Kondrashov        | **Team Leader+dev**  | [@SCBProd](https://github.com/SCBProd)                                 |
| Yevhenii Prygaro         | **Scrum Master+dev** | [@EugenePrygaro](https://github.com/EugenePrygaro)                     |
| Vladyslav Harkusha       | **Developer**    | [@RavemanThc](https://github.com/RavemanThc)                           |
| Dmytro Muliar            | **Developer**    | [@Dimonik7772](https://github.com/Dimonik7772)                         |
| Ihor Kuzmenko            | **Developer**    | [@IhorKuzmenko](https://github.com/IhorKuzmenko)                       |
| Anastasiia Paslavska     | **Developer**    | [@Nastyyyyya](https://github.com/Nastyyyyya)                           |
| Evgeny Polyakov          | **Developer**    | [@Yevhen-Polyakov](https://github.com/Yevhen-Polyakov)                 |
| Vladislav Gradoblyanskyi | **Developer**    | [@vladislavgradoblyanskyi](https://github.com/vladislavgradoblyanskyi) |
| Den Yaseniuk             | **Developer**    | [@luxqxqm](https://github.com/luxqxqm)                                 |
| Galyna Kud               | **Developer**    | [@Galyna-kud](https://github.com/Galyna-kud)                           |
| Dariia                   | **Developer**    | [@ccnvxii](https://github.com/ccnvxii)                                 |

# Contributors

The project was developed collaboratively using **GitHub Flow**, **pull requests**, **code reviews**, and **team planning**. Team members contributed to:

- Frontend development
- Backend development
- API integration
- State management
- Form validation
- UI implementation
- Testing

---

# License

This project was created for educational purposes.
