const pool = require("./pool")

async function findAllMembers(){
    const {rows} = await pool.query(`SELECT * FROM members`)
    return rows
}

module.exports = {
    findAllMembers
}