import fs from 'fs';

const readQuery = api => new Promise((resolve, reject) => {
	fs.readFile('./api/' + api + '/query.sql', 'utf8', (err, query) => {
		if (err) reject(err);
		else resolve(query);
	});
});

export default readQuery;
