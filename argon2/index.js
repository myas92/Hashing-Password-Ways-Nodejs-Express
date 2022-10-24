const express = require('express');
const bodyParser = require('body-parser');
const argon2 = require('argon2');
const app = express();
app.use(bodyParser.json());

app.post('/hashing', async (req, res) => {
    const { password } = req.body;
    let hashedPassword = await argon2.hash(password);
    res.send({ password: hashedPassword })
})

app.listen(3002, () => {
    console.log('Listening on port: 3002')
})