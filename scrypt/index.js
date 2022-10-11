const express = require('express');
const bodyParser = require('body-parser');
const { timingSafeEqual, scryptSync, randomBytes } = require("crypto")
const app = express();
app.use(bodyParser.json());
let oldPassword
app.post('/compare', async (req, res) => {
    const { password } = req.body;
    const [hashedPassword, salt] = oldPassword.split(".");
    const key1 = scryptSync(password, salt, 64);
    let result = (key1.toString("hex") === hashedPassword) ? true : false;
    oldPassword = '';
    res.send({ result: result });
})

app.post('/', async (req, res) => {
    const { password } = req.body;
    const salt = randomBytes(16).toString("hex");
    const key1 = scryptSync(password, salt, 64);
    const hashedPassword = `${key1.toString('hex')}.${salt}`
    oldPassword = hashedPassword;
    // compare(password)
    res.send({ password: hashedPassword })
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