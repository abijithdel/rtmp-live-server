const pool = require('../dbConfig')
const { updateLiveData, getAStream, updateKeyStatus } = require('../db/query')

const updateStreamData = async (req, res) => {
    try {
        const { id, status } = req.body;
        if( status === 'pending'){
            const livedata = await pool.query(getAStream,[id])
            await pool.query(updateKeyStatus,['inactive', livedata.rows[0].streamkey])
        }
        if( status === 'schedule'){
            const livedata = await pool.query(getAStream,[id])
            await pool.query(updateKeyStatus,['active', livedata.rows[0].streamkey])
        }
        const result = await pool.query(updateLiveData,[status, id])
        res.status(200).json({ message:'Updated Row', data: result.rows[0]})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: error.message })
    }
}

module.exports = { updateStreamData }