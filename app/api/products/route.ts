import { NextResponse } from 'next/server'
import medusaClient from '@/lib/medusa-client'

export async function GET() {
  try {
    const { products } = await medusaClient.store.product.list({
      limit: 20,
    })

    return NextResponse.json({ products })
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}
