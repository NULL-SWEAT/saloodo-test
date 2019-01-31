const express = require('express')
const router = express.Router()

let orders = require('../data/orders')

// update order
router.put('/', (req, res) => {
    const order = req.body

    let orderIndex = orders.findIndex(o => o.id === order.id)

    orders[orderIndex] = { ...orders[orderIndex], ...order }

    res.send(orders[orderIndex])
})

// retrieve a biker's orders
router.get('/:bikerId', (req, res) => {
    const { bikerId } = req.params

    let bikerOrders = orders.filter(o => o.assignee && o.assignee.id == bikerId)

    res.send(bikerOrders)
})

// retrieve all orders
router.get('/', (req, res) => {
    res.send(orders)
})

module.exports = router