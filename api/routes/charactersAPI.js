var express = require('express');
var router = express.Router();
//
const { Client } = require("pg")
 
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
    const res = await client.query('SELECT name FROM characters')
//     console.log(res.rows)
    await client.end()
    return res.rows
  } catch (error) {
    console.log(error)
  }
}
// 


router.get('/',async function(req, res) {
    
    res.send(await connectDb());
});

module.exports = router;
