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
        var orderTableQuery = "CREATE TABLE IF NOT EXISTS orders (oId VARCHAR(255) PRIMARY KEY,itemCode VARCHAR(255) ,userId VARCHAR(255) , qty INT, price DOUBLE)"
        connection.query(orderTableQuery, function (err, result) {

            if (result.warningCount === 0) {
                console.log("orders table created!");
            }
        })
    }
})

router.get('/', (req, res) => {
    var query = "SELECT * FROM orders";
    connection.query(query, (err, rows) => {
        if (err) console.log(err)
        res.send(rows)
    })
})

router.post('/', (req, res) => {
    const oId = req.body.oId
    const itemCode = req.body.itemCode
    const userId = req.body.userId
    const qty = req.body.qty
    const price = req.body.price

    var query = "INSERT INTO orders (oId, itemCode, userId,qty,price) VALUES (?, ?, ?, ?, ?)";

    connection.query(query, [oId, itemCode, userId,qty,price], (err) => {
        if (err) {
            res.send({ 'message': 'duplicate entry' })
        } else {
            res.send({ 'message': 'order created!' })
        }
    })

})

router.put('/', (req, res) => {
    const oId = req.body.oId
    const itemCode = req.body.itemCode
    const userId = req.body.userId
    const qty = req.body.qty
    const price = req.body.price

    var query = "UPDATE orders SET itemCode=?, userId=?, qty=?, price=? WHERE oId=?";

    connection.query(query, [itemCode, userId,qty,price,oId], (err, rows) => {
        if (err) console.log(err);

        if (rows.affectedRows > 0) {
            res.send({ 'message': 'order updated' })
        } else {
            res.send({ 'message': 'order not found' })
        }
    })
})

router.delete('/', (req, res) => {
    const oId = req.body.oId

    var query = "DELETE FROM orders WHERE oId=?";

    connection.query(query, [oId], (err, rows) => {
        if (err) console.log(err);

        if (rows.affectedRows > 0) {
            res.send({ 'message': 'orders deleted' })
        } else {
            res.send({ 'message': 'orders not found' })
        }
    })
})

router.get('/getOne', (req, res) => {
    const oId = req.body.oId

    var query = "SELECT * from orders WHERE oId=?";

    connection.query(query, [oId], (err, row) => {
        if(err) console.log(err);

        res.send(row)
    })
})


module.exports = router