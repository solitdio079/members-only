const {Client} = require("pg")

const SQL = `
CREATE TABLE IF NOT EXISTS members (
 id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
 full_name TEXT,
 username TEXT,
 pwd TEXT,
 status TEXT DEFAULT 'user',
 isAdmin BOOLEAN NOT NULL DEFAULT FALSE
);


CREATE TABLE IF NOT EXISTS posts (
 id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
 title TEXT,
 content TEXT,
 created_at TEXT,
 member_id INTEGER REFERENCES members(id)
);

INSERT INTO members (full_name,username,pwd) VALUES ('Djoko Keita', 'solitdio079@gmail.com','Jok3r');

INSERT INTO posts (title,content,created_at,member_id) VALUES ('Test Post #1', 'The content is not for children and everyone should be careful what they wish for.','03/04/2026',1);

`


async function main(){
    console.log("seeding...")
    const client = new Client({
        connectionString: "postgresql://postgres:JSGhqi8jBqubHG-@db.snogtuetsolyxwpqqsmb.supabase.co:5432/postgres"
    })
    await client.connect()
    await client.query(SQL)
    await client.end()
    console.log("done")

}
main()