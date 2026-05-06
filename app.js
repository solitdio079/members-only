const express = require("express")
const path = require("path")

const indexRouter = require("./routes/index")
const signupRouter = require("./routes/signup")
require("dotenv").config()

const app = express()

app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,"public")))
app.set("view engine", "ejs")
app.set("views", path.join(__dirname,"views"))

app.use("/",indexRouter)
app.use("/signup", signupRouter)



app.use((err,req,res,next) => {
    if(err){
        res.status(500).send(err.message)
    }
    
})

const PORT = process.env.PORT
app.listen(PORT,() => {
    console.log(`server listening on port: ${PORT}`)
})