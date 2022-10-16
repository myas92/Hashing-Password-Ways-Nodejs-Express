const express = require('express');
const bodyParser = require('body-parser');
const bcryptjs = require('bcryptjs');
const app = express();
app.use(bodyParser.json());

app.post('/hashing', async (req, res) => {
    const { password } = req.body
    const saltRounds = 10;
    const salt = bcryptjs.genSaltSync(saltRounds);
    const hashedPassword = await bcryptjs.hash(password, salt);
    res.send({ message: 'Done' })
})

app.listen(3002, () => {
    console.log('Listening on port: 3002')
})