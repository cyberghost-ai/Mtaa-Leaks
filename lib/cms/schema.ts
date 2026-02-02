/**
 * Hygraph Schema for Mtaa Leaks
 * 
 * Model Definitions:
 */

export const schema = {
  models: [
    {
      name: 'Post',
      description: 'Main content model for news, gossip, and videos',
      fields: [
        {
          name: 'title',
          type: 'String',
          isRequired: true,
          isTitle: true
        },
        {
          name: 'slug',
          type: 'Slug',
          isRequired: true,
          isUnique: true
        },
        {
          name: 'excerpt',
          type: 'String',
          isRequired: true,
          maxLength: 200
        },
        {
          name: 'content',
          type: 'RichText',
          isRequired: true
        },
        {
          name: 'category',
          type: 'Relation',
          relation: 'oneToOne',
          model: 'Category'
        },
        {
          name: 'tags',
          type: 'String',
          isList: true
        },
        {
          name: 'coverImage',
          type: 'Asset',
          isRequired: true
        },
        {
          name: 'videoUrl',
          type: 'String',
          description: 'For video posts'
        },
        {
          name: 'isVideo',
          type: 'Boolean',
          defaultValue: false
        },
        {
          name: 'isBreaking',
          type: 'Boolean',
          defaultValue: false
        },
        {
          name: 'heatIndex',
          type: 'Int',
          defaultValue: 50,
          validation: { min: 0, max: 100 }
        },
        {
          name: 'views',
          type: 'Int',
          defaultValue: 0
        },
        {
          name: 'shares',
          type: 'Int',
          defaultValue: 0
        },
        {
          name: 'commentsCount',
          type: 'Int',
          defaultValue: 0
        },
        {
          name: 'author',
          type: 'Relation',
          relation: 'oneToOne',
          model: 'Author'
        },
        {
          name: 'publishedAt',
          type: 'DateTime',
          isRequired: true
        },
        {
          name: 'updatedAt',
          type: 'DateTime',
          isRequired: true
        },
        {
          name: 'metadata',
          type: 'Json',
          description: 'SEO metadata'
        }
      ]
    },
    {
      name: 'Category',
      fields: [
        {
          name: 'name',
          type: 'String',
          isRequired: true
        },
        {
          name: 'slug',
          type: 'Slug',
          isRequired: true,
          isUnique: true
        },
        {
          name: 'color',
          type: 'String',
          defaultValue: '#ff0055'
        },
        {
          name: 'description',
          type: 'String'
        },
        {
          name: 'icon',
          type: 'String'
        }
      ]
    },
    {
      name: 'Author',
      fields: [
        {
          name: 'name',
          type: 'String',
          isRequired: true
        },
        {
          name: 'avatar',
          type: 'Asset'
        },
        {
          name: 'bio',
          type: 'String'
        },
        {
          name: 'socialLinks',
          type: 'Json'
        }
      ]
    },
    {
      name: 'Video',
      extend: 'Post',
      fields: [
        {
          name: 'duration',
          type: 'Int',
          description: 'Duration in seconds'
        },
        {
          name: 'platform',
          type: 'String',
          enum: ['youtube', 'tiktok', 'instagram', 'direct']
        },
        {
          name: 'embedCode',
          type: 'String'
        }
      ]
    }
  ]
}

/**
 * Sample Queries
 */
export const queries = {
  // Get all posts with pagination
  posts: `
    query Posts($first: Int = 10, $skip: Int = 0, $where: PostWhereInput) {
      posts(first: $first, skip: $skip, where: $where, orderBy: publishedAt_DESC) {
        id
        title
        slug
        excerpt
        coverImage {
          url
          alt
          width
          height
        }
        category {
          name
          slug
          color
        }
        tags
        isVideo
        isBreaking
        heatIndex
        views
        shares
        commentsCount
        author {
          name
          avatar {
            url
          }
        }
        publishedAt
      }
      postsConnection(where: $where) {
        aggregate {
          count
        }
      }
    }
  `,

  // Get single post by slug
  postBySlug: `
    query PostBySlug($slug: String!) {
      post(where: { slug: $slug }) {
        id
        title
        slug
        excerpt
        content
        coverImage {
          url
          alt
          width
          height
        }
        videoUrl
        isVideo
        isBreaking
        heatIndex
        views
        shares
        commentsCount
        tags
        category {
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
        publishedAt
        updatedAt
        metadata
      }
    }
  `,

  // Get trending posts (high heat index)
  trendingPosts: `
    query TrendingPosts($limit: Int = 5) {
      posts(
        where: { heatIndex_gt: 70 }
        first: $limit
        orderBy: heatIndex_DESC
      ) {
        id
        title
        slug
        heatIndex
        views
        category {
          name
          color
        }
        publishedAt
      }
    }
  `,

  // Get breaking news
  breakingNews: `
    query BreakingNews {
      posts(
        where: { isBreaking: true }
        first: 5
        orderBy: publishedAt_DESC
      ) {
        id
        title
        slug
        excerpt
        publishedAt
      }
    }
  `,

  // Get videos
  videos: `
    query Videos($first: Int = 12) {
      posts(
        where: { isVideo: true }
        first: $first
        orderBy: publishedAt_DESC
      ) {
        id
        title
        slug
        excerpt
        coverImage {
          url
          alt
        }
        videoUrl
        views
        duration
        platform
        publishedAt
      }
    }
  `
}
