const express = require("express")
const path = require("path")
require("dotenv").config()

const app = express()

app.set("view engine", "ejs")
app.set("views", path.join(__dirname,"views"))

const PORT = process.env.PORT
app.listen(PORT,() => {
    console.log(`server listening on port: ${PORT}`)
})