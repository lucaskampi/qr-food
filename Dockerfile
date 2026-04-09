# ============================================
# Base Stage - Dependencies
# ============================================
FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm ci --workspaces --include-workspace-root

# ============================================
# Builder Stage - Compile TypeScript
# ============================================
FROM base AS builder
WORKDIR /app
COPY . .
RUN npm run build

# ============================================
# Menu Service Stage
# ============================================
FROM node:20-alpine AS menu-service
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json .
ENV NODE_ENV=development
ENV PORT=3001
EXPOSE 3001
CMD ["node", "dist/apps/menu-service/main"]

# ============================================
# Order Service Stage
# ============================================
FROM node:20-alpine AS order-service
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json .
ENV NODE_ENV=development
ENV PORT=3002
EXPOSE 3002
CMD ["node", "dist/apps/order-service/main"]

# ============================================
# Kitchen Service Stage
# ============================================
FROM node:20-alpine AS kitchen-service
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json .
ENV NODE_ENV=development
ENV PORT=3003
EXPOSE 3003
CMD ["node", "dist/apps/kitchen-service/main"]

# ============================================
# ERP Service Stage
# ============================================
FROM node:20-alpine AS erp-service
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json .
ENV NODE_ENV=development
ENV PORT=3004
EXPOSE 3004
CMD ["node", "dist/apps/erp-service/main"]

# ============================================
# Development Stage
# ============================================
FROM base AS development
WORKDIR /app
COPY . .
CMD ["npm", "run", "start:dev"]
