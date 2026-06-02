const mongoose = require('mongoose')


mongoose.connect('mongodb+srv://db_user:Tx5M8TmJ2IvtaOwE@cluster0.bjepc.mongodb.net/live?appName=Cluster0')
.then(() => console.log('DB Connect'))
.catch((er) => console.log(er.message))