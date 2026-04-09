# QR Food Service

A microservices-based QR code restaurant menu & ordering system.

Customer scans a QR code on the table → sees the menu → places order → order is processed by the restaurant's ERP/CRM → kitchen preparation → billing.

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        QR Food Services                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐        │
│  │ Menu Service │  │Order Service │  │Kitchen Svc   │        │
│  │   (3001)     │  │   (3002)     │  │  (3003)      │        │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘        │
│         │                  │                  │                 │
│         └──────────────────┼──────────────────┘                 │
│                            │                                    │
│                   ┌────────▼────────┐                          │
│                   │   PostgreSQL    │                          │
│                   └─────────────────┘                          │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Services

| Service | Port | Description |
|---------|------|-------------|
| menu-service | 3001 | Menu CRUD, restaurant management, categories |
| order-service | 3002 | Order creation, status tracking, QR simulation |
| kitchen-service | 3003 | Kitchen display, preparation status updates |
| erp-service | 3004 | Billing, inventory, reports (Phase 5) |

---

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | NestJS (TypeScript) |
| ORM | Prisma |
| Database | PostgreSQL |
| API Docs | Swagger (@nestjs/swagger) |
| Validation | class-validator, class-transformer |
| Events | NestJS Event Emitter |
| Logging | Winston |
| Health Checks | @nestjs/terminus |

---

## Quick Start

### Prerequisites
- Node.js 20+
- Docker & Docker Compose
- PostgreSQL (via Docker)

### Setup

```bash
# Install dependencies
npm install

# Start PostgreSQL via Docker
docker compose up -d postgres

# Generate Prisma client
npm run prisma:generate

# Run migrations
npm run prisma:migrate
```

### Development

```bash
# Start all services
npm run start:all

# Or start individually
npm run start:menu-service

# Run tests
npm run test

# Lint
npm run lint:fix
```

### Access Points

| Service | URL |
|---------|-----|
| Menu Service | http://localhost:3001/api |
| Order Service | http://localhost:3002/api |
| Kitchen Service | http://localhost:3003/api |
| ERP Service | http://localhost:3004/api |
| Prisma Studio | http://localhost:5555 |

---

## Project Structure

```
qr-food/
├── apps/
│   ├── menu-service/      # Port 3001
│   ├── order-service/     # Port 3002
│   ├── kitchen-service/   # Port 3003
│   └── erp-service/       # Port 3004 (Phase 5)
├── libs/
│   ├── common/           # Shared decorators, guards
│   ├── contracts/        # Shared DTOs, event interfaces
│   ├── database/         # Prisma service, module
│   └── config/           # Configuration module
├── docker-compose.yml
├── package.json
├── nest-cli.json
└── tsconfig.base.json
```

---

## API Documentation

Swagger documentation is available at each service's `/api` endpoint.

Example: http://localhost:3001/api

---

## Development Phases

- [x] Phase 1: MVP Backend (current)
- [ ] Phase 2: Events & Reliability (RabbitMQ)
- [ ] Phase 3: Observability (Prometheus, OpenTelemetry)
- [ ] Phase 4: Frontend (Next.js PWA)
- [ ] Phase 5: ERP Integration

---

## License

MIT
