import { FastifyPluginAsync } from 'fastify'
import { FastifyRequest, FastifyReply } from 'fastify'

import userRepository from '../../repositories/userRepository.js'

const apiRoutes: FastifyPluginAsync = async (instance, opts) => {
  const userRepo = userRepository(instance)

  // Simple demo example
  instance.get('/', opts, (req: FastifyRequest, reply: FastifyReply) => {
    const obj = userRepo.getUser()
    reply.send(obj)
  })
}

export default apiRoutes
