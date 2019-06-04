'use strict'

const fastify = require('fastify')()

fastify.get('/', function (req, reply) {
  reply.send('hello')
})

fastify.listen(3000)
