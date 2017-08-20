import express from 'express';

import getApiValue from './getApiValue';

var app = express();

app.use((req, res) => {
	getApiValue(req.path, req.query).then(result => {
		res.set("access-control-allow-origin", "*");
		res.send({data: result});
	}, err => {
		console.log("Error getting API: " + err);
		res.send("Error.")
	});
});

app.listen(8081, function() {
	console.log('API Server listening on 8081!');
});
