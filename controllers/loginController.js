const db = require("../db/queries")
const { checkPassword, genPassword } = require("../utils/password")
const { body, validationResult, matchedData } = require("express-validator")


const getLoginForm = (req, res) => {
    return res.render("login")
}

function logout (req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  })
}
module.exports = {
    getLoginForm,logout
}