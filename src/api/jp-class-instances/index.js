import moment from 'moment';
import objectHash from 'object-hash';

import readQuery from '../../readQuery';
import substitutions from './substitutions';

const API_NAME = "jp-class-instances";

const hashUrlQuery = query => objectHash({startDate: query.startDate});

const getQuery = (urlQuery) => {
	return readQuery(API_NAME).then(sql => substitutions(sql, urlQuery))
}

const memSave = (redisClient, json, bestByKeyName, query) => new Promise((resolve, reject) => {
	json[bestByKeyName] = bestBy();
	redisClient.set(API_NAME + "$" + hashUrlQuery(query), JSON.stringify(json), (err) => {
		if (err) reject(err);
		else resolve(json);
	});
});

const memLoad = (redisClient, query) => new Promise((resolve, reject) => {
	redisClient.get(API_NAME + "$" + hashUrlQuery(query), (err, result) => {
		if (err) reject(err);
		else if (result == null) resolve(null);
		else resolve(JSON.parse(result));
	})
});

const bestBy = () => moment().add(1, 'minutes');

const getFreshWithDB = (db, query) => new Promise((resolve, reject) => {
	return getQuery(query).then(query => db.execute(query, {}, (err, results) => {
		if (err) reject(err);
		else resolve(results);
	}));
});

export default {
	getFreshWithDB,
	memSave,
	memLoad,
	bestBy,
	hashUrlQuery
}
