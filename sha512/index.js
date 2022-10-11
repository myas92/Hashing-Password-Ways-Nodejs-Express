const express = require('express');
const bodyParser = require('body-parser');
const { createHmac, randomBytes } = require("crypto")
const app = express();
app.use(bodyParser.json());
let oldPassword
app.post('/', async (req, res) => {
    const { password } = req.body;
    const salt = randomBytes(16).toString("hex");
    const hash = createHmac('sha512', salt)
        .update(password)
        .digest('hex');
    res.send({ result: hash });
})


app.listen(3002, () => {
    console.log('Listening on port: 3002')
})