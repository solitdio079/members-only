const pool = require("./pool")

async function findAllMembers(){
    const {rows} = await pool.query(`SELECT * FROM members`)
    return rows
}


async function findByUsername(username){
    const {rows} = await pool.query(`SELECT * FROM members WHERE username = $1`, [username])
    return rows[0]
}

async function findById(id){
    const {rows} = await pool.query(`SELECT * FROM members WHERE id = $1`, [id])
    return rows[0]
}

async function updateMemberStatus(status,id){
    await pool.query(`UPDATE members SET status=$1 WHERE id=$2`,[status,id])
}
async function createMember(full_name, username, pwd){
    await pool.query(`INSERT INTO members (full_name, username, pwd) VALUES ($1,$2,$3)`, [full_name, username, pwd])

}

module.exports = {
    findAllMembers,createMember,findById,findByUsername
}