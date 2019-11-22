const user_data = require('./user_data');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3400;
const fs = require('fs')

app.use(cors());
app.use(bodyParser.json());
const authdat = user_data.authdat;

app.get('/', (req, res) => {
    res.send('Hello world!');
})

app.post('/auth', (req, res) => {
    console.log(req.body.username, req.body.password, authdat[req.body.username])
    if (authdat[req.body.username] == req.body.password) {
        res.send(true);
    } else {
        res.send(false);
    }
})
    
app.get('/read', (req, res) => {
    let dat = JSON.parse(fs.readFileSync('messages.json'))
    res.send(dat) 
})

app.post('/add', (req, res) => {
    let dat = JSON.parse(fs.readFileSync('messages.json'))
    dat.push(req.body)
    fs.writeFileSync('messages.json', JSON.stringify(dat))
    res.send(dat)
})

app.listen(port, () => {
    console.log(`Node server listening on port ${port}...`)
})
