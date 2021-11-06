const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

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

	axios.get('https://api.publicapis.org/entries')
  .then(response => {
    
    data={};
    data=response;
    return res.send(response.data);
  })
  .catch(error => {
    console.log(error);
  });

});


app.listen(PORT, (error) => {
    if(error)
        console.log("Error in starting server: ", error);
    else
        console.log("Server listening on PORT: " + PORT);
});


app.post('/', async (req, res) => {

	async function isOverLimit(ip) {

		let res
		try {
			res = await client.incr(ip)
			  } catch (err) {
			  	console.error('isOverLimit: could not increment key')
			  	 throw err
			  	}
			  	 console.log(`${ip} has value: ${res}`)
			  	 if (res > 10) {
			  	 	 return true
			  	 	}
			  	client.expire(ip, 10)

	}

	let overLimit = await isOverLimit(req.ip)
	 if (overLimit) {
	 	res.status(429).send('Too many requests - try again later');
	 	return;
	 }
	 res.send("Accessed the precious resources!");
	});





