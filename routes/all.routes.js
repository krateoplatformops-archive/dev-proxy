const express = require('express')
const router = express.Router()

const allController = require('../controllers/all.controller')

router.use('/*', allController)

module.exports = router
