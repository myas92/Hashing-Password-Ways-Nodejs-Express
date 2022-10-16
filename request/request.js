const async = require('async');
const axios = require('axios');

let successCount = 0;
let errorCount = 0;
async function requestToServer(password) {
    try {
        const body = JSON.stringify({
            "password": password
        });
        const url = 'http://localhost:3002/hashing';
        const config = {
            method: 'post',
            url: url,
            headers: {
                'Content-Type': 'application/json'
            },
            data: body
        };
        const { data } = await axios(config)
        successCount += 1
    } catch (error) {
        errorCount += 1
    }
}

async function runner(numberOfRequest) {
    console.time("test-time");
    let requests = new Array(numberOfRequest) // create 1000 request
    // use async module to sending paralle requests
    async.each(requests, async () => {
        await requestToServer('12345678')
    }, () => {
        console.log("-------------------------------")
        console.timeEnd("test-time");
        console.log("-------------------------------")
        console.log('Number of sccessful requests:', successCount)
        console.log("-------------------------------")
    })
}

runner(1000)