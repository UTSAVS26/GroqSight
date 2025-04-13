## 🐳 1. **Run the Backend Dockerfile Individually**

From the root of your `GroqSight` project:

```bash
# Build the backend image
docker build -t groqsight-backend ./backend

# Run the backend container
docker run -d -p 5000:5000 --name backend groqsight-backend
```

---

## ⚛️ 2. **Run the Frontend Dockerfile Individually**

From the root of your `GroqSight` project:

```bash
# Build the frontend image
docker build -t groqsight-frontend ./frontend

# Run the frontend container
docker run -d -p 3000:3000 --name frontend groqsight-frontend
```

---

## 🧩 3. **Run Everything Together with Docker Compose**

From the root of the `GroqSight` repo (where `docker-compose.yml` lives):

```bash
docker-compose up --build
```

> This will:
- Build both images.
- Start both services.
- Expose:
  - Backend at [http://localhost:5000](http://localhost:5000)
  - Frontend at [http://localhost:3000](http://localhost:3000)

---

## 🔁 Cleanup / Restart Helpers

```bash
# Stop containers
docker-compose down

# Rebuild with fresh code changes
docker-compose up --build

# Stop and remove individual containers
docker stop backend frontend
docker rm backend frontend
```