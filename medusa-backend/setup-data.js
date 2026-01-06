const axios = require('axios')

const MEDUSA_URL = 'http://localhost:9000'
const ADMIN_EMAIL = 'louay-attahiri@hotmail.com'
const ADMIN_PASSWORD = 'Louay-Ouahb-0411!'

let authToken = ''

async function login() {
  try {
    const response = await axios.post(`${MEDUSA_URL}/auth/user/emailpass`, {
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
    }, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
    authToken = response.data.token
    console.log('✓ Logged in successfully')
    return true
  } catch (error) {
    console.error('✗ Login failed:', error.response?.data || error.message)
    console.log('\nCheck if Medusa backend is running on', MEDUSA_URL)
    return false
  }
}

async function createRegion() {
  try {
    const response = await axios.post(
      `${MEDUSA_URL}/admin/regions`,
      {
        name: 'Nederland',
        currency_code: 'eur',
        countries: ['nl'],
        payment_providers: [],
        fulfillment_providers: [],
      },
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    )
    console.log('✓ Region "Nederland" created')
    return response.data.region
  } catch (error) {
    if (error.response?.status === 409) {
      console.log('✓ Region already exists')
      const regions = await axios.get(`${MEDUSA_URL}/admin/regions`, {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      return regions.data.regions[0]
    }
    console.error('✗ Failed to create region:', error.response?.data || error.message)
    return null
  }
}

async function createCollection(title, handle) {
  try {
    const response = await axios.post(
      `${MEDUSA_URL}/admin/collections`,
      {
        title,
        handle,
      },
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    )
    console.log(`✓ Collection "${title}" created`)
    return response.data.collection
  } catch (error) {
    console.log(`✓ Collection "${title}" might already exist`)
    return null
  }
}

async function createProduct(productData, regionId) {
  try {
    const response = await axios.post(
      `${MEDUSA_URL}/admin/products`,
      productData,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    )
    console.log(`✓ Product "${productData.title}" created`)
    return response.data.product
  } catch (error) {
    console.error(`✗ Failed to create product "${productData.title}":`, error.response?.data || error.message)
    return null
  }
}

async function setup() {
  console.log('🚀 Starting Medusa setup...\n')

  // Login
  const loggedIn = await login()
  if (!loggedIn) return

  // Create region
  console.log('\n📍 Creating region...')
  const region = await createRegion()
  if (!region) {
    console.error('Failed to get region')
    return
  }

  // Create collections
  console.log('\n📦 Creating collections...')
  const collections = []
  collections.push(await createCollection('Nieuwe Collectie', 'nieuwe-collectie'))
  collections.push(await createCollection('Sale', 'sale'))
  collections.push(await createCollection('Dames', 'dames'))
  collections.push(await createCollection('Heren', 'heren'))

  // Get collection IDs
  const collectionsResponse = await axios.get(`${MEDUSA_URL}/admin/collections`, {
    headers: { Authorization: `Bearer ${authToken}` },
  })
  const collectionIds = collectionsResponse.data.collections.map(c => c.id)

  // Create sample products
  console.log('\n🛍️  Creating sample products...')
  
  const products = [
    {
      title: 'Vintage Sweatshirt',
      handle: 'vintage-sweatshirt',
      description: 'Comfortabele vintage sweatshirt van hoogwaardige katoen.',
      status: 'published',
      collection_id: collectionIds[0],
      images: [
        { url: 'https://medusa-public-images.s3.eu-west-1.amazonaws.com/sweatshirt-vintage-front.png' }
      ],
      options: [
        { title: 'Size', values: ['S', 'M', 'L', 'XL'] }
      ],
      variants: [
        { title: 'S', prices: [{ amount: 4999, currency_code: 'eur', region_id: region.id }], options: [{ value: 'S' }], manage_inventory: false },
        { title: 'M', prices: [{ amount: 4999, currency_code: 'eur', region_id: region.id }], options: [{ value: 'M' }], manage_inventory: false },
        { title: 'L', prices: [{ amount: 4999, currency_code: 'eur', region_id: region.id }], options: [{ value: 'L' }], manage_inventory: false },
        { title: 'XL', prices: [{ amount: 4999, currency_code: 'eur', region_id: region.id }], options: [{ value: 'XL' }], manage_inventory: false },
      ],
    },
    {
      title: 'Classic T-Shirt',
      handle: 'classic-t-shirt',
      description: 'Tijdloze basic t-shirt, perfect voor elke dag.',
      status: 'published',
      collection_id: collectionIds[1],
      images: [
        { url: 'https://medusa-public-images.s3.eu-west-1.amazonaws.com/tee-black-front.png' }
      ],
      options: [
        { title: 'Size', values: ['S', 'M', 'L'] }
      ],
      variants: [
        { title: 'S', prices: [{ amount: 2999, currency_code: 'eur', region_id: region.id }], options: [{ value: 'S' }], manage_inventory: false },
        { title: 'M', prices: [{ amount: 2999, currency_code: 'eur', region_id: region.id }], options: [{ value: 'M' }], manage_inventory: false },
        { title: 'L', prices: [{ amount: 2999, currency_code: 'eur', region_id: region.id }], options: [{ value: 'L' }], manage_inventory: false },
      ],
    },
    {
      title: 'Denim Jacket',
      handle: 'denim-jacket',
      description: 'Stijlvolle denim jacket voor een casual look.',
      status: 'published',
      collection_id: collectionIds[2],
      images: [
        { url: 'https://medusa-public-images.s3.eu-west-1.amazonaws.com/ls-black-front.png' }
      ],
      options: [
        { title: 'Size', values: ['M', 'L', 'XL'] }
      ],
      variants: [
        { title: 'M', prices: [{ amount: 7999, currency_code: 'eur', region_id: region.id }], options: [{ value: 'M' }], manage_inventory: false },
        { title: 'L', prices: [{ amount: 7999, currency_code: 'eur', region_id: region.id }], options: [{ value: 'L' }], manage_inventory: false },
        { title: 'XL', prices: [{ amount: 7999, currency_code: 'eur', region_id: region.id }], options: [{ value: 'XL' }], manage_inventory: false },
      ],
    },
    {
      title: 'Hoodie Black',
      handle: 'hoodie-black',
      description: 'Warme hoodie met capuchon, ideaal voor koude dagen.',
      status: 'published',
      collection_id: collectionIds[3],
      images: [
        { url: 'https://medusa-public-images.s3.eu-west-1.amazonaws.com/black_hoodie_front.png' }
      ],
      options: [
        { title: 'Size', values: ['S', 'M', 'L', 'XL'] }
      ],
      variants: [
        { title: 'S', prices: [{ amount: 5999, currency_code: 'eur', region_id: region.id }], options: [{ value: 'S' }], manage_inventory: false },
        { title: 'M', prices: [{ amount: 5999, currency_code: 'eur', region_id: region.id }], options: [{ value: 'M' }], manage_inventory: false },
        { title: 'L', prices: [{ amount: 5999, currency_code: 'eur', region_id: region.id }], options: [{ value: 'L' }], manage_inventory: false },
        { title: 'XL', prices: [{ amount: 5999, currency_code: 'eur', region_id: region.id }], options: [{ value: 'XL' }], manage_inventory: false },
      ],
    },
  ]

  for (const product of products) {
    await createProduct(product, region.id)
  }

  console.log('\n✅ Setup complete!')
  console.log('\n📝 Summary:')
  console.log('- Region: Nederland (EUR)')
  console.log('- Collections: 4')
  console.log('- Products: 4')
  console.log('\n🌐 Open your store: http://localhost:3000')
  console.log('🔧 Admin dashboard: http://localhost:9000/app')
}

setup().catch(console.error)
