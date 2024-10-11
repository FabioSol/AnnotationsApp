# Image Annotation App

This project provides a simple and efficient tool for annotating images, designed to facilitate the creation of datasets for computer vision tasks. The application is containerized using Docker and can be easily set up with `docker-compose`.

## Project Structure

- **MongoDB**: Used as the database to store image annotations.
- **Backend**: A Flask application with GridFS for handling file storage, running on Uvicorn.
- **Frontend**: A Next.js application built with TypeScript and styled using TailwindCSS.

## Prerequisites

- [Docker](https://www.docker.com/get-started) installed on your system.
- [Docker Compose](https://docs.docker.com/compose/) installed.

## Getting Started

To run the application locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/FabioSol/AnnotationsApp.git
   cd AnnotationsApp
   ```


2. Build and start the application using Docker Compose:
   ```bash
   docker-compose up --build
   ```

3. Access the application by visiting  [http://localhost:3000](http://localhost:3000).


## Docker Compose Services

This project uses Docker Compose to manage three services: MongoDB, Backend (Flask with Uvicorn), and Frontend (Next.js). Below is a detailed description of each service:

### MongoDB

- **Image**: `mongo:8.0.0-rc20`
  - This is the MongoDB database used to store image annotations.
  
- **Environment Variables**:
  - `MONGODB_INITDB_ROOT_USERNAME`: Root username for MongoDB.
  - `MONGODB_INITDB_ROOT_PASSWORD`: Root password for MongoDB.
  
- **Volumes**:
  - `./database/data_volumes:/data/db`: Persists the MongoDB data in a local volume to retain it between container restarts.
  - `./database/init-mongo.js:/docker-entrypoint-initdb.d/init-mongo.js`: Initializes MongoDB with a script on startup.
  
- **Network**:
  - `internal_network`: A Docker network that allows MongoDB to communicate with other services internally.

- **Exposed Port**:
  - `27017`: This is the default MongoDB port exposed within the Docker network.

### Backend (Flask with Uvicorn)

- **Build Context**: `./backend`
  - This service builds the Flask backend from the source code located in the `./backend` directory.
  
- **Environment Variables**:
  - `MONGO_URI`: The URI for connecting to the MongoDB service. Example: `mongodb://backend:password@mongodb:27017/data`.
  
- **Depends on**: 
  - **MongoDB**: Ensures MongoDB is running before starting the backend service.
  
- **Network**:
  - `internal_network`: Connects the backend to the same internal network as MongoDB for secure communication.

- **Exposed Port**:
  - `5000`: The backend service listens on this port and is available to other services inside the Docker network.

### Frontend (Next.js)

- **Build Context**: `./frontend`
  - This service builds the frontend from the source code located in the `./frontend` directory.
  
- **Environment Variables**:
  - `NEXT_PUBLIC_BACKEND_URL`: The URL to connect to the backend API. It is passed as a build argument during the image build process.

- **Depends on**: 
  - **Backend**: Ensures the backend is running before starting the frontend service.
  
- **Ports**:
  - `3000:3000`: The frontend is exposed on port 3000 to allow access via [http://localhost:3000](http://localhost:3000).
  
- **Network**:
  - `internal_network`: Connects the frontend to the same internal network as the backend.

## Networks

- **internal_network**: 
  - A Docker bridge network used for internal communication between MongoDB, Backend, and Frontend services. This ensures that they can interact with each other securely without being exposed to the public network.

