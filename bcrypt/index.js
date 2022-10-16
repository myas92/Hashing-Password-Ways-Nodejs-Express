const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const app = express();
app.use(bodyParser.json());

app.post('/hashing', async (req, res) => {
    const { password } = req.body;
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    res.send({ password: 'Done' })
})

app.listen(3002, () => {
    console.log('Listening on port: 3002')
})