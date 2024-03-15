import { FastifyPluginAsync } from 'fastify'
import { FastifyRequest, FastifyReply } from 'fastify'

const routes: FastifyPluginAsync = async (instance, opts) => {

  instance.get('/', opts, (req: FastifyRequest, reply: FastifyReply) => {
    reply.send({message: 'Hello world', code: 200})
  })
}

export default routes
