# Arcadia - Full Stack zoo Management System

A comprehensive zoo management system featuring a web application for zoo management and for customers. The project aims to improve customer experience and optimize internal operations through modern technology solutions.

## Table of contents

- Project Structure
- Technical Requirements
- Getting Started
- Utilisation

## Project Structure

```
/arcadia
│
├── /back                  # Backend (Nest)
│   ├── /src               # Source code
│   ├── .env.sample        # Environment variables template
|   ├── docker-compose.yml # Docker Compose
│
├── /front                 # Frontend (Angular)
│   ├── /src               # Source code
│   ├── /public            # Static files
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

Menu avec lien vers la page d'accueil, services, habitats, contact et connexion.
Page d'accueil avec présention du zoo, habitats, services, avis et informations. Lien vers la page habitats et services.
Page habitats
Page services
Page contact

### Page connexion

Connexion pour les administrateurs, employés et vétérinaires.

### Espace admin

Création, modification, suppression utilisateurs.
Création, modification, suppression habitats.
Création races animaux.
Création, modification, suppression utilisateurs.
Création, modification, suppression utilisateurs.
Modification horaires zoo.
Validation/Suppression avis.

### Espace employé

### Espace vétérinaire

## Construit avec

### Langages et frameworks

- Html
- Css
- TypeScript
- Angular
- Nest

### Outils

- Docker
- PostgreSQL
