const express = require('express');
const bodyParser = require('body-parser');
const { scryptSync, randomBytes } = require("crypto")
const app = express();
app.use(bodyParser.json());

app.post('/hashing', async (req, res) => {
    const { password } = req.body;
    const salt = randomBytes(16).toString("hex");
    const hash = scryptSync(password, salt, 64);
    const hashedPassword = `${hash.toString('hex')}.${salt}`;
    res.send({ message: 'Done' });
})


app.post('/compare', async (req, res) => {
    oldPassword = '';
    res.send({ result: result });
})

function compare(password) {
    const [hashedPassword, salt] = oldPassword.split(".");
    const key1 = scryptSync(password, salt, 64);
    let result = (key1.toString("hex") === hashedPassword) ? true : false;
    oldPassword = '';
    return result
}

app.listen(3002, () => {
    console.log('Listening on port: 3002')
})