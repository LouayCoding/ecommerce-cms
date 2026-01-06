# 🚀 E-Commerce Setup Guide - Klaar om te gebruiken!

## ✅ Wat is geïmplementeerd

### 1. **Winkelwagen Functionaliteit**
- ✅ Add to cart button op product pagina's
- ✅ Winkelwagen pagina met overzicht
- ✅ Aantal aanpassen (+ / -)
- ✅ Producten verwijderen
- ✅ Real-time cart counter in navigatie
- ✅ LocalStorage voor cart persistentie

### 2. **Checkout Flow**
- ✅ Checkout formulier met verzendgegevens
- ✅ Email, naam, adres, postcode, telefoon
- ✅ Bestelling overzicht met prijzen
- ✅ BTW en verzendkosten berekening
- ✅ Order creation via Medusa API
- ✅ Success pagina na bestelling

### 3. **Collecties/Categorieën**
- ✅ Collecties overzicht pagina
- ✅ Individuele collectie pagina's met producten
- ✅ Gefilterde product weergave per collectie

### 4. **Navigatie**
- ✅ Cart icon in desktop en mobile navigatie
- ✅ Links naar cart pagina
- ✅ Responsive design

## 🎯 Hoe te Gebruiken

### Stap 1: Start Beide Servers

**Terminal 1 - Medusa Backend:**
```bash
cd medusa-backend
npm run dev
```
Backend draait op: http://localhost:9000

**Terminal 2 - Next.js Frontend:**
```bash
npm run dev
```
Frontend draait op: http://localhost:3000

### Stap 2: Maak een Region aan

1. Open http://localhost:9000/app
2. Log in met je admin credentials
3. Ga naar **Settings** → **Regions**
4. Klik **Create Region**
5. Vul in:
   - Name: Nederland
   - Currency: EUR
   - Countries: Netherlands
6. Klik **Save**

### Stap 3: Maak Collecties aan

1. In admin dashboard, ga naar **Products** → **Collections**
2. Klik **Create Collection**
3. Voorbeelden:
   - **Nieuwe Collectie** - Voor nieuwe items
   - **Sale** - Voor sale items
   - **Dames** - Voor dames producten
   - **Heren** - Voor heren producten
4. Klik **Save**

### Stap 4: Voeg Producten Toe

1. Ga naar **Products** → **New Product**
2. Vul in:
   - **Title**: Bijv. "Vintage Sweatshirt"
   - **Handle**: Bijv. "vintage-sweatshirt" (voor URL)
   - **Description**: Product beschrijving
   - **Collection**: Selecteer een collectie
3. Upload **afbeeldingen**
4. Voeg een **variant** toe:
   - Title: Bijv. "Default"
   - SKU: Bijv. "SWEAT-001"
   - Price: Bijv. 4999 (= €49.99 in centen!)
5. Zet **Status** op **Published**
6. Klik **Save**

### Stap 5: Test de Webshop

1. Open http://localhost:3000
2. Ga naar **Products** of **Collections**
3. Klik op een product
4. Klik **Toevoegen aan winkelwagen**
5. Klik op cart icon in navigatie
6. Pas aantal aan of verwijder items
7. Klik **Afrekenen**
8. Vul verzendgegevens in
9. Klik **Bestelling plaatsen**
10. Zie success pagina!

## 📁 Belangrijke Bestanden

### Cart Functionaliteit
- `lib/medusa/cart.ts` - Cart helper functies
- `components/cart/AddToCartButton.tsx` - Add to cart knop
- `components/cart/CartIcon.tsx` - Cart icon met counter
- `app/cart/page.tsx` - Winkelwagen pagina

### Checkout
- `app/checkout/page.tsx` - Checkout formulier
- `app/order-success/page.tsx` - Success pagina

### Collecties
- `app/collections/page.tsx` - Collecties overzicht
- `app/collections/[handle]/page.tsx` - Individuele collectie

### Navigatie
- `components/public/DesktopNav.tsx` - Desktop navigatie
- `components/public/MobileNav.tsx` - Mobile navigatie

## 🎨 Wat Werkt Nu

### ✅ Volledig Functioneel
1. **Producten bekijken** - Homepage, products pagina, product detail
2. **Toevoegen aan cart** - Met real-time feedback
3. **Cart beheren** - Aantal aanpassen, verwijderen
4. **Afrekenen** - Volledig werkende checkout flow
5. **Bestellingen** - Orders worden aangemaakt in Medusa
6. **Collecties** - Producten filteren per collectie

### 🎨 Design Later
- Styling is basis/functioneel
- Focus nu op functionaliteit
- Design kun je later verbeteren

## 🔧 Handige Admin Links

- **Dashboard**: http://localhost:9000/app
- **Products**: http://localhost:9000/app/products
- **Collections**: http://localhost:9000/app/collections
- **Orders**: http://localhost:9000/app/orders
- **Settings**: http://localhost:9000/app/settings

## 💡 Tips

### Prijzen in Medusa
- Prijzen worden opgeslagen in **centen**
- €49.99 = 4999 centen
- €10.00 = 1000 centen

### Collecties vs Categories
- Medusa v2 gebruikt **Collections** (niet categories)
- Collections zijn groepen van producten
- Je kunt meerdere collections maken

### Testing
1. Maak minimaal 1 region aan
2. Maak 2-3 collecties aan
3. Voeg 5-10 test producten toe
4. Test de hele flow: browse → cart → checkout

### Troubleshooting

**Geen producten zichtbaar?**
- Check of producten status = Published
- Check of region bestaat
- Check browser console voor errors

**Cart werkt niet?**
- Check of localStorage enabled is
- Check browser console
- Refresh de pagina

**Checkout faalt?**
- Check of alle velden ingevuld zijn
- Check of region correct is
- Check Medusa backend logs

## 🚀 Volgende Stappen (Optioneel)

1. **Payment Integration**
   - Stripe of Mollie toevoegen
   - Payment flow implementeren

2. **Customer Accounts**
   - Login/register functionaliteit
   - Order history
   - Saved addresses

3. **Search**
   - Product zoekfunctionaliteit
   - Filters (prijs, collectie, etc.)

4. **Design Improvements**
   - Styling verfijnen
   - Animaties toevoegen
   - Responsive verbeteren

5. **Email Notifications**
   - Order confirmatie emails
   - Shipping updates

## 📚 Documentatie

- **Medusa Docs**: https://docs.medusajs.com
- **Store API**: https://docs.medusajs.com/api/store
- **Admin API**: https://docs.medusajs.com/api/admin

---

**Alles is nu werkend! Begin met producten toevoegen en test de hele flow.** 🎉
