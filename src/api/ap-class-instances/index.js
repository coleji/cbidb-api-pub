//import moment from 'moment';

import readQuery from '../../readQuery';

const getQuery = () => {
	// TODO: instead of moment().year(), some way to call util_pkg.get_current_season
	// would need some sort of api dependency tree to prevent cyclic self-calls
	const substitutions = {}; // {year : String(params.season || moment().year())}

	return readQuery('ap-class-instances').then(query => {
		return Promise.resolve({query, substitutions})
	});
}

export default getQuery;
