# Arcadia - Full Stack zoo Management System

A comprehensive zoo management system featuring a web application for zoo management, for customers, and a robust DevOps infrastructure. The project aims to improve customer experience and optimize internal operations through modern technology solutions.

## Table of contents

- Project Structure
- Technical Requirements
- Getting Started
- Utilisation 

## Project Structure

```
/arcadia
├── /devops                 # DevOps configuration files
│   ├── /gitlab            # GitLab CI/CD configuration
│   └── /docker            # Docker configuration files
│
├── /backend               # Backend (NestJS)
│   ├── /src               # Code source
│   ├── /tests             # Tests unitaires
│   ├── /docs              # Documentation API
│
├── /frontend              # Frontend (Angular)
│   ├── /src               # Code source
│   ├── /tests             # Tests unitaires et E2E
│   ├── /public            # Fichiers statiques
│
└── /doc                   # Documentation du projet
```

## Technical Requirements

### DevOps
- GitLab Runner
- Docker
- Linux-based VM for runners
- Minimum 20% test coverage

### Backend
- Node.js (v14 or higher)
- PostgreSQL/MongoDB
- JWT for authentication
- REST API standards

### Frontend
- Modern JavaScript framework (Angular)
- State management solution
- Responsive design support

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- Docker and Docker Compose
- GitLab Runner

### Installation

1. **Clone the Repository**
```bash
git clone [repository-url]
cd [project-name]
```

2. **Set Up Environment Variables**
```bash
# Create necessary .env files
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

3. **Start Development Environment**
```bash
# Start backend
cd backend
npm install
npm run dev

# Start frontend
cd frontend
npm install
npm run dev
```

## Utilisation

### Public 

Menu avec lien vers la page d'accueil, services, habitats, contact et connexion.
Page d'accueil avec Présention du zoo, habitats, services, avis et informations. Lien vers la page habitats et services.
Page habitats 
Page services
Page contact

### Page connexion 

Connexion pour les administrateurs, employés et vétérinaires.

### Espace admin 

Création, modifition, suppression utilisateurs.
Création, modifition, suppression habitats.
Création races animaux.
Création, modifition, suppression utilisateurs.
Création, modifition, suppression utilisateurs.
Modifition horaires zoo.
Validation/Suppression avis. 

### Espace employé

### Espace vétérinaire


## Construit avec 

### Langages et frameworks

- Html : 
- Css : 
- Javascript : 
- Angular : 
- TypeScritp : 
  
### Outils 


