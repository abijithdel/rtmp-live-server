const express = require('express')
const router = express.Router()
const { createNewLive } = require('../live/create')
const upload = require('../multer')
const { updateStreamData } = require('../live/update')
const { getAllLives } = require('../live/all_live')
const { getAStreamData } = require('../live/alive')

// create new live stream
router.post('/create', upload.single('thumbnail') , createNewLive)
// update stream status
router.post('/update', updateStreamData)
// get all streams data
router.get('/all', getAllLives)
// get one stream data
router.get('/alive', getAStreamData)

module.exports = router;