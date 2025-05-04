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

## Getting Started

### Using Docker (Recommended)

1. Clone the repository:
```bash
git clone https://github.com/MustafaKhatab/apartment-listing.git
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

## API Documentation

The backend API documentation is available at:
- Swagger UI: http://localhost:3001/api/docs

### Main Endpoints

#### Apartments
- `GET /apartments` - Get all apartments (with pagination)
- `GET /apartments/:id` - Get apartment by ID
- `POST /apartments` - Create new apartment

## Docker Configuration

The project uses Docker Compose to manage three services:
- Frontend (Next.js)
- Backend (NestJS)
- MongoDB

## Database Seeding

The project includes a seed script to populate the database with sample apartment data. That runs automatically

This will populate the database with sample apartment listings for testing and development purposes.
