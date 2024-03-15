import { MySQLPromisePool } from '@fastify/mysql'

// Declare our version of the FastifyInstance
declare module 'fastify' {
  interface FastifyInstance {
    config: {
      DATABASE_URL: string
      MAX_CONCURRENT: number
      MULTIPLE_STATATEMENTS: boolean
      FALLBACK_LIMIT_RESULTS: number
      PAGINATION_RESULTS_PER_PAGE: number
      PAGINATION_LIMIT_PER_PAGE: number
    }
    mysql: MySQLPromisePool
  }
}
