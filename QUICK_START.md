# 🚀 Quick Start - Jouw E-Commerce is Klaar!

## ✅ Status Check

### Medusa Backend
- ✅ Draait op: **http://localhost:9000**
- ✅ Admin: **http://localhost:9000/app**

### Next.js Frontend  
- ✅ Draait op: **http://localhost:3000**

### Admin Login
- **Email**: `louay-attahiri@hotmail.com`
- **Password**: `Louay-Ouahb-0411!`

---

## 📝 Wat Nu Te Doen

### 1. Log in op Admin Dashboard
1. Open: **http://localhost:9000/app**
2. Login met je credentials hierboven
3. Je bent nu in de Medusa admin!

### 2. Maak een Region aan (BELANGRIJK!)
```
Settings → Regions → Create Region
- Name: Nederland
- Currency: EUR  
- Countries: Netherlands
- Save
```

### 3. Maak Collecties aan (Optioneel maar handig)
```
Products → Collections → Create Collection

Voorbeelden:
- Nieuwe Collectie
- Sale
- Dames
- Heren
```

### 4. Voeg je Eerste Product Toe
```
Products → New Product

Vul in:
- Title: Bijv. "Vintage Sweatshirt"
- Handle: "vintage-sweatshirt" (voor URL)
- Description: Product beschrijving
- Collection: Selecteer een collectie (optioneel)

Upload afbeeldingen:
- Sleep afbeeldingen naar upload veld
- Of gebruik URL van externe afbeelding

Voeg Variant toe:
- Klik "Add Variant"
- Title: "Default" of "M" (maat)
- SKU: "SWEAT-001"
- Price: 4999 (= €49.99 in centen!)
- Manage inventory: UIT (voor nu)

Status:
- Zet op "Published"

Save!
```

---

## 💰 Prijzen Invoeren

**BELANGRIJK**: Medusa gebruikt centen!

- €10.00 = **1000**
- €49.99 = **4999**
- €99.95 = **9995**

---

## 🛒 Test je Webshop

1. Open **http://localhost:3000**
2. Ga naar **Products** of **Collections**
3. Klik op een product
4. Klik **"Toevoegen aan winkelwagen"**
5. Klik op cart icon (🛒) in navigatie
6. Pas aantal aan met + / -
7. Klik **"Afrekenen"**
8. Vul verzendgegevens in
9. Klik **"Bestelling plaatsen"**
10. Zie success pagina! ✅

---

## 🎨 Wat Werkt Nu

### ✅ Volledig Functioneel
- ✅ Producten bekijken (homepage, products, detail)
- ✅ Toevoegen aan winkelwagen
- ✅ Winkelwagen beheren (aantal, verwijderen)
- ✅ Checkout met verzendgegevens
- ✅ Bestellingen aanmaken
- ✅ Collecties/categorieën
- ✅ Real-time cart counter

### 🎨 Design
- Basis styling is werkend
- Focus op functionaliteit
- Design kun je later verbeteren

---

## 📦 Sample Producten (Optioneel)

Als je snel wilt testen met sample data, kun je deze producten toevoegen:

### Product 1: Vintage Sweatshirt
- Handle: `vintage-sweatshirt`
- Price: 4999 (€49.99)
- Image: `https://medusa-public-images.s3.eu-west-1.amazonaws.com/sweatshirt-vintage-front.png`

### Product 2: Classic T-Shirt  
- Handle: `classic-t-shirt`
- Price: 2999 (€29.99)
- Image: `https://medusa-public-images.s3.eu-west-1.amazonaws.com/tee-black-front.png`

### Product 3: Hoodie Black
- Handle: `hoodie-black`
- Price: 5999 (€59.99)
- Image: `https://medusa-public-images.s3.eu-west-1.amazonaws.com/black_hoodie_front.png`

---

## 🔧 Handige Links

- **Frontend**: http://localhost:3000
- **Admin**: http://localhost:9000/app
- **Products**: http://localhost:9000/app/products
- **Collections**: http://localhost:9000/app/collections
- **Orders**: http://localhost:9000/app/orders
- **Settings**: http://localhost:9000/app/settings

---

## 🐛 Troubleshooting

### Login werkt niet?
- Check of backend draait (zie terminal)
- Refresh de pagina
- Clear browser cache
- Check credentials

### Geen producten zichtbaar op frontend?
- Check of producten status = **Published**
- Check of **Region** bestaat (Settings → Regions)
- Refresh frontend

### Cart werkt niet?
- Check browser console voor errors
- Check of localStorage enabled is
- Refresh pagina

### Prijzen kloppen niet?
- Vergeet niet: prijzen in **centen**!
- €49.99 = 4999 centen

---

## 🎯 Volgende Stappen

1. ✅ Log in op admin
2. ✅ Maak region aan
3. ✅ Voeg 3-5 producten toe
4. ✅ Test hele flow: browse → cart → checkout
5. 🎨 Verbeter design later

---

**Alles is klaar! Begin met producten toevoegen en test je webshop!** 🚀
