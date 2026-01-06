# Medusa v2 Backend Setup

## ✅ Installatie Compleet

Medusa v2 backend is succesvol geïnstalleerd en geconfigureerd met PostgreSQL.

## 📁 Project Structuur

```
ecommerce-cms/
├── medusa-backend/          # Medusa v2 backend
│   ├── src/
│   │   ├── admin/          # Admin dashboard customizations
│   │   ├── api/            # Custom API routes
│   │   ├── jobs/           # Scheduled jobs
│   │   ├── links/          # Module links
│   │   ├── modules/        # Custom modules
│   │   ├── scripts/        # CLI scripts
│   │   ├── subscribers/    # Event listeners
│   │   └── workflows/      # Custom workflows
│   ├── .env                # Environment variables
│   └── medusa-config.ts    # Medusa configuration
└── (Next.js frontend files)
```

## 🚀 Servers

### Medusa Backend
- **URL**: http://localhost:9000
- **Admin Dashboard**: http://localhost:9000/app
- **API**: http://localhost:9000/store (storefront) & http://localhost:9000/admin (admin)

### Next.js Frontend
- **URL**: http://localhost:3000 (wanneer gestart)

## 🔧 Commands

### Medusa Backend
```bash
cd medusa-backend

# Development server
npm run dev

# Build voor productie
npm run build

# Start productie server
npm run start

# Seed database met test data
npm run seed

# Create admin user
npx medusa user -e admin@example.com -p password123
```

## 🔐 Database

- **Type**: PostgreSQL
- **Database**: medusa-medusa-backend
- **Connection**: postgres://postgres:postgres@localhost/medusa-medusa-backend

## 🌐 CORS Configuratie

De CORS is geconfigureerd voor:
- Next.js frontend: `http://localhost:3000`
- Medusa Admin: `http://localhost:9000`
- Storefront: `http://localhost:8000`

## 📦 Next.js Integratie

### Installeer Medusa JS SDK in je Next.js project:

```bash
npm install @medusajs/js-sdk
```

### Configuratie voorbeeld (`lib/medusa-client.ts`):

```typescript
import Medusa from "@medusajs/js-sdk"

export const medusaClient = new Medusa({
  baseUrl: process.env.NEXT_PUBLIC_MEDUSA_URL || "http://localhost:9000",
  auth: {
    type: "session",
  },
})
```

### Environment Variables voor Next.js (`.env.local`):

```env
NEXT_PUBLIC_MEDUSA_URL=http://localhost:9000
```

## 📚 Belangrijke Endpoints

### Store API (voor klanten)
- `GET /store/products` - Lijst van producten
- `GET /store/products/:id` - Product details
- `POST /store/carts` - Create cart
- `POST /store/customers` - Register customer
- `POST /store/auth` - Customer login

### Admin API (voor beheer)
- `GET /admin/products` - Manage products
- `POST /admin/products` - Create product
- `GET /admin/orders` - Manage orders
- `GET /admin/customers` - Manage customers

## 🎨 Admin Dashboard

1. Open http://localhost:9000/app
2. Maak een admin user aan (eerste keer automatisch)
3. Log in met je credentials
4. Begin met producten, categorieën en collecties toevoegen

## 📖 Documentatie

- **Medusa Docs**: https://docs.medusajs.com
- **API Reference**: https://docs.medusajs.com/api
- **JS SDK**: https://docs.medusajs.com/resources/js-sdk

## 🔄 Volgende Stappen

1. ✅ Medusa backend geïnstalleerd
2. ✅ PostgreSQL database geconfigureerd
3. ✅ CORS ingesteld voor Next.js
4. 🔲 Installeer Medusa JS SDK in Next.js
5. 🔲 Maak admin user aan
6. 🔲 Voeg producten toe via admin dashboard
7. 🔲 Bouw storefront in Next.js met Medusa API

## 🛠️ Troubleshooting

### Server start niet
```bash
# Check of PostgreSQL draait
# Check DATABASE_URL in .env
# Verwijder node_modules en installeer opnieuw
rm -rf node_modules
npm install
```

### CORS errors
- Controleer `.env` CORS settings
- Restart Medusa server na .env wijzigingen

### Database errors
- Zorg dat PostgreSQL draait
- Check database credentials in `.env`
