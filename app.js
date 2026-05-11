const express = require("express")
const path = require("path")
const session = require("express-session")
const indexRouter = require("./routes/index")
const authRouter = require("./routes/auth")
const passport = require("passport")
const pgPool = require("./db/pool")
require("dotenv").config()

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "public")))

app.use(session({
    secret: process.env.SECRET || "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
    store: new (require("connect-pg-simple")(session))({
       pool : pgPool,                // Connection pool
       tableName : 'members_session'  
    })
}))

app.use(passport.session())

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

app.use("/", indexRouter)
app.use("/auth", authRouter)



app.use((err, req, res, next) => {
    if (err) {
        res.status(500).send(err.message)
    }

})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`server listening on port: ${PORT}`)
})