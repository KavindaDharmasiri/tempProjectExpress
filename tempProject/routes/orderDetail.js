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
        var oDetailTableQuery = "CREATE TABLE IF NOT EXISTS orderDetails (oId VARCHAR(255) PRIMARY KEY,itemCode VARCHAR(255) ,userId VARCHAR(255) , qty INT, price DOUBLE)"
        connection.query(oDetailTableQuery, function (err, result) {

            if (result.warningCount === 0) {
                console.log("orderDetails table created!");
            }
        })
    }
})

router.get('/', (req, res) => {
    var query = "SELECT * FROM orderDetails";
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

    var query = "INSERT INTO orderDetails (oId, itemCode, userId,qty,price) VALUES (?, ?, ?, ?, ?)";

    connection.query(query, [oId, itemCode, userId, qty, price], (err) => {
        if (err) {
            res.send({'message': 'duplicate entry'})
        } else {
            res.send({'message': 'order created!'})
        }
    })

})


router.put('/', (req, res) => {
    const oId = req.body.oId
    const itemCode = req.body.itemCode
    const userId = req.body.userId
    const qty = req.body.qty
    const price = req.body.price

    var query = "UPDATE orderDetails SET itemCode=?, userId=?, qty=?, price=? WHERE oId=?";

    connection.query(query, [itemCode, userId, qty, price, oId], (err) => {
        if (err) {
            res.send({'message': 'duplicate entry'})
        } else {
            res.send({'message': 'order updated!'})
        }
    })

})

router.delete('/', (req, res) => {
    const oId = req.body.oId

    var query = "DELETE FROM orderDetails WHERE oId=?";

    connection.query(query, [oId], (err, rows) => {
        if (err) console.log(err);

        if (rows.affectedRows > 0) {
            res.send({'message': 'orderDetail deleted'})
        } else {
            res.send({'message': 'orderDetail not found'})
        }
    })
})

router.get('/getOne', (req, res) => {
    const oId = req.body.oId

    var query = "SELECT * from orderDetails WHERE oId=?";

    connection.query(query, [oId], (err, row) => {
        if (err) console.log(err);

        res.send(row)
    })
})


module.exports = router