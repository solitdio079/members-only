const bcrypt = require("bcrypt")

async function genPassword(pwdString){
    const saltRounds = 10;
    const bcrypt = require("bcrypt")
    const hashedPassword = await bcrypt.hash(pwdString,saltRounds)

    return hashedPassword
}

async function checkPassword(pwdString,hashedPassword){
    const result = await bcrypt.compare(pwdString,hashedPassword)
    return result
}
module.exports = {
    genPassword,
    checkPassword
}