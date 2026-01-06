import { z } from 'zod'

export const productSchema = z.object({
  title: z.string().min(1, 'Titel is verplicht'),
  slug: z.string().min(1, 'Slug is verplicht'),
  description: z.string().optional(),
  price_cents: z.number().int().positive('Prijs moet positief zijn'),
  currency: z.string().default('EUR'),
  is_published: z.boolean().default(false),
  category_id: z.string().uuid().nullable().optional(),
})

export const categorySchema = z.object({
  name: z.string().min(1, 'Naam is verplicht'),
  slug: z.string().min(1, 'Slug is verplicht'),
})

export const loginSchema = z.object({
  email: z.string().email('Ongeldig e-mailadres'),
  password: z.string().min(6, 'Wachtwoord moet minimaal 6 tekens zijn'),
})
