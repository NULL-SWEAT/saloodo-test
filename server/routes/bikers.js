const express = require('express')
const router = express.Router()

const users = require('../data/users')

// retrieve list of bikers
router.get('/', (req, res) => {
    let bikers = users.filter(u => u.role === 'biker')
    res.send(bikers)
})

module.exports = router