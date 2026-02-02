import { fetchGraphQL } from './client'

// Common fragments
const POST_FRAGMENT = `
  fragment PostFields on Post {
    id
    title
    slug
    excerpt
    content
    tags
    isVideo
    isBreaking
    heatIndex
    views
    shares
    commentsCount
    publishedAt
    updatedAt
    coverImage {
      url
      alt
      width
      height
    }
    category {
      id
      name
      slug
      color
    }
    author {
      name
      avatar {
        url
      }
      bio
    }
    videoUrl
  }
`

// Query functions
export async function getPosts(
  first: number = 10,
  skip: number = 0,
  category?: string
) {
  const where = category ? `{ category: { slug: "${category}" } }` : '{}'
  
  const query = `
    ${POST_FRAGMENT}
    query GetPosts($first: Int!, $skip: Int!) {
      posts(first: $first, skip: $skip, where: ${where}, orderBy: publishedAt_DESC) {
        ...PostFields
      }
      postsConnection(where: ${where}) {
        aggregate {
          count
        }
      }
    }
  `

  return fetchGraphQL<{
    posts: any[]
    postsConnection: { aggregate: { count: number } }
  }>(query, { first, skip })
}

export async function getPostBySlug(slug: string) {
  const query = `
    ${POST_FRAGMENT}
    query GetPostBySlug($slug: String!) {
      post(where: { slug: $slug }) {
        ...PostFields
      }
    }
  `

  return fetchGraphQL<{ post: any }>(query, { slug })
}

export async function getTrendingPosts(limit: number = 5) {
  const query = `
    ${POST_FRAGMENT}
    query GetTrendingPosts($limit: Int!) {
      posts(
        where: { heatIndex_gt: 70 }
        first: $limit
        orderBy: heatIndex_DESC
      ) {
        ...PostFields
      }
    }
  `

  return fetchGraphQL<{ posts: any[] }>(query, { limit })
}

export async function getBreakingNews() {
  const query = `
    ${POST_FRAGMENT}
    query GetBreakingNews {
      posts(
        where: { isBreaking: true }
        first: 5
        orderBy: publishedAt_DESC
      ) {
        ...PostFields
      }
    }
  `

  return fetchGraphQL<{ posts: any[] }>(query)
}

export async function getVideos(first: number = 12) {
  const query = `
    ${POST_FRAGMENT}
    query GetVideos($first: Int!) {
      posts(
        where: { isVideo: true }
        first: $first
        orderBy: publishedAt_DESC
      ) {
        ...PostFields
        videoUrl
      }
    }
  `

  return fetchGraphQL<{ posts: any[] }>(query, { first })
}

export async function getCategories() {
  const query = `
    query GetCategories {
      categories {
        id
        name
        slug
        color
        description
        icon
      }
    }
  `

  return fetchGraphQL<{ categories: any[] }>(query)
}

export async function searchPosts(query: string, first: number = 10) {
  const searchQuery = `
    ${POST_FRAGMENT}
    query SearchPosts($query: String!, $first: Int!) {
      posts(
        where: {
          OR: [
            { title_contains: $query }
            { excerpt_contains: $query }
            { tags_contains_some: [$query] }
          ]
        }
        first: $first
        orderBy: publishedAt_DESC
      ) {
        ...PostFields
      }
    }
  `

  return fetchGraphQL<{ posts: any[] }>(searchQuery, { query, first })
}
