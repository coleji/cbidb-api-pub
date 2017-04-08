import express from 'express';
import oracledb from 'oracledb';
import ini from 'ini';
import fs from 'fs';

import getApiValue from './getApiValue';

var app = express();

var dbPool = new function() { this.close = function() {} };
(function() {
	var connectionOptions = ini.parse(fs.readFileSync('./ini/private.ini', 'utf-8')).dbCredentials;
	return new Promise((resolve, reject) => {
		oracledb.createPool(connectionOptions, (err, pool) => {
			if (err) reject(err);
			else resolve(pool);
		});
	}).then(pool => {
		dbPool = pool;
	});
}());


app.use((req, res) => {
	getApiValue(dbPool, req.path, req.query).then(result => {
		res.send(result);
	}, err => {
		console.log("Error getting API: " + err);
		res.send("Error.")
	})
})

app.listen(8080, function() {
	console.log('API Server listening on 8080!');
});


// this function is called when you want the server to die gracefully
// i.e. wait for existing connections
var gracefulShutdown = function() {
	console.log("Received kill signal, shutting down gracefully.");
	dbPool.close(() => {
		console.log("Closed out remaining connections.");
		process.exit();
	});


	// if after
	setTimeout(function() {
		console.error("Could not close connections in time, forcefully shutting down");
		process.exit();
	}, 10*1000);
};

// listen for TERM signal .e.g. kill
process.on ('SIGTERM', gracefulShutdown);

// listen for INT signal e.g. Ctrl-C
process.on ('SIGINT', gracefulShutdown);
