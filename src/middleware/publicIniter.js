const fs = require('fs')
const path = require('path')

// creating \public\uploads\images\ Folder. if Not Exist
const InintPublicDIR = async () => {
    const dir = path.join(__dirname,'../../public/uploads/images')
    
    if(!fs.existsSync(dir)){
        try {
            fs.mkdirSync(dir, { recursive:true })
        } catch (error) {
            console.log('Path Creating Error. path =>  /public/uploads/images')
            console.log(error)
        }
    }
}

module.exports = { InintPublicDIR }