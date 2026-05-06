
const db = require("../db/queries")
const { checkPassword, genPassword } = require("../utils/password")
const { body, validationResult, matchedData } = require("express-validator")

const userValidator = [body("username").notEmpty().withMessage("Username cannot be empty"),
body("pwd").isStrongPassword(),
body('confirmPwd').custom((value, { req }) => value === req.body.pwd).withMessage("Passwords do not match"),
body('full_name').matches(/^[A-Za-z]+(?: [A-Za-z]+)*$/).withMessage("Invalid Full Name")]

const getCreateForm = (req, res) => {
    return res.render("signup")
}
const createMember = [...userValidator, async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    } else {
        const { full_name, username, pwd } = matchedData(req)
        const hashedPassword = await genPassword(pwd)
        await db.createMember(full_name, username, hashedPassword)
        return res.redirect("/")
    }
}]
module.exports = {
    getCreateForm,
    createMember
}