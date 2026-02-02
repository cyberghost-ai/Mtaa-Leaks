/**
 * Hygraph CMS Client Configuration
 * 
 * Environment Variables Required:
 * - NEXT_PUBLIC_HYGRAPH_URL: Your Hygraph API endpoint
 * - NEXT_PUBLIC_HYGRAPH_TOKEN: Your Hygraph access token
 */

const HYGRAPH_URL = process.env.NEXT_PUBLIC_HYGRAPH_URL
const HYGRAPH_TOKEN = process.env.NEXT_PUBLIC_HYGRAPH_TOKEN

if (!HYGRAPH_URL || !HYGRAPH_TOKEN) {
  console.warn('Hygraph environment variables not set. Using mock data.')
}

export async function fetchGraphQL<T = any>(
  query: string,
  variables: Record<string, any> = {}
): Promise<T> {
  // If no URL/token, return mock data
  if (!HYGRAPH_URL || !HYGRAPH_TOKEN) {
    console.log('Using mock data for:', query)
    return {} as T
  }

  try {
    const response = await fetch(HYGRAPH_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${HYGRAPH_TOKEN}`,
      },
      body: JSON.stringify({
        query,
        variables,
      }),
      next: { revalidate: 60 }, // Revalidate every minute
    })

    if (!response.ok) {
      throw new Error(`GraphQL Error: ${response.statusText}`)
    }

    const json = await response.json()
    
    if (json.errors) {
      console.error('GraphQL Errors:', json.errors)
      throw new Error(json.errors[0].message)
    }

    return json.data
  } catch (error) {
    console.error('Failed to fetch from Hygraph:', error)
    throw error
  }
}

// Pre-configured queries from schema
export * from './queries'

// Types
export interface GraphQLResponse<T> {
  data: T
  errors?: Array<{
    message: string
    locations?: Array<{ line: number; column: number }>
    path?: string[]
  }>
}

// Cache configuration
export const cacheConfig = {
  revalidate: 60, // 1 minute
  tags: ['posts', 'categories', 'authors']
}
