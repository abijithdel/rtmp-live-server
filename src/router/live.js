const express = require('express')
const router = express.Router()
const { createNewLive } = require('../live/create')
const upload = require('../multer')

// create new live stream
router.post('/create', upload.single('thumbnail') , createNewLive)

module.exports = router;