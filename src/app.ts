import express from "express"
import routes from "./routes"
import dotenv from 'dotenv'
import connect from "./utils/db-connect"

const app = express()
dotenv.config()


//setting up parsers
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//setting up ejs views
app.use(express.static('./src/public'))
app.set('view engine', 'ejs')
app.set('views', './src/views')

const PORT = process.env.PORT || 8080

app.listen(PORT, async ()=>{
    console.log(`server is listening on port ${PORT}`)
    await connect()
    routes(app)
})