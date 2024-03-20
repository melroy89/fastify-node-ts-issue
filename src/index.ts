import { Server } from './server.js'
const port = normalizePort(process.env.PORT || '3000') // Default port
const hostname = process.env.HOST || '0.0.0.0' // Default host: listen on all interfaces

const server = await Server.bootstrap()
const app = server.app

// Start listen
app.listen({ port: port, host: hostname }, (err) => {
  if (err) {
    app.log.error(err)
    process.exit(1)
  }
  // It's running...
})

function normalizePort (val: string): number {
  const parsedPort = parseInt(val, 10)
  if (isNaN(parsedPort)) {
    // named pipe
    throw new Error('Port is not a number')
  }

  if (parsedPort >= 0) {
    // port number
    return parsedPort
  } else {
    throw new Error(`Invalid port: ${val}`)
  }
}
