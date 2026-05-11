const passport = require("passport")

const LocalStrategy = require("passport-local")
const bcrypt = require("bcrypt")
const db = require("../db/queries")



passport.use(new LocalStrategy({
    usernameField: "username",
    passwordField: "pwd",
    passReqToCallback: true
}, async (req, username, pwd, done) => {
    try {
        const user = await db.findByUsername(username)
        if(user){
            const result = await bcrypt.compare(pwd,user.pwd)
            if(result){
                return done(null,user)
            }else{
                return done(null,false,{message:"Incorrect Password"})
            }
        }else{
            return done(null,false, {message:"Incorrect Username"})
        }
    } catch (error) {
        return done(error)
    }
}))

passport.serializeUser((user,done) => {
    done(null,user.id)
})

passport.deserializeUser(async (id,done) => {
    try {
        const user = await db.findById(id)
        done(null,user)
    } catch (error) {
        done(error)
    }
})