const express = require('express')

const user = require('./routes/user')
const item = require('./routes/item')
const order = require('./routes/order')
const orderDetail = require('./routes/orderDetail')

const app = express()
const port = 4000

app.use(express.json())


app.use('/users', user)
app.use('/items', item)
app.use('/orders', order)
app.use('/orderDetails', orderDetail)

app.listen(port, () => {
    console.log(`app starting on ${port}`);
})