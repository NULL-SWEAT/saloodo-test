'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')

const auth = require('./routes/auth')
const orders = require('./routes/orders')
const bikers = require('./routes/bikers')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

app.use('/auth', auth)
app.use('/orders', orders)
app.use('/bikers', bikers)

app.listen(3000, () => console.log('Listening on port 3000'))
