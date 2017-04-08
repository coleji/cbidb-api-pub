import getQueryable from './api';

export default function(conn, api, query) {
	return getQueryable(api, query).then(queryable => {
		return new Promise((resolve, reject) => {
			console.log(queryable)
			conn.execute(queryable.query, /*(queryable.substitutions || {}),*/ (err, results) => {
				if (err) reject(err);
				else resolve(results);
			});
		})
	}).catch(err => {
		console.log(err);
		return Promise.resolve();
	})/*.then(result => {
		console.log(result)
		if (conn && conn.close) {
			conn.close(err => {
				if (err) console.log("!!!!!!!!!!!!! ERROR CLOSING CONNECTION: " + err);
				console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>   Closed connection #" + openConnections--);
			});
		}
		return Promise.resolve(result);
	}).catch(err => {
		console.log("Error closing connection: " + err);
		return Promise.reject(err);
	})*/
}
