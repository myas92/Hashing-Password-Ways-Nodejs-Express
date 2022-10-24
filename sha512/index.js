const express = require('express');
const bodyParser = require('body-parser');
const { createHmac, randomBytes } = require("crypto");
const app = express();
app.use(bodyParser.json());


app.post('/hashing', (req, res) => {
    try {
        const { password } = req.body;
        const salt = randomBytes(16).toString("hex");
        const hashedPassword = createHmac('sha512', salt).update(password).digest('hex');
        res.send({ message: 'Done' })
    } catch (error) {
        console.log(error)
    }

})

app.listen(3002, () => {
    console.log('Listening on port: 3002')
})