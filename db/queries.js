const pool = require("./pool")

async function findAllMembers(){
    const {rows} = await pool.query(`SELECT * FROM members`)
    return rows
}

async function createMember(full_name, username, pwd){
    await pool.query(`INSERT INTO members (full_name, username, pwd) VALUES ($1,$2,$3)`, [full_name, username, pwd])

}

module.exports = {
    findAllMembers,createMember
}