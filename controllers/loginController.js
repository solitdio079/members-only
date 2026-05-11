const db = require("../db/queries")
const { checkPassword, genPassword } = require("../utils/password")
const { body, validationResult, matchedData } = require("express-validator")


const getLoginForm = (req, res) => {
    return res.render("login")
}

module.exports = {
    getLoginForm
}