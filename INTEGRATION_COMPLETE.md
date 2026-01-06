# ✅ Medusa v2 Integratie Compleet

## Wat is er gedaan?

### 1. Medusa v2 Backend Geïnstalleerd
- ✅ Medusa v2.12.3 geïnstalleerd in `medusa-backend/` directory
- ✅ PostgreSQL database geconfigureerd: `medusa-medusa-backend`
- ✅ Backend draait op: **http://localhost:9000**
- ✅ Admin dashboard: **http://localhost:9000/app**

### 2. CORS Geconfigureerd
- ✅ Next.js frontend (localhost:3000) toegevoegd aan CORS whitelist
- ✅ Alle API endpoints toegankelijk vanuit je frontend

### 3. Next.js Frontend Geïntegreerd
- ✅ Medusa JS SDK geïnstalleerd (`@medusajs/js-sdk`)
- ✅ Medusa client geconfigureerd in `lib/medusa-client.ts`
- ✅ Environment variable toegevoegd: `NEXT_PUBLIC_MEDUSA_URL`
- ✅ Product queries vervangen (Supabase → Medusa)
- ✅ ProductCard component aangepast voor Medusa data
- ✅ Product detail pagina aangepast voor Medusa data

## 📂 Aangepaste Bestanden

### Nieuwe Bestanden
- `medusa-backend/` - Volledige Medusa backend installatie
- `lib/medusa-client.ts` - Medusa SDK configuratie
- `lib/medusa/products.ts` - Product helper functies
- `app/api/products/route.ts` - API route voorbeeld

### Aangepaste Bestanden
- `lib/queries/products.ts` - Nu gebruikt Medusa API
- `components/public/ProductCard.tsx` - Werkt met Medusa data structuur
- `app/(public)/products/[slug]/page.tsx` - Product detail met Medusa
- `.env.local` - NEXT_PUBLIC_MEDUSA_URL toegevoegd
- `package.json` - @medusajs/js-sdk dependency

## 🚀 Hoe te Gebruiken

### 1. Start Medusa Backend
```bash
cd medusa-backend
npm run dev
```
Backend draait op: http://localhost:9000

### 2. Maak Admin User Aan
```bash
cd medusa-backend
npx medusa user -e admin@example.com -p password123
```

### 3. Open Admin Dashboard
Ga naar: http://localhost:9000/app
Log in met je admin credentials

### 4. Voeg Producten Toe
1. Ga naar Products in het admin dashboard
2. Klik op "New Product"
3. Vul product details in:
   - Titel
   - Handle (slug voor URL)
   - Beschrijving
   - Upload afbeeldingen
   - Voeg variant toe met prijs
   - Publiceer product

### 5. Start Next.js Frontend
```bash
# In root directory
npm run dev
```
Frontend draait op: http://localhost:3000

## 📊 Data Structuur

### Medusa Product Object
```typescript
{
  id: string
  title: string
  handle: string // slug voor URL
  description: string
  images: [
    {
      id: string
      url: string
    }
  ]
  variants: [
    {
      id: string
      sku: string
      calculated_price: {
        calculated_amount: number // in cents
        currency_code: string
      }
    }
  ]
  collection: {
    id: string
    title: string
  }
}
```

## 🔧 API Endpoints

### Store API (voor klanten)
- `GET /store/products` - Lijst van producten
- `GET /store/products/:id` - Product details
- `POST /store/carts` - Winkelwagen aanmaken
- `POST /store/carts/:id/line-items` - Product toevoegen aan cart

### Admin API (voor beheer)
- `GET /admin/products` - Beheer producten
- `POST /admin/products` - Product aanmaken
- `PUT /admin/products/:id` - Product updaten
- `DELETE /admin/products/:id` - Product verwijderen

## 🎯 Volgende Stappen

1. **Producten Toevoegen**
   - Open admin dashboard
   - Voeg je eerste producten toe met afbeeldingen en prijzen

2. **Collecties Maken**
   - Maak collecties aan (bijv. "Nieuwe Collectie", "Sale")
   - Wijs producten toe aan collecties

3. **Winkelwagen Implementeren**
   - Gebruik `lib/medusa/cart.ts` helpers
   - Voeg "Add to Cart" functionaliteit toe

4. **Checkout Flow**
   - Implementeer checkout proces
   - Integreer payment provider (Stripe, PayPal, etc.)

5. **Klant Authenticatie**
   - Implementeer customer login/register
   - Gebruik Medusa auth endpoints

## 📚 Handige Links

- **Medusa Docs**: https://docs.medusajs.com
- **API Reference**: https://docs.medusajs.com/api
- **JS SDK Docs**: https://docs.medusajs.com/resources/js-sdk
- **Admin Guide**: https://docs.medusajs.com/learn/fundamentals/admin

## 🐛 Troubleshooting

### Frontend toont geen producten
1. Check of Medusa backend draait (http://localhost:9000)
2. Voeg producten toe via admin dashboard
3. Zorg dat producten gepubliceerd zijn
4. Check browser console voor errors

### CORS errors
1. Check `.env` in medusa-backend
2. Restart Medusa server na .env wijzigingen
3. Verify STORE_CORS bevat http://localhost:3000

### Database errors
1. Check of PostgreSQL draait
2. Verify DATABASE_URL in medusa-backend/.env
3. Run migrations: `cd medusa-backend && npm run build`

## 💡 Tips

- Gebruik Medusa admin dashboard om producten te beheren
- Test API endpoints met Postman of Thunder Client
- Check Medusa logs voor debugging
- Gebruik TypeScript types voor betere developer experience
