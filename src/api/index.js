import apClassInstances from './ap-class-instances';

const getQueryable = (api, query) => new Promise((resolve, reject) => {
	console.log("routing:  " + api + "   ", query)
	switch(api) {
	case "/ap-class-instances":
		resolve(apClassInstances.getQuery(query));
		break;
	default:
		reject("Invalid endpoint.");
	}
});

export default getQueryable;
