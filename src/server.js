import express from 'express';
import oracledb from 'oracledb';
import ini from 'ini';
import fs from 'fs';

import getApiValue from './getApiValue';
import RequestQueue from './requestQueue';

var app = express();

const getConnection = function() {
	var connectionOptions = ini.parse(fs.readFileSync('./ini/private.ini', 'utf-8')).dbCredentials;
	return new Promise((resolve, reject) => {
		oracledb.getConnection(connectionOptions, (err, c) => {
			if (err) reject(err);
			else resolve(c);
		});
	});
};

const processRequest = (req, res) => {
	var conn;
	return getConnection().then(c => {
		console.log("opened a connection")
		conn = c;
	}).then(() => {
		return getApiValue(conn, req.path, req.query);
	}).then(result => {
		console.log("got a result")
		res.send({ data: result});
	}, err => {
		console.log("Error getting API: " + err);
		res.send("Error.")
	}).then(() => {
		conn.close(err => {
			if (err) console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!   Error closing connection: " + err)
			else console.log("Closed connection.")
		})
	});
};

var requestQueue = new RequestQueue(processRequest);

app.use(requestQueue.queue);

app.listen(8081, function() {
	console.log('API Server listening on 8081!');
});
