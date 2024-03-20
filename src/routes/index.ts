import { FastifyPluginAsync } from 'fastify'
import { FastifyRequest, FastifyReply } from 'fastify'

const routes: FastifyPluginAsync = async (instance, opts) => {

  instance.get('/', opts, (req: FastifyRequest, reply: FastifyReply) => {
    reply.send({message: 'Welcome to my API! If you want to use the API, see: /api', code: 200})
  })

  // Ignore favicon.ico
  // If you use Swagger/OpenAPI schema, also add: schema: { hide: true } to the options.
  instance.get('/favicon.ico', { logLevel: 'silent' }, (req, reply) =>
    reply.status(204).send())
}

export default routes
