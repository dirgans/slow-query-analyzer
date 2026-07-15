# NestJS Slow Query Analyzer

A simple demo project that automatically detects **Slow Queries** in a NestJS application using **TypeORM**, **EventEmitter**, and **PostgreSQL**.

The project records slow queries, stores them in the database, and generates a weekly report for performance analysis.

---

## Features

- ✅ Custom TypeORM Logger
- ✅ Event Emitter
- ✅ PostgreSQL
- ✅ Weekly Report
- ✅ REST API
- ✅ Swagger
- ✅ Scheduler
- ✅ Docker Compose
- ✅ Fake Slow Query Endpoint

---

## Project Structure

```
src
├── analyzer
├── common
├── database
├── users
├── app.module.ts
└── main.ts
```

---

## Getting Started

### Clone Repository

```bash
git clone https://github.com/yourusername/slow-query-analyzer.git
```

### Install Dependencies

```bash
npm install
```

### Start PostgreSQL

```bash
docker compose up -d
```

### Run Application

```bash
npm run start:dev
```

---

## Swagger

```
http://localhost:3000/api
```

---

## API

### Normal Query

```
GET /users
```

### Generate Slow Query

```
GET /users/slow
```

### Weekly Report

```
GET /analyzer/report
```

### Dashboard

```
GET /analyzer/dashboard
```

---

## Tech Stack

- NestJS
- TypeORM
- PostgreSQL
- EventEmitter2
- Nest Schedule
- Swagger

---

## License

MIT
