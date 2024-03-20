/**
 * Simple Fastify server with routes. Feel free to add more like fastify dotenv, fastify mysql, fastify swagger and more...
 */
import Fastify from 'fastify'
import cors from '@fastify/cors'
import helmet from '@fastify/helmet'
import autoLoad from '@fastify/autoload'
import path from 'node:path'
import { fileURLToPath } from 'url'
const environment = process.env.NODE_ENV || 'production'

// eslint-disable-next-line @typescript-eslint/naming-convention
const __filename = fileURLToPath(import.meta.url)
// eslint-disable-next-line @typescript-eslint/naming-convention
const __dirname = path.dirname(__filename)

export class Server {
  public app: Fastify.FastifyInstance

  /**
    * Constructor.
    *
    * @class Server
    * @constructor
    */
  constructor() {
    const envToLogger = {
      development: {
        level: 'info',
        transport: {
          target: 'pino-pretty',
          options: {
            translateTime: 'HH:MM:ss Z',
            ignore: 'pid,hostname',
          },
        },
      },
      production: true,
      test: false,
    }
    this.app = Fastify({
      logger: envToLogger[environment] ?? true
    })
  }

  /**
   * Bootstrap the application.
   *
   * @class Server
   * @method bootstrap
   * @static
   * @return {ng.auto.IInjectorService} Returns the newly created injector for this app.
   */
  public static async bootstrap(): Promise<Server> {
    const server = new Server()
    // Register all the Fastify plugins
    await server.registerPlugins()
    return server
  }

  /**
   * Configure application by registering all the fastify plugins
   *
   * @class Server
   * @method registerPlugins
   */
  private async registerPlugins() {
    // Trust extra exposed headers via Cross-Origin Resource Sharing
    await this.app.register(cors, {
      methods: ['GET', 'PUT', 'POST', 'DELETE'],
      allowedHeaders: [
        'Content-Type',
        'Authorization'
      ],
      exposedHeaders: [
        'Link',
      ]
    })
    // Hide powered by, prevent clickjacking, sure HTTP strict transport security, some XSS protections
    await this.app.register(helmet,
      // Example disables the `contentSecurityPolicy` middleware but keeps the rest.
      { contentSecurityPolicy: false }
    )

    // Load routes
    this.app.register(autoLoad, {
      dir: path.join(__dirname, 'routes'),
      // routeParams: true
    })

    // Load plugins
    this.app.register(autoLoad, {
      dir: path.join(__dirname, 'plugins')
    })
  }
}
