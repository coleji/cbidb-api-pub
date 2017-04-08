import apClassInstances from './ap-class-instances';

const getQueryable = (api, query) => new Promise((resolve, reject) => {
	console.log("routing:  " + api + "   ", query)
	switch(api) {
	case "/ap-class-instances":
		console.log("valid")
		apClassInstances(query).then(results => {
			resolve(results);
		});
		break;
	default:
		console.log("invalid")
		reject("Invalid endpoint.");
	}
});

export default getQueryable;
