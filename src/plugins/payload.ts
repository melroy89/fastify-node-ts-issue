import { FastifyPluginAsync } from 'fastify'
import fastJson from 'fast-json-stringify'
import fp from 'fastify-plugin'

/**
 * Processing payload
 * @param instance Fastify Instance object
 */
const payloadPlugin: FastifyPluginAsync = async (instance) => {

  /**
   * Hook on the `onSend`, just before the data is sent to the client
   */
  instance.addHook('onSend', (req, reply, payload, done) => {
    // Check if the payload is empty/null/undefined
    // If so, return a 404 Not found message
    if (!payload) {
      // Change HTTP status to 404 + set content-type
      reply.code(404).header('content-type', 'application/json; charset=utf-8')
      // Not found message
      const stringify = fastJson({
        type: 'object',
        properties: {
          message: {
            type: 'string'
          }
        }
      })
      const message = { message: 'Not found' }
      return done(null, stringify(message))
    }
    done()
  })
}

export default fp(payloadPlugin)
