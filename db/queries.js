const pool = require("./pool")

async function findAllMembers(){
    const {rows} = await pool.query(`SELECT * FROM members`)
    return rows
}


async function findByUsername(username){
    const {rows} = await pool.query(`SELECT * FROM members WHERE username = $1`, [username])
    return rows[0]
}
async function updateMemberStatus(status,id){
    await pool.query(`UPDATE members SET status=$1 WHERE id=$2`, [status,id])
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


// POST QUERİES 

async function createPost(title, content, created_at, member_id){
    await pool.query(`INSERT INTO posts (title,content,created_at,member_id) VALUES ($1,$2,$3,$4)`, [title,content,created_at,member_id])
}

async function getPosts(){
    const {rows} = await pool.query(`SELECT id,title,content FROM posts ORDER BY id DESC`)
    return rows
}

async function getPostsForMembers(){
    const {rows} = await pool.query(`SELECT posts.id,title,content,created_at,full_name FROM posts JOIN members ON members.id = posts.member_id`)
    return rows
}

async function deletePost(id){
    await pool.query(`DELETE FROM posts WHERE id=$1`,[id])
}
module.exports = {
    findAllMembers,createMember,findById,findByUsername, updateMemberStatus,
    createPost,getPosts, getPostsForMembers, deletePost
}