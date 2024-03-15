import { FastifyInstance } from 'fastify'

// instance is normally used for retrieving the instance.mysql object. Doing DB calls.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const userRepository = (instance: FastifyInstance) => ({
  // Not using MySQL, just a demo for now...
  getUser: () => ({
    'id': 1,
    'name': 'Melroy van den Berg',
    'username': 'melroy'
  })
})

export default userRepository
