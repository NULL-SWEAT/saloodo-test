const express = require('express')
const router = express.Router()

const users = require('../data/users')

router.post('/', (req, res) => {
    const { name, password } = req.body

    let authUser = users.find(user =>
        user.name === name && user.password === password
    )

    if(authUser) {
        // clone authUser removing the password
        const userInfo = (({ password, ...info }) => ({ ...info }))(authUser)
        res.send(userInfo)
    } else {
        res.sendStatus(403)
    }
})

module.exports = router