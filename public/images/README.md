# 📁 Images Folder Structuur

Deze folder bevat alle afbeeldingen voor je website.

## 📂 Folder Structuur

```
public/images/
├── products/       # Product afbeeldingen
├── categories/     # Categorie/collectie afbeeldingen
├── banners/        # Homepage banners en hero images
└── logo/           # Logo's en branding
```

## 🖼️ Hoe Te Gebruiken

### 1. Product Afbeeldingen
**Locatie**: `public/images/products/`

**Gebruik in code**:
```tsx
import Image from 'next/image'

<Image 
  src="/images/products/product-1.jpg" 
  alt="Product naam"
  width={500}
  height={500}
/>
```

**Aanbevolen formaat**:
- Resolutie: 1000x1000px of hoger
- Formaat: JPG of PNG
- Aspect ratio: 1:1 (vierkant) of 3:4 (portret)

---

### 2. Categorie Afbeeldingen
**Locatie**: `public/images/categories/`

**Gebruik**:
```tsx
<Image 
  src="/images/categories/dames.jpg" 
  alt="Dames collectie"
  width={800}
  height={600}
/>
```

**Aanbevolen formaat**:
- Resolutie: 1200x800px
- Aspect ratio: 3:2 of 16:9

---

### 3. Banners
**Locatie**: `public/images/banners/`

**Gebruik**:
```tsx
<Image 
  src="/images/banners/hero-banner.jpg" 
  alt="Hero banner"
  fill
  className="object-cover"
/>
```

**Aanbevolen formaat**:
- Desktop: 1920x800px
- Mobile: 800x1000px
- Aspect ratio: 16:9 (desktop) of 4:5 (mobile)

---

### 4. Logo's
**Locatie**: `public/images/logo/`

**Gebruik**:
```tsx
<Image 
  src="/images/logo/logo.svg" 
  alt="Benny's Fashion"
  width={150}
  height={50}
/>
```

**Aanbevolen formaat**:
- SVG (vector) voor beste kwaliteit
- Of PNG met transparante achtergrond
- Resolutie: 300x100px (of hoger)

---

## 🎨 Best Practices

### Bestandsnamen
✅ **Goed**:
- `product-vintage-sweatshirt.jpg`
- `category-dames.jpg`
- `banner-sale-2024.jpg`

❌ **Slecht**:
- `IMG_1234.jpg`
- `foto.png`
- `Schermafbeelding 2024.png`

### Optimalisatie
- Comprimeer afbeeldingen voor snellere laadtijd
- Gebruik tools zoals TinyPNG of Squoosh
- Max bestandsgrootte: 500KB per afbeelding

### Formaten
- **JPG**: Voor foto's en producten
- **PNG**: Voor afbeeldingen met transparantie
- **SVG**: Voor logo's en iconen
- **WebP**: Voor moderne browsers (beste compressie)

---

## 🔗 Medusa vs Lokale Afbeeldingen

### Medusa Afbeeldingen (Huidige Setup)
```tsx
// Afbeeldingen uit Medusa admin
<Image 
  src={product.images[0].url}  // S3 URL
  alt={product.title}
/>
```

### Lokale Afbeeldingen (Deze Folder)
```tsx
// Afbeeldingen uit public/images
<Image 
  src="/images/products/product-1.jpg"
  alt="Product naam"
/>
```

**Wanneer Welke Gebruiken?**
- **Medusa**: Voor product afbeeldingen die je via admin upload
- **Lokaal**: Voor vaste content (logo, banners, categorie headers)

---

## 📝 Voorbeelden

### Homepage Hero Banner
```tsx
<div className="relative h-screen">
  <Image 
    src="/images/banners/hero-home.jpg"
    alt="Nieuwe collectie"
    fill
    className="object-cover"
    priority
  />
</div>
```

### Categorie Card
```tsx
<div className="relative aspect-[3/4]">
  <Image 
    src="/images/categories/heren.jpg"
    alt="Heren collectie"
    fill
    className="object-cover"
  />
</div>
```

### Logo in Navigatie
```tsx
<Link href="/">
  <Image 
    src="/images/logo/logo.svg"
    alt="Benny's Fashion"
    width={120}
    height={40}
  />
</Link>
```

---

## 🚀 Volgende Stappen

1. **Upload je afbeeldingen** naar de juiste folders
2. **Hernoem bestanden** met duidelijke namen
3. **Optimaliseer afbeeldingen** voor web
4. **Update je componenten** om lokale afbeeldingen te gebruiken

---

## 💡 Tips

- Gebruik consistente bestandsnamen
- Maak backup van originele afbeeldingen
- Test afbeeldingen op verschillende schermformaten
- Gebruik Next.js Image component voor automatische optimalisatie
