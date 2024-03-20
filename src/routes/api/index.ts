import { FastifyPluginAsync } from 'fastify'
import userHandler from '../../handlers/user.js'

const apiRoutes: FastifyPluginAsync = async (instance) => {
  // API root
  instance.get('/', (req, reply) =>
    reply.send({ message: 'Welcome to the root API end-point. We have a users end-point, go to: /users' }))

  // API routes
  instance.register(userHandler, { prefix: '/users' })
  // ... other routes ...
}

export default apiRoutes
