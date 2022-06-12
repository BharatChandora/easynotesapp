const mongoose = require('mongoose')


const NoteSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    note:{
        type: String,
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        require: true
    },
    created_at: {
        type: Date
    }
})

const Note = mongoose.model('Note', NoteSchema)

module.exports = Note
