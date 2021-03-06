import { start, onStart } from 'start.mjs'
jest.mock('llog')
jest.mock('@servicebus/errortrap', () => jest.fn())
jest.mock('@servicebus/rabbitbus-common')
jest.mock('../../../config.mjs')
jest.mock('@servicebus/express', () => ({
  makeServer: jest.fn(() => ({
    get: jest.fn(),
    start: jest.fn(),
    use: jest.fn()
  }))
}))

describe('./bin/start.mjs', () => {
  it('should start our add-todo-api', () => {
    let errortrap = require('@servicebus/errortrap')
    let log = require('llog')

    start()
    expect(errortrap).toBeCalled()

    onStart()
    expect(log.info).toBeCalled()
  })
})
