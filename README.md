# Growlance




This app is used to limit the number of requests to the server to 20 requests per minute.







## Tech

Techstack used here are NodeJs, ExpressJs and Reddis.


## Installation

It requires [Node.js](https://nodejs.org/) v14+ to run.

Install the reddis server.

Add the environment variables.
```sh
SERVER_PORT
REDIS_PORT
REDIS_HOST
FREE_API_URL= ""

```
Install the dependencies and devDependencies and start the server.

```sh
cd growlance
npm install
node index.js
```
## API LIST
{{url}}/ - Home Page
{{url}}/getData- Displays the requested data

## Production
This app has been hosted at http://65.0.179.117/ 
http://65.0.179.117/  Displays the home API.
http://65.0.179.117/getData  Displays the required data where we can make 20 requests per minute.





