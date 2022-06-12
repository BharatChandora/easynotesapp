const dotenv = require('dotenv')
dotenv.config()

const express = require('express')
const bodyparser = require('body-parser')
const cors = require('cors')

const db = require('./db')
const authRouter = require('./Routes/auth')
const noteRouter = require('./Routes/notes')


const app = express()
app.use(cors())
app.use(cors({
    origin: '*'
}));

const port =  process.env.PORT || 3000
app.use(bodyparser.json())

app.use('/auth', authRouter)
app.use('/note', noteRouter)


app.get('/test', (req, res) => {
    res.json({"status":"working"}).status(200)

})

console.log(process.env.NODE_ENV)
console.log(__dirname)
if (process.env.NODE_ENV == 'production') {

    app.use(express.static(__dirname+'/clientapp/dist/clientapp'));
    app.get("/*", (req, res) => {
        res.sendFile(__dirname+'/clientapp/dist/clientapp/index.html')
    })
}



app.listen(port, () => {
    console.log(`App listen to ${port}`)
})



