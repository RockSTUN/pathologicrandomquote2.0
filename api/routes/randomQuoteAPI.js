var express = require('express');
var router = express.Router();
const { Client } = require("pg")
 
const sendQuote = async () => {
  try {
    const client = new Client({
        user: process.env.PGUSER,
        host: process.env.PGHOST,
        database: process.env.PGDATABASE,
        password: process.env.PGPASSWORD,
        port: process.env.PGPORT
    })
 
    await client.connect()
    const res = await client.query('SELECT name,quote FROM quotes FULL JOIN characters ON quotes.character_id=characters.character_id')
//     console.log(res.rows[Math.floor(Math.random()*res.rows.length)])
    await client.end()
    return res.rows[Math.floor(Math.random()*res.rows.length)]
  } catch (error) {
    console.log(error)
  }
}
// 
router.get('/',async function(req, res) {
    
    res.send(await sendQuote());
});

module.exports = router;
