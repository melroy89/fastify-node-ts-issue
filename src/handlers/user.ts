import { FastifyPluginAsync } from 'fastify'
import userRepository from '../repositories/userRepository.js'

const userHandler: FastifyPluginAsync = async (instance) => {
  // This additional repository layer is optional, you could also do your database queries in the handler
  const userRepo = userRepository(instance)

  // Simple demo example (you should also define a schema for each API, which will make Fastify even faster!!)
  instance.get('/', (req, reply) => {

    // Get a user object
    // Note: If you use a database call like MySQL Promose,
    // be sure to make the this function async and use await, example: const [rows] = await userRepo.getUser()
    const obj = userRepo.getUser()
    reply.send(obj)
    // Try to sent an empty object, you will notice the payload plugin will kick in
    //  (just comment the line above, and uncomment the line below):
    // reply.send()
  })
}

export default userHandler
