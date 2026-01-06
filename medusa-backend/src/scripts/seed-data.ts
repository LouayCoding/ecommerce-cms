import { MedusaContainer } from "@medusajs/framework/types"

export default async function seedData(container: MedusaContainer) {
  const logger = container.resolve("logger")
  const regionModuleService = container.resolve("regionModuleService")
  const productModuleService = container.resolve("productModuleService")
  const salesChannelModuleService = container.resolve("salesChannelModuleService")

  logger.info("Seeding data...")

  try {
    // Create region
    logger.info("Creating region...")
    const regions = await regionModuleService.listRegions()
    let region = regions.find((r: any) => r.name === "Nederland")
    
    if (!region) {
      region = await regionModuleService.createRegions({
        name: "Nederland",
        currency_code: "eur",
        countries: ["nl"],
      })
      logger.info("✓ Region created")
    } else {
      logger.info("✓ Region already exists")
    }

    // Get default sales channel
    const salesChannels = await salesChannelModuleService.listSalesChannels()
    const defaultSalesChannel = salesChannels[0]

    // Create products
    logger.info("Creating products...")
    
    const products = [
      {
        title: "Vintage Sweatshirt",
        handle: "vintage-sweatshirt",
        description: "Comfortabele vintage sweatshirt van hoogwaardige katoen.",
        status: "published",
        images: [
          { url: "https://medusa-public-images.s3.eu-west-1.amazonaws.com/sweatshirt-vintage-front.png" }
        ],
        options: [
          { title: "Size", values: ["S", "M", "L", "XL"] }
        ],
        variants: [
          { 
            title: "S", 
            sku: "SWEAT-S",
            prices: [{ amount: 4999, currency_code: "eur" }],
            options: { Size: "S" },
            manage_inventory: false 
          },
          { 
            title: "M", 
            sku: "SWEAT-M",
            prices: [{ amount: 4999, currency_code: "eur" }],
            options: { Size: "M" },
            manage_inventory: false 
          },
          { 
            title: "L", 
            sku: "SWEAT-L",
            prices: [{ amount: 4999, currency_code: "eur" }],
            options: { Size: "L" },
            manage_inventory: false 
          },
          { 
            title: "XL", 
            sku: "SWEAT-XL",
            prices: [{ amount: 4999, currency_code: "eur" }],
            options: { Size: "XL" },
            manage_inventory: false 
          },
        ],
      },
      {
        title: "Classic T-Shirt",
        handle: "classic-t-shirt",
        description: "Tijdloze basic t-shirt, perfect voor elke dag.",
        status: "published",
        images: [
          { url: "https://medusa-public-images.s3.eu-west-1.amazonaws.com/tee-black-front.png" }
        ],
        options: [
          { title: "Size", values: ["S", "M", "L"] }
        ],
        variants: [
          { 
            title: "S", 
            sku: "TEE-S",
            prices: [{ amount: 2999, currency_code: "eur" }],
            options: { Size: "S" },
            manage_inventory: false 
          },
          { 
            title: "M", 
            sku: "TEE-M",
            prices: [{ amount: 2999, currency_code: "eur" }],
            options: { Size: "M" },
            manage_inventory: false 
          },
          { 
            title: "L", 
            sku: "TEE-L",
            prices: [{ amount: 2999, currency_code: "eur" }],
            options: { Size: "L" },
            manage_inventory: false 
          },
        ],
      },
      {
        title: "Denim Jacket",
        handle: "denim-jacket",
        description: "Stijlvolle denim jacket voor een casual look.",
        status: "published",
        images: [
          { url: "https://medusa-public-images.s3.eu-west-1.amazonaws.com/ls-black-front.png" }
        ],
        options: [
          { title: "Size", values: ["M", "L", "XL"] }
        ],
        variants: [
          { 
            title: "M", 
            sku: "JACKET-M",
            prices: [{ amount: 7999, currency_code: "eur" }],
            options: { Size: "M" },
            manage_inventory: false 
          },
          { 
            title: "L", 
            sku: "JACKET-L",
            prices: [{ amount: 7999, currency_code: "eur" }],
            options: { Size: "L" },
            manage_inventory: false 
          },
          { 
            title: "XL", 
            sku: "JACKET-XL",
            prices: [{ amount: 7999, currency_code: "eur" }],
            options: { Size: "XL" },
            manage_inventory: false 
          },
        ],
      },
      {
        title: "Hoodie Black",
        handle: "hoodie-black",
        description: "Warme hoodie met capuchon, ideaal voor koude dagen.",
        status: "published",
        images: [
          { url: "https://medusa-public-images.s3.eu-west-1.amazonaws.com/black_hoodie_front.png" }
        ],
        options: [
          { title: "Size", values: ["S", "M", "L", "XL"] }
        ],
        variants: [
          { 
            title: "S", 
            sku: "HOODIE-S",
            prices: [{ amount: 5999, currency_code: "eur" }],
            options: { Size: "S" },
            manage_inventory: false 
          },
          { 
            title: "M", 
            sku: "HOODIE-M",
            prices: [{ amount: 5999, currency_code: "eur" }],
            options: { Size: "M" },
            manage_inventory: false 
          },
          { 
            title: "L", 
            sku: "HOODIE-L",
            prices: [{ amount: 5999, currency_code: "eur" }],
            options: { Size: "L" },
            manage_inventory: false 
          },
          { 
            title: "XL", 
            sku: "HOODIE-XL",
            prices: [{ amount: 5999, currency_code: "eur" }],
            options: { Size: "XL" },
            manage_inventory: false 
          },
        ],
      },
    ]

    for (const productData of products) {
      try {
        const existing = await productModuleService.listProducts({ handle: productData.handle })
        if (existing.length > 0) {
          logger.info(`✓ Product "${productData.title}" already exists`)
          continue
        }

        await productModuleService.createProducts(productData)
        logger.info(`✓ Product "${productData.title}" created`)
      } catch (error) {
        logger.error(`✗ Failed to create product "${productData.title}":`, error)
      }
    }

    logger.info("✅ Seeding complete!")
    logger.info("🌐 Open your store: http://localhost:3000")
    logger.info("🔧 Admin dashboard: http://localhost:9000/app")
    
  } catch (error) {
    logger.error("Error seeding data:", error)
    throw error
  }
}
