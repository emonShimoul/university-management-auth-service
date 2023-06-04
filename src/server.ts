import { Server } from 'http'
import mongoose from 'mongoose'
import app from './app'
import config from './config/index'
import { errorLogger, logger } from './shared/logger'

async function bootstrap() {
  let server: Server

  try {
    await mongoose.connect(config.database_url as string)
    logger.info(`Database is connected successfully`)

    server = app.listen(config.port, () => {
      logger.info(`Application listening on port ${config.port}`)
    })
  } catch (err) {
    errorLogger.error('Failed to connect database', err)
  }

  process.on('unhandledRejection', error => {
    console.log('Unhandled Rejection is detected, we are closing our server...')
    if (server) {
      server.close(() => {
        errorLogger.error(error)
        process.exit(1)
      })
    } else {
      process.exit(1)
    }
  })
}

bootstrap()
