import Link from 'next/link'
import { ProductGrid } from '@/components/public/ProductGrid'
import { getPublishedProducts } from '@/lib/queries/products'

export default async function HomePage() {
  const products = await getPublishedProducts()
  const featuredProducts = products.slice(0, 8)

  return (
    <div className="bg-black">
      {/* Dark Hero - LV Style with Product Image */}
      <section className="relative h-[70vh] w-full overflow-hidden bg-black pt-[64px] md:h-[95vh] md:pt-10">
        {/* Background Image - Product centered */}
        <div className="absolute inset-0 flex items-center justify-center">
          <img 
            src="/images/banners/hero.jpg" 
            alt="Hero banner"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Hero Content - Bottom positioned like LV */}
        <div className="absolute bottom-0 left-0 right-0 pb-20 text-center">
          <div className="mx-auto max-w-2xl px-8">
            <p className="mb-3 text-[10px] uppercase tracking-[0.2em] text-white">
              Nieuwe Collectie
            </p>
            <h1 className="mb-4 text-[26px] font-light leading-tight tracking-tight text-white md:text-[32px]">
              Le Monogram 130th Anniversary
            </h1>
            <div className="flex items-center justify-center gap-4 text-[15px] text-white">
              <Link href="/products" className="underline underline-offset-4 transition-opacity hover:opacity-60">
                Learn More
              </Link>
              <Link href="/products" className="underline underline-offset-4 transition-opacity hover:opacity-60">
                Discover the Collections
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Product Categories Section */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-[1650px] px-8">
          {/* Section Title */}
          <h2 className="mb-6 text-center text-[24px] md:text-[32px] font-light tracking-wide leading-tight text-black md:max-w-[580px] md:mx-auto">
            Explore a Selection of the Maison's Creations
          </h2>

          {/* Categories Grid - 4 cols desktop, 2 cols mobile */}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-x-5 md:gap-y-8">
            {/* Women's Handbags */}
            <div className="group cursor-pointer">
              <div className="mb-4 overflow-hidden bg-gradient-to-br from-neutral-100 to-blue-50">
                <img
                  src="https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&q=80"
                  alt="Women's Handbags"
                  className="aspect-[4/5] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <h3 className="text-center text-[16px] tracking-wide text-black">
                Women's Handbags
              </h3>
            </div>

            {/* Women's Small Leather Goods */}
            <div className="group cursor-pointer">
              <div className="mb-4 overflow-hidden bg-gradient-to-br from-blue-50 to-pink-50">
                <img
                  src="https://images.unsplash.com/photo-1591561954557-26941169b49e?w=600&q=80"
                  alt="Women's Small Leather Goods"
                  className="aspect-[4/5] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <h3 className="text-center text-[16px] tracking-wide text-black">
                Women's Small Leather Goods
              </h3>
            </div>

            {/* Women's Accessories */}
            <div className="group cursor-pointer">
              <div className="mb-4 overflow-hidden bg-gradient-to-br from-pink-50 to-neutral-100">
                <img
                  src="https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=600&q=80"
                  alt="Women's Accessories"
                  className="aspect-[4/5] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <h3 className="text-center text-[16px] tracking-wide text-black">
                Women's Accessories
              </h3>
            </div>

            {/* Beauty */}
            <div className="group cursor-pointer">
              <div className="mb-4 overflow-hidden bg-gradient-to-br from-neutral-100 to-blue-50">
                <img
                  src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&q=80"
                  alt="Beauty"
                  className="aspect-[4/5] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <h3 className="text-center text-[16px] tracking-wide text-black">
                Beauty
              </h3>
            </div>

            {/* Men's Bags */}
            <div className="group cursor-pointer">
              <div className="mb-4 overflow-hidden bg-gradient-to-br from-blue-50 to-neutral-100">
                <img
                  src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80"
                  alt="Men's Bags"
                  className="aspect-[4/5] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <h3 className="text-center text-[16px] tracking-wide text-black">
                Men's Bags
              </h3>
            </div>

            {/* Men's Small Leather Goods */}
            <div className="group cursor-pointer">
              <div className="mb-4 overflow-hidden bg-gradient-to-br from-neutral-100 to-pink-50">
                <img
                  src="https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&q=80"
                  alt="Men's Small Leather Goods"
                  className="aspect-[4/5] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <h3 className="text-center text-[16px] tracking-wide text-black">
                Men's Small Leather Goods
              </h3>
            </div>

            {/* Men's Accessories */}
            <div className="group cursor-pointer">
              <div className="mb-4 overflow-hidden bg-gradient-to-br from-pink-50 to-blue-50">
                <img
                  src="https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=600&q=80"
                  alt="Men's Accessories"
                  className="aspect-[4/5] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <h3 className="text-center text-[16px] tracking-wide text-black">
                Men's Accessories
              </h3>
            </div>

            {/* Perfumes */}
            <div className="group cursor-pointer">
              <div className="mb-4 overflow-hidden bg-gradient-to-br from-blue-50 to-neutral-100">
                <img
                  src="https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&q=80"
                  alt="Perfumes"
                  className="aspect-[4/5] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <h3 className="text-center text-[16px] tracking-wide text-black">
                Perfumes
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-[1650px] px-8">
          <div className="mb-6 text-center">
            <h2 className="text-[24px] md:text-[32px] font-light tracking-wide leading-tight text-black md:max-w-[580px] md:mx-auto">
              Onze Selectie
            </h2>
          </div>
          
          <ProductGrid products={featuredProducts} />
          
          {products.length > 8 && (
            <div className="mt-16 text-center">
              <Link 
                href="/products"
                className="inline-flex items-center justify-center border border-black px-8 py-3 text-[11px] uppercase tracking-[0.15em] text-black transition-all hover:bg-black hover:text-white"
              >
                Bekijk alle producten
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
