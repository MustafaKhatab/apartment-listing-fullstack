# Apartment Listing Platform

A modern web application for managing and browsing apartment listings. Built with Next.js, NestJS, MongoDB, and Docker.

## Features

- 🏠 Browse apartment listings with pagination
- 🔍 Search functionality (by unit name, number, and project)
- 📱 Responsive design for all devices
- 🎨 Modern UI with Tailwind CSS
- 🐳 Dockerized development and production environment
- 📝 Swagger API documentation

## Tech Stack

### Frontend
- Next.js 15
- React 19
- TypeScript
- Tailwind CSS 4
- Axios for API calls
- React Hook Form

### Backend
- NestJS
- MongoDB with Mongoose
- TypeScript
- Swagger for API documentation

### Infrastructure
- Docker
- Docker Compose
- MongoDB (containerized)

## Prerequisites

- Docker and Docker Compose
- Node.js (v18 or higher) - for local development
- npm or yarn

## Getting Started

### Using Docker (Recommended)

1. Clone the repository:
```bash
git clone https://github.com/yourusername/apartment-listing.git
cd apartment-listing
```

2. Start the application using Docker Compose:
```bash
docker-compose up
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:3001
- MongoDB: mongodb://localhost:27017

### Local Development

1. Install dependencies:
```bash
# Install frontend dependencies
cd apartment-listing-frontend
npm install

# Install backend dependencies
cd ../apartment-listing-backend
npm install
```

2. Start the development servers:
```bash
# Start backend server
cd apartment-listing-backend
npm run start:dev

# Start frontend server
cd apartment-listing-frontend
npm run dev
```

## API Documentation

The backend API documentation is available at:
- Swagger UI: http://localhost:3001/api/docs

### Main Endpoints

#### Apartments
- `GET /apartments` - Get all apartments (with pagination)
- `GET /apartments/:id` - Get apartment by ID
- `POST /apartments` - Create new apartment
- `PUT /apartments/:id` - Update apartment
- `DELETE /apartments/:id` - Delete apartment

#### Search
- `GET /apartments/search` - Search apartments with filters

## Project Structure

```
apartment-listing/
├── apartment-listing-frontend/
│   ├── src/
│   │   ├── app/              # Next.js app directory
│   │   │   ├── components/       # React components
│   │   │   ├── lib/             # Utility functions and API calls
│   │   │   └── styles/          # CSS modules
│   │   ├── public/              # Static assets
│   │   └── package.json
│   ├── apartment-listing-backend/
│   │   ├── src/
│   │   │   ├── apartments/      # Apartment module
│   │   │   ├── common/          # Shared utilities
│   │   │   └── main.ts         # Application entry point
│   │   └── package.json
│   └── docker-compose.yml       # Docker configuration
```

## Docker Configuration

The project uses Docker Compose to manage three services:
- Frontend (Next.js)
- Backend (NestJS)
- MongoDB

Key features of the Docker setup:
- Hot reloading for both frontend and backend
- Persistent MongoDB data volume
- Environment variable configuration
- Development mode optimization

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 