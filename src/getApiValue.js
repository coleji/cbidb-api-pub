import getQueryable from './api';

export default function(conn, api, query) {
	return getQueryable(api, query).then(queryable => {
		return new Promise((resolve, reject) => {
			console.log(queryable)

			conn.execute(queryable.query, (queryable.substitutions || {}), (err, results) => {
				if (err) reject(err);
				else resolve(results);
			});
		})
	}).catch(err => {
		console.log(err);
		return Promise.resolve();
	})
}
