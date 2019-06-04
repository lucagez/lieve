'use strict'

const express = require('express')

const app = express()

app.disable('etag')
app.disable('x-powered-by')

app.get('/', function (req, res) {
  res.send('hello')
})

app.listen(3000)
