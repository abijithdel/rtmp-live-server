const pool = require('../dbConfig')
const { getalive } = require('../db/query')

const getAStreamData = async (req, res) => {
    try {
        const { id } = req.query
        const result = await pool.query(getalive,[id])
        res.status(200).json({ data: result.rows[0] })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: error.message })
    }
}

module.exports = { getAStreamData }