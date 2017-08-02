import moment from 'moment';

import readQuery from '../../readQuery';

const API_NAME = "jp-teams";

const hashUrlQuery = () => "";

const getQuery = () => {
	// TODO: instead of moment().year(), some way to call util_pkg.get_current_season
	// would need some sort of api dependency tree to prevent cyclic self-calls
	const substitutions = {}; // {year : String(params.season || moment().year())}
	return readQuery(API_NAME).then(query => {
		return Promise.resolve({query, substitutions})
	});
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

const bestBy = () => moment().add(5, 'seconds');

const getFreshWithDB = (db, query) => new Promise((resolve, reject) => {
	return getQuery().then(query => db.execute(query.query, {}, (err, results) => {
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
