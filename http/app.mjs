import express from 'express'
import path from 'path'
import morgan from 'morgan'
import mongodb from 'mongodb'
const app = express()

app.set('view engine', 'ejs')
app.listen(3000)

var MongoClient = mongodb.MongoClient;

const username = encodeURIComponent("965664919");
const password = encodeURIComponent("MGDBWang1989");
const cluster = "node.lzn70pv.mongodb.net";
// const authSource = "<authSource>";
// const authMechanism = "<authMechanism>";

var uri = `mongodb+srv://${username}:${password}@node.lzn70pv.mongodb.net/?retryWrites=true&w=majority&appName=node`;
MongoClient.connect(uri, function(err, client) {
    console.log('mongodb')
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});


app.use((res, req, next) => {
    console.log('first middle ware')
    console.log(res.url)
    console.log(res.path)
    console.log(res.hostname)
    next()
})

app.use(morgan())
app.get('/', (req, res) => {
    res.render('home', {
        title: ['title1', 'title2', 'title3']
    })
})

app.get('/about', (req, res) => {
    res.render('about')
})

app.get('/about-me', (req, res) => {
    res.redirect('/about')
})


app.use((req, res) => {
    res.status(404).render('404')
})