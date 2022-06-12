const Router = require('router')
const NoteController = require('../Controllers/noteController')
const { body } = require('express-validator')
const IsAuthenticated = require('../Middlewares/authMiddleware')
const Note = require('../Models/Note')


const router = Router()



// get all notes
router.get('/', IsAuthenticated, NoteController().getNotes)

router.post('/addnote', 
[
    body('title').isLength({min:1}),
    body('note').isLength({min:1})
],
IsAuthenticated, NoteController().addNote)

router.put('/updatenote/:id', 
[
    body('title').isLength({min:1}),
    body('note').isLength({min:1})
],
IsAuthenticated, NoteController().updateNote)

router.delete('/deletenote/:id', IsAuthenticated, NoteController().deleteNote)

router.get('/searchnotes/', IsAuthenticated, NoteController().searchnotes)



















module.exports = router