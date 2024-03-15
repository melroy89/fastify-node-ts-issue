import Fastify from 'fastify'
import cors from '@fastify/cors'
import helmet from '@fastify/helmet'
import autoLoad from '@fastify/autoload'
import path from 'node:path'
import { fileURLToPath } from 'url'

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
    this.app = Fastify({
      logger: true
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
        'X-Pagination',
        'Content-Type',
        'Authorization'
      ],
      exposedHeaders: [
        'Link',
        'X-Total-Count',
        'X-Per-Page',
        'X-Last-Page'
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
      // dirNameRoutePrefix: false
    })
  }
}
