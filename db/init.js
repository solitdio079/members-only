const pool = require("./pool")

const schema = `
CREATE TABLE IF NOT EXISTS members (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    full_name TEXT,
    username TEXT UNIQUE,
    pwd TEXT,
    status TEXT DEFAULT 'user',
    "isAdmin" BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title TEXT,
    content TEXT,
    created_at TEXT,
    member_id INTEGER REFERENCES members(id)
);
`

async function initializeDatabase() {
    try {
        await pool.query(schema)
        console.log("Database schema is ready")
    } finally {
        await pool.end()
    }
}

initializeDatabase().catch((error) => {
    console.error("Database initialization failed:", error.message)
    process.exit(1)
})
