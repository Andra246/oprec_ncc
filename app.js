const http = require('http');

const PORT = process.env.PORT || 3000;

const server = http.createServer((req,res) =>{

	if (req.url === '/health'){
		res.writeHead(200, { 'Content-Type': 'application/json' });
		res.end(JSON.stringify({status: 'OK'}));
	}
	else {
		res.writeHead(404);
		res.end('Not Found')
	}
});

server.listen(PORT, () => {
	console.log(`port ${PORT}`)
});
