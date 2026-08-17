const express = require("express")
const path = require("path")
const session = require("express-session")
const indexRouter = require("./routes/index")
const authRouter = require("./routes/auth")
const messageRouter = require("./routes/messages")
const passport = require("passport")
const pgPool = require("./db/pool")
const { getConfiguredPasscodes } = require("./utils/passcodes")
require("dotenv").config()

const app = express()

const PORT = Number(process.env.PORT) || 3000
const HOST = process.env.HOST || "0.0.0.0"

if (!process.env.SECRET || process.env.SECRET.length < 32) {
    throw new Error("SECRET must be set to a random value of at least 32 characters")
}

const { memberPasscode, adminPasscode } = getConfiguredPasscodes()

if (!memberPasscode) {
    throw new Error("PASSCODE must be set as a runtime environment variable")
}
if (!adminPasscode) {
    throw new Error("ADMIN_PASSCODE must be set as a runtime environment variable")
}

console.log("Passcode configuration loaded:", {
    PASSCODE: { present: true, normalizedLength: memberPasscode.length },
    ADMIN_PASSCODE: { present: true, normalizedLength: adminPasscode.length }
})

app.set("trust proxy", 1)

app.get("/health", (_req, res) => {
    res.status(200).json({ status: "ok" })
})

app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "public")))

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production"
    },
    store: new (require("connect-pg-simple")(session))({
       pool : pgPool,                // Connection pool
       tableName : 'members_session',
       createTableIfMissing: true
    })
}))

app.use(passport.session())

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

app.use("/", indexRouter)
app.use("/auth", authRouter)
app.use("/message", messageRouter)



app.use((err, req, res, next) => {
    if (err) {
        res.status(500).send(err.message)
    }

})

app.listen(PORT, HOST, () => {
    console.log(`server listening on ${HOST}:${PORT}`)
})
