
const db = require("../db/queries")
const { genPassword } = require("../utils/password")
const { body, validationResult, matchedData } = require("express-validator")

const userValidator = [
    body("username")
        .trim()
        .notEmpty().withMessage("Enter a username."),
    body("pwd")
        .isStrongPassword({
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1
        })
        .withMessage("Use at least 8 characters, including uppercase, lowercase, a number, and a symbol."),
    body("confirmPwd")
        .custom((value, { req }) => value === req.body.pwd)
        .withMessage("The passwords do not match."),
    body("full_name")
        .trim()
        .notEmpty().withMessage("Enter your full name.")
        .matches(/^[A-Za-z]+(?:[ '-][A-Za-z]+)*$/)
        .withMessage("Use letters, spaces, apostrophes, or hyphens for your full name.")
]

function renderSignup(res, { errors = {}, values = {} } = {}, status = 200) {
    return res.status(status).render("signup", { errors, values })
}

const getCreateForm = (req, res) => {
    return renderSignup(res)
}

const createMember = [...userValidator, async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const fieldErrors = Object.fromEntries(
            Object.entries(errors.mapped()).map(([field, error]) => [field, error.msg])
        )

        return renderSignup(res, {
            errors: fieldErrors,
            values: {
                full_name: req.body.full_name || "",
                username: req.body.username || ""
            }
        }, 400)
    }

    try {
        const { full_name, username, pwd } = matchedData(req)
        const hashedPassword = await genPassword(pwd)
        await db.createMember(full_name, username, hashedPassword)
        return res.redirect("/")
    } catch (error) {
        if (error.code === "23505") {
            return renderSignup(res, {
                errors: { username: "That username is already registered." },
                values: { full_name: req.body.full_name, username: req.body.username }
            }, 409)
        }

        throw error
    }
}]
module.exports = {
    getCreateForm,
    createMember
}
