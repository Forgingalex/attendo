# Attendo

<div align="center">

**A simple and modern way to track presence.**

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)

[Features](#features) • [Quick Start](#quick-start) • [API Documentation](#api-endpoints) • [Contributing](./CONTRIBUTING.md)

</div>

---

Attendo is a clean, modern, SaaS-style web application that replaces manual attendance or visitor logbooks. It enables fast digital sign ins and sign outs with automatic timestamps, giving institutions a reliable and real-time way to track presence.

## Features

- ✅ Digital sign in/out with automatic timestamps
- ✅ Real-time active visitors list
- ✅ Recent sign outs history
- ✅ Modern, minimal UI with Attendo branding
- ✅ Responsive design
- ✅ Production-ready Docker setup

## Tech Stack

### Frontend
- React 18 + TypeScript
- Vite
- TailwindCSS
- React Router

### Backend
- Node.js + Express + TypeScript
- PostgreSQL with Prisma ORM
- Docker support

## Quick Start

### Prerequisites

- Docker and Docker Compose installed
- Node.js 20+ (for local development)

### Using Docker (Recommended)

1. **Clone and navigate to the project:**
   ```bash
   cd attendo
   ```

2. **Copy environment file:**
   ```bash
   cp .env.example .env
   ```

3. **Start all services:**
   ```bash
   docker-compose up -d
   ```

4. **Run database migrations:**
   ```bash
   docker-compose exec server npx prisma migrate deploy
   ```

5. **Access the application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001
   - Database: localhost:5432

### Local Development

#### Backend Setup

1. **Navigate to server directory:**
   ```bash
   cd server
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp ../.env.example .env
   ```

4. **Start PostgreSQL (using Docker):**
   ```bash
   docker-compose up postgres -d
   ```

5. **Run Prisma migrations:**
   ```bash
   npx prisma migrate dev
   ```

6. **Generate Prisma Client:**
   ```bash
   npx prisma generate
   ```

7. **Start development server:**
   ```bash
   npm run dev
   ```

#### Frontend Setup

1. **Navigate to client directory:**
   ```bash
   cd client
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Access the app:**
   - Frontend: http://localhost:3000

## API Endpoints

### POST `/api/visits/signin`
Sign in a visitor.

**Request Body:**
```json
{
  "name": "John Doe"
}
```

**Response:**
```json
{
  "message": "Successfully signed in",
  "visit": {
    "id": 1,
    "name": "John Doe",
    "time_in": "2024-01-01T10:00:00.000Z",
    "status": "in"
  }
}
```

### POST `/api/visits/signout`
Sign out a visitor.

**Request Body:**
```json
{
  "name": "John Doe"
}
```

**Response:**
```json
{
  "message": "Successfully signed out",
  "visit": {
    "id": 1,
    "name": "John Doe",
    "time_in": "2024-01-01T10:00:00.000Z",
    "time_out": "2024-01-01T12:00:00.000Z",
    "status": "out"
  }
}
```

### GET `/api/visits/active`
Get all currently active visitors.

**Response:**
```json
{
  "count": 2,
  "visits": [
    {
      "id": 1,
      "name": "John Doe",
      "time_in": "2024-01-01T10:00:00.000Z",
      "status": "in"
    }
  ]
}
```

### GET `/api/visits/recent`
Get recent sign outs.

**Query Parameters:**
- `limit` (optional): Number of results (default: 20, max: 100)

**Response:**
```json
{
  "count": 1,
  "visits": [
    {
      "id": 1,
      "name": "John Doe",
      "time_in": "2024-01-01T10:00:00.000Z",
      "time_out": "2024-01-01T12:00:00.000Z",
      "status": "out"
    }
  ]
}
```

## Brand Colors

- **Primary:** Indigo 600 (#4F46E5)
- **Secondary:** Indigo Tint (#EEF2FF)
- **Text:** Slate 800 (#1E293B)
- **Neutral:** Soft Neutral (#F8FAFC)
- **Success:** Green 500 (#22C55E)
- **Error:** Red 500 (#EF4444)

## Project Structure

```
attendo/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   └── App.tsx         # Main app component
│   ├── public/             # Static assets
│   ├── Dockerfile
│   └── package.json
├── server/                 # Express backend
│   ├── src/
│   │   ├── config/         # Database config
│   │   ├── middleware/     # Express middleware
│   │   ├── routes/         # API routes
│   │   ├── utils/          # Utilities
│   │   └── index.ts        # Entry point
│   ├── prisma/
│   │   └── schema.prisma   # Database schema
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml      # Docker orchestration
├── .env.example           # Environment variables template
└── README.md              # This file
```

## Database Schema

### Visits Table

| Column   | Type      | Details                    |
|----------|-----------|----------------------------|
| id       | serial    | Primary key                |
| name     | text      | Visitor name               |
| time_in  | timestamp | Server timestamp           |
| time_out | timestamp | Nullable                   |
| status   | text      | "in" or "out"              |

**Indexes:**
- `name`
- `status`

## Development Scripts

### Backend
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run prisma:generate` - Generate Prisma Client
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:studio` - Open Prisma Studio

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Docker Commands

```bash
# Start all services
docker-compose up -d

# Stop all services
docker-compose down

# View logs
docker-compose logs -f

# Rebuild containers
docker-compose up -d --build

# Access database
docker-compose exec postgres psql -U attendo -d attendo
```

## License

ISC

## Contributing

Contributions are welcome! Please read our [Contributing Guide](./CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

ISC

## Acknowledgments

- Built with modern web technologies
- Designed for simplicity and ease of use
- Open source and community-driven

---

<div align="center">

Made with ❤️ from Kodeblock

[Report Bug](https://github.com/Forgingalex/attendo/issues) • [Request Feature](https://github.com/Forgingalex/attendo/issues) • [View Documentation](./CONTRIBUTING.md)

</div>


