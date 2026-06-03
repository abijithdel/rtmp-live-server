const express = require('express')
const router = express.Router()
const { createNewLive } = require('../live/create')
const upload = require('../multer')
const { updateStreamData } = require('../live/update')

// create new live stream
router.post('/create', upload.single('thumbnail') , createNewLive)
router.post('/update', updateStreamData)

module.exports = router;