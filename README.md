# Arcadia - Full Stack zoo Management System

A comprehensive zoo management system featuring a web application for zoo management and for customers. The project aims to improve customer experience and optimize internal operations through modern technology solutions.

## Table of contents

- Project Structure
- Technical Requirements
- Getting Started
- Utilisation
- Langages et frameworks
- Tools

## Project Structure

```
/arcadia
│
├── /back                  # Backend (Nest)
│   ├── /src               # Source code
│   ├── .env.sample        # Environment variables template
|   └── docker-compose.yml # Docker Compose
│
├── /front                 # Frontend (Angular)
│   ├── /src               # Source code
│   └── /public            # Static files
│
└── /README.md             # Project documentation
```

## Technical Requirements

### Backend

- Node.js (v22 or higher)
- Docker and Docker Compose
- Nest (v11 or higher)

### Frontend

- Angular (v19 or higher)

## Getting Started

### Prerequisites

- Node.js (v22 or higher)
- Docker and Docker Compose

### Installation

1. **Clone the Repository**

```bash
git clone [repository-url]
cd [project-name]
```

2. **Set Up Environment Variables**

```bash
# Create necessary .env files
cp back/.env.sample back/.env
```

3. **Start Development Environment**

```bash
# Start database
cd back
docker-compose up -d

# Start backend
npm install
npm run start

# Start frontend
cd front
npm install
npm run start
```

## Utilisation

### Public

Menu with links to the homepage, services, habitats, contact, and login/logout.
Homepage with an introduction to the zoo, habitats, services, reviews, and opening hours. Link to the habitats and services pages.
Habitats page
Services page
Contact page

### Login page

Login for administrators, employees, and veterinarians.

### Admin Area

Creation, modification, and deletion of users.
Creation, modification, and deletion of habitats.
Creation of animal breeds.
Creation, modification, and deletion of animals.
Modification of zoo opening hours.
Approval/deletion of reviews.

### Employee Area

Validating/deleting rating.
Animal food management.

### Vet Area

Creation of the vet report.

## Langages et frameworks

- Html
- CSS
- TypeScript
- Angular
- Nest

## Tools

- Docker
- PostgreSQL
