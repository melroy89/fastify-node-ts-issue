import { MySQLPromisePool } from '@fastify/mysql'

// Declare our version of the FastifyInstance
declare module 'fastify' {

  // Instance is already prepare for MySQL Promise Pool using Fastify-Mysql
  // I also added some examples config when using Fastify-env
  interface FastifyInstance {
    config: {
      DATABASE_URL: string
      MAX_CONCURRENT: number
      MULTIPLE_STATATEMENTS: boolean
    }
    mysql: MySQLPromisePool
  }
}
