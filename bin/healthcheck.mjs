import rabbitbus from '@servicebus/rabbitbus-common'
import mongoClient from 'sourced-repo-mongo/mongo.js'
import { config } from '../config.mjs'

const { makeBus } = rabbitbus

export const exit = ({ healthy = true } = {}) => {
  return healthy ? process.exit(0) : process.exit(1)
}

export const check = () => {
  return Promise.all([
    mongoClient.connect(config.sourced.mongo.url),
    makeBus(config.servicebus)
  ])
}

export const handleSuccessfulConnection = (healthcheck) => {
  return () => {
    healthcheck({ healthy: true })
  }
}

export const handleUnsuccessfulConnection = (healthcheck) => {
  return (e) => {
    healthcheck({ healthy: false })
  }
}

check()
  .then(handleSuccessfulConnection(exit))
  .catch(handleUnsuccessfulConnection(exit))
