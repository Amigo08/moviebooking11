const mongoose = require('mongoose')

const scheduleSchema = mongoose.Schema({
    movie: {
        type: mongoose.Types.ObjectId,
        ref: "Movie"
    },
    dateandtime: {
        type: Date
    },
    seat: [
        {
            user: {
                type: mongoose.Types.ObjectId,
                ref: 'User'
            },
            movie: {
                type: mongoose.Types.ObjectId,
                ref: "Movie"
            }   
        }
    ]
},
    { timestamp: true })

const Schedule = mongoose.model('Schedule', scheduleSchema)

module.exports = Schedule