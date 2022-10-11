const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const app = express();
app.use(bodyParser.json());

app.post('/', async (req, res) => {
    const { password } = req.body;
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    console.log(salt)
    // console.log(password);
    const hashedPassword = await bcrypt.hash(password, 2)
    res.send({ password: hashedPassword })
})



app.listen(3002, () => {
    console.log('Listening on port: 3002')
})