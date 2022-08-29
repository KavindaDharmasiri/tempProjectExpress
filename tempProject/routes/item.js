const express = require('express')
const mysql = require('mysql')
const db = require('../configs/db.configs')
const router = express.Router()

const connection = mysql.createConnection(db.database)

connection.connect(function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log('Connected to the MySQL server');
        var itemTableQuery = "CREATE TABLE IF NOT EXISTS items (code VARCHAR(255) PRIMARY KEY, name VARCHAR(255), price DOUBLE)"
        connection.query(itemTableQuery, function (err, result) {

            if (result.warningCount === 0) {
                console.log("item table created!");
            }
        })
    }
})

router.get('/', (req, res) => {
    var query = "SELECT * FROM items";
    connection.query(query, (err, rows) => {
        if (err) console.log(err)
        res.send(rows)
    })
})

router.post('/', (req, res) => {
    const code = req.body.code
    const name = req.body.name
    const price = req.body.price

    var query = "INSERT INTO items (code, name, price) VALUES (?, ?, ?)";

    connection.query(query, [code, name, price], (err) => {
        if (err) {
            res.send({'message': 'duplicate entry'})
        } else {
            res.send({'message': 'item created!'})
        }
    })

})

router.put('/', (req, res) => {
    const code = req.body.code
    const name = req.body.name
    const price = req.body.price

    var query = "UPDATE items SET name=?, price=? WHERE code=?";

    connection.query(query, [name, price, code], (err, rows) => {
        if (err) console.log(err);

        if (rows.affectedRows > 0) {
            res.send({'message': 'item updated'})
        } else {
            res.send({'message': 'item not found'})
        }
    })
})

router.delete('/', (req, res) => {
    const code = req.body.code

    var query = "DELETE FROM items WHERE code=?";

    connection.query(query, [code], (err, rows) => {
        if (err) console.log(err);

        if (rows.affectedRows > 0) {
            res.send({'message': 'item deleted'})
        } else {
            res.send({'message': 'item not found'})
        }
    })
})

router.get('/getOne', (req, res) => {
    const code = req.body.code

    var query = "SELECT * from items WHERE code=?";

    connection.query(query, [code], (err, row) => {
        if (err) console.log(err);

        res.send(row)
    })
})


module.exports = router