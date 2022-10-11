const express = require('express');
const bodyParser = require('body-parser');
const bcryptjs = require('bcryptjs');
const app = express();
app.use(bodyParser.json());

app.post('/', async (req, res) => {
    const { password } = req.body
    // console.log(password);
    const hashedPassword = await bcryptjs.hash(password, 1)
    res.send({ password: hashedPassword })
})



app.listen(3002, () => {
    console.log('Listening on port: 3002')
})