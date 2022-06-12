const mongoose = require("mongoose")
const { validationResult } = require('express-validator')

const Note = require("../Models/Note")
const User = require("../Models/User")




function noteContoller() {
    return {
        getNotes: async (req, res) => {
            
            id = mongoose.mongo.ObjectId(req.locals.id)

            const notes = await Note.find({'created_by':id}).sort({'created_at':-1 })
            

            res.status(200).json(notes)
            
            
        },
        addNote: async (req, res) => {

            const errors = validationResult(req);
            
            if (!errors.isEmpty()) {
                console.log(errors)
                return res.status(400).json({ errors: errors.array() });
            }

            id = mongoose.mongo.ObjectId(req.locals.id)
            const user  = await User.findOne({'_id':id})

            if (!user) {
                
                return res.status(400).json({"error":"Invalid user"})
            }
            

            const note = new Note({
                title: req.body.title,
                note: req.body.note,
                created_by: id,
                created_at: Date.now()

            }) 

            Note.create(note, (err, doc) => {
                if(err) {
                    return res.status(500).json({"error":"Internal server error"})
                }

                return res.status(200).json(doc)
            })
            
        },
        updateNote:  (req, res) => {

            const errors = validationResult(req);
            
            if (!errors.isEmpty()) {
                console.log(errors)
                return res.status(400).json({ errors: errors.array() });
            }


            id = req.params.id

            const updatedNote = {
                title: req.body.title,
                note: req.body.note
            }

            
            const note = Note.findByIdAndUpdate(id, {$set: updatedNote},  {new: true}, (err, note) => {

                if(err) {
                    return res.status(500).json({"error":"Internal server error"})
                }
                
                return res.status(200).json(note)
            })

        },
        deleteNote: (req, res) => {

            id = req.params.id
            
            const note = Note.findByIdAndDelete(id, (err, note) => {

                if(err) {
                    return res.status(500).json({"error":"Internal server error"})
                }
                
                return res.status(200).json({"msg":"note deleted"})
            })
        },
        searchnotes: async (req, res) => {

            toSearch = req.query['q']

            id = mongoose.mongo.ObjectId(req.locals.id)

            const notes = await Note.find({'created_by':id, $or:[{ 'title':new RegExp(toSearch, 'i')}, {'note':new RegExp(toSearch, 'i')}]}).sort({'created_at':-1 })

            if(!notes) {
                console.log("error")
                res.json("some error occured")
            }
           

            res.json(notes)
        }

    }
}


module.exports =  noteContoller