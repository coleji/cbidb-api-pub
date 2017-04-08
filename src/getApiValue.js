import getQueryable from './api';

var openConnections = 0;

export default function(dbPool, api, query) {
	var conn;
	return getQueryable(api, query).then(queryable => {
		return new Promise((resolve, reject) => {
			dbPool.getConnection((err, c) => {
				if (err) reject(err);
				else {
					console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<   Opened connection #" + ++openConnections);
					conn = c;
					resolve(queryable);
				}
			});
		});
	}).then(queryable => {
		return new Promise((resolve, reject) => {
			console.log(queryable)
			conn.execute(queryable.query, (queryable.substitutions || {}), (err, results) => {
				if (err) reject(err);
				else resolve(results);
			});
		})
	}).catch(err => {
		console.log(err);
	}).then(result => {
		console.log(result)
		if (conn && conn.close) {
			console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>   Closing connection #" + openConnections--);
			conn.close();
		}
		return Promise.resolve(result);
	}).catch(err => {
		console.log("Error closing connection: " + err);
		return Promise.reject(err);
	})
}
