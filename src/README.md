# Real-Time Chat Application with Directus

## Prerequisites

Make sure you have Docker and Docker Compose installed on your machine.

- Docker: [Install Docker](https://docs.docker.com/get-docker/)
- Docker Compose: [Install Docker Compose](https://docs.docker.com/compose/install/)

## Setup
Clone repository to your local machine:
```
git clone git@github.com:roc41d/real-time-chat-backend-with-express-and-directus.git
```
Navigate to the project directory:
```
cd real-time-chat-backend-with-express-and-directus
```
Create a `.env` file in the root of the project and copy content from `.env.example` file:
```
cp .env.example .env
```
Build and Run the project:
```
docker-compose up --build
```
Access Directus Admin Panel:
- Once the containers are up and running, you can access the Directus admin panel by opening a web browser and navigating to `http://localhost:8055`.
- Use the provided `ADMIN_EMAIL` and `ADMIN_PASSWORD` to log in.

Access Node.js Application:
- The Node.js application should be accessible at `http://localhost:3000`.
- The Swagger documentation for the API should be accessible at `http://localhost:3000/api/v1/docs`.

Stopping the application:
- To stop the containers, press `Ctrl + C` in the terminal where the containers are running.
