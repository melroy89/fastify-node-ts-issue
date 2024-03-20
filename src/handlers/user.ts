import { FastifyPluginAsync } from 'fastify'
import userRepository from '../repositories/userRepository.js'

const userHandler: FastifyPluginAsync = async (instance) => {
  const userRepo = userRepository(instance)

  // Simple demo example (you should also define a schema for each API, which will make Fastify even faster)
  instance.get('/', (req, reply) => {
    const obj = userRepo.getUser()
    reply.send(obj)
    // Try to sent an empty object, you will notice the payload plugin will kick in
    //  (just comment the line above, and uncomment the line below):
    // reply.send()
  })
}

export default userHandler
