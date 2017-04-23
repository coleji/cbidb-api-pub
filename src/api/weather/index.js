import moment from 'moment';
import https from 'https';
import ini from 'ini';
import fs from 'fs';

const API_NAME = "weather";

const memSave = (redisClient, json, bestByKeyName) => new Promise((resolve, reject) => {
	json[bestByKeyName] = bestBy();
	redisClient.set(API_NAME, JSON.stringify(json), (err) => {
		if (err) reject(err);
		else resolve(json);
	});
});

const memLoad = redisClient => new Promise((resolve, reject) => {
	redisClient.get(API_NAME, (err, result) => {
		if (err) reject(err);
		else if (result == null) resolve(null);
		else resolve(JSON.parse(result));
	})
});

const bestBy = () => moment().add(1, 'hours');

const getFresh = () => new Promise((resolve, reject) => {
	let options = ini.parse(fs.readFileSync('./src/api/weather/ini/private.ini', 'utf-8')).apiEndpoint;

	var req = https.request(options, (res) => {
		var resData = '';
		res.on('data', (chunk) => {
			resData += chunk;
		});
		res.on('end', () => {
			var response = JSON.parse(resData);
			resolve(response);
		});
	});
	req.on('error', (e) => {
		reject(e);
	});

	req.end();
});

export default {
	getFresh,
	memSave,
	memLoad,
	bestBy
}
