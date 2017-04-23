import oracledb from 'oracledb';
import ini from 'ini';
import fs from 'fs';
import redis from 'redis';
import moment from 'moment';

import getApiSpec from './api';

const BEST_BY_KEY_NAME = "$cacheExpires";

const redisClient = redis.createClient();

const getConnection = function() {
	var connectionOptions = ini.parse(fs.readFileSync('./ini/private.ini', 'utf-8')).dbCredentials;
	return new Promise((resolve, reject) => {
		oracledb.getConnection(connectionOptions, (err, c) => {
			if (err) reject(err);
			else resolve(c);
		});
	});
};

const isStale = (result) => {
	return (result == null || moment(result[BEST_BY_KEY_NAME]) < moment())
};

const getFresh = spec => {
	if (spec.getFresh) return spec.getFresh();
	else if (spec.getFreshWithDB) {
		return getConnection().then(c => {
			var deferredErr;
			var deferredResult;
			return spec.getFreshWithDB(c).then(result => {
				deferredResult = result;
			}, err => {
				deferredErr = err;
			}).then(() => new Promise((resolve, reject) => {
				console.log("closing db connection")
				c.close(err => {
					if (err) reject(err);
					else resolve();
				})
			})).catch(err => {
				console.log("!!!!! Error closing DB connection: " + err)
			}).then(() => {
				if (deferredErr) return Promise.reject(deferredErr);
				else return Promise.resolve(deferredResult);
			})
		})
	}
	else return Promise.reject("API had no defined getFresh function")
}

export default function(api, query) {
	let spec = getApiSpec(api, query);
	if (!spec) return Promise.resolve(null);
	return spec.memLoad(redisClient).then(result => {
		if (isStale(result)) {
			console.log("stale api; getting fresh");
			return getFresh(spec).then(result => spec.memSave(redisClient, result, BEST_BY_KEY_NAME));
		} else {
			console.log("still fresh; returning from redis")
			return Promise.resolve(result);
		}
	})
}
