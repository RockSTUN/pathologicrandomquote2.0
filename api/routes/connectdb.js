const { Client } = require("pg")
const dotenv = require("dotenv")
dotenv.config()
 
const connectDb = async () => {
  try {
    const client = new Client({
      user: process.env.PGUSER,
      host: process.env.PGHOST,
      database: process.env.PGDATABASE,
      password: process.env.PGPASSWORD,
      port: process.env.PGPORT
    })
 
    await client.connect()
    const res = await client.query('SELECT * FROM characters')
    console.log(res.rows[Math.floor(Math.random()*res.rows.length)])
    await client.end()
  } catch (error) {
    console.log(error)
  }
}
 connectDb()
