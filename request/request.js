const async = require('async');
const axios = require('axios');
let successCount = 0;
let errorCount = 0;
async function requestToServer(password) {
    try {
        const body = JSON.stringify({
            "password": password
        });
        const url = 'http://localhost:3002/'; // dockerize server
        const config = {
            method: 'post',
            url: url,
            headers: {
                'Content-Type': 'application/json'
            },
            data: body
        };
        const { data } = await axios(config)
        //console.log(data)
        successCount += 1
    } catch (error) {
        errorCount += 1
    }
}

async function runner(numberOfRequest) {
    console.time("test-time");
    let requests = new Array(numberOfRequest) // create 100 request
    // use async module to sending paralle requests
    async.each(requests, async () => {
        await requestToServer('1234567')
    }, () => {
        console.log("-------------------------------")
        console.timeEnd("test-time");
        console.log("-------------------------------")
        console.log('number of sccessful request:', successCount)
        console.log("-------------------------------")
    })
}

runner(1000)