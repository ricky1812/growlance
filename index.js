const express = require('express');
const app = express();

const dotenv = require('dotenv');
dotenv.config();

console.log(process.env.SERVER_PORT);
const PORT = process.env.SERVER_PORT || 3000;

const axios = require('axios');

const redis = require('ioredis')
const client = redis.createClient({
	port: process.env.REDIS_PORT || 6379,
	host: process.env.REDIS_HOST || 'localhost',
})
client.on('connect', function () {
	 console.log('connected');
	})


app.get('/', (req, res) => {

	return res.send("This is the home API")

});


app.listen(PORT, (error) => {
    if(error)
        console.log("Error in starting server: ", error);
    else
        console.log("Server listening on PORT: " + PORT);
});


app.get('/getData', async (req, res) => {

	async function isOverLimit(ip) {

		let res
		try {
			res = await client.incr(ip)
			  } catch (err) {
			  	console.error('could not increment key')
			  	 throw err
			  	}
			  	 console.log(`${ip} has value: ${res}`)
			  	 if (res > 20) {
			  	 	 return true
			  	 	}
			  	client.expire(ip, 60);

	}

	let overLimit = await isOverLimit(req.ip)
	 if (overLimit) {
	 	res.status(429).send('Too many requests have been sent- try again later');
	 	return;
	 }
	 axios.get(process.env.FREE_API_URL)
  .then(response => {
    
    data={};
    data=response;
    return res.send(response.data);
  })
  .catch(error => {
    console.log(error);
  });
	
	});





