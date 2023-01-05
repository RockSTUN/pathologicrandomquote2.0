var express = require('express');
var router = express.Router();
const { Client } = require('pg')


async function sendData(name,quote){
    name = name.charAt(0).toUpperCase().concat(name.slice(1).toLowerCase());
    quote = quote.split('').map((charact) => (charact == '\'') ? '\'\'' : charact).join('');
    console.log('NAME: ',name, 'QUOTE: ',quote)
    try{
        const client = new Client({
            user: process.env.PGUSER,
            host: process.env.PGHOST,
            database: process.env.PGDATABASE,
            password: process.env.PGPASSWORD,
            port: process.env.PGPORT
        })
    await client.connect();
    //check if the character exists
    let res = await client.query(`SELECT character_id FROM characters WHERE name='${name}';`)
    console.log('THIS: ',res.rows)
    if (res.rows.length == 0){
        //insert into characters table
        let charINSERT = await client.query(`INSERT INTO characters(name) VALUES ('${name}');`)
        console.log(charINSERT)
        //insert quote into quotes table
        res = await client.query(`SELECT character_id FROM characters WHERE name='${name}';`)
        console.log('ALSO THIS: ', res.rows)
    }
    await client.query(`INSERT INTO quotes(quote,character_id) VALUES ('${quote}','${res.rows[0].character_id}')`)
    
    }
    catch(err){
        console.log(err)
    }
}

router.post('/', async function(req,res){
    console.log('BODY: ',req.body);
    sendData(req.body.name,req.body.quote)
    res.send('enviado');
})

module.exports = router;
