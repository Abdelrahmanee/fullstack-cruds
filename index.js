
import express from 'express'
import mysql from 'mysql2'
import cors from 'cors'
const app = express()
const port =  process.env.PORT||3000
app.use(express.json())
app.use(cors())

const dbConfig = mysql.createConnection('mysql://uwkmiudoopuxp9mi:rYk0AhRaughJUsdpmKWC@bzl2z2eedkgqsllb3fxa-mysql.services.clever-cloud.com:3306/bzl2z2eedkgqsllb3fxa')


app.post('/products', (req, res, next) => {
    const { name, price, description } = req.body;
    dbConfig.execute(`insert into products (name , price , description) values('${name}' ,${price} ,'${description}' )`)

    res.json({ message: "Product added successfully" })
})

app.get('/products', (req, res, next) => {

    dbConfig.execute(`select * from products`, (err, data) => {
        if (err)
            res.json(err)
        res.json(data)
    })
})
app.get('/product/:id', (req, res, next) => {
    const { id } = req.params
    dbConfig.execute(`select * from products where id=${id}`, (err, data) => {
        if (err)
            res.json(err)
        res.json(data)
    })
})

app.put('/products/:id', (req, res, next) => {
    const { name, price, description } = req.body;
    const { id } = req.params;
    dbConfig.execute(`update products set name = '${name}' , price = '${price}' , description ='${description}'  where id = '${id}'`, (err, data) => {
        if (err)
            res.json(err)
    })
    res.json({ message: "Product is Updated" })
})
app.delete('/products/:id', (req, res, next) => {
    const { id } = req.params
    dbConfig.execute(`delete from products where id=${id}`, (err, data) => {
        if (data && data.affectedRows === 0)
            res.json({ message: "Product is not found" })
        else if (err)
            res.json(err)
        res.json({ message: "Product is deleted" })
    })
})

app.get('/products/search-by-name/:key', (req, res, next) => {
    const { key } = req.params
    console.log(key);
    dbConfig.execute(`select * from products where name like '%${key}%'`, (err, data) => {
        if (err)
            res.json(err)
        res.json(data)
    })

})

app.get('/products/search-by-price/:price', (req, res) => {
    const { price } = req.params;
    dbConfig.execute(`SELECT * FROM products WHERE price >= ${mysql.escape(price)}`, (err, data) => {
        if (err)
            res.json(err)
        res.json(data)
    })



});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
})
