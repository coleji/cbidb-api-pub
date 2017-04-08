import moment from 'moment';

const getQuery = params => {
	// TODO: instead of moment().year(), some way to call util_pkg.get_current_season
	// would need some sort of api dependency tree to prevent cyclic self-calls
	const query =	"select i.instance_id from ap_class_instances i, ap_class_bookends bk, ap_class_sessions fs "
					+ " where i.instance_id = bk.instance_id and bk.first_session = fs.session_id"
					+ " and to_char(fs.session_datetime,'YYYY') = :year"
	const substitutions = {year : String(params.season || moment().year())}

	return {query, substitutions}
}

export default getQuery;


/*

'select i.instance_id from ap_class_instances i, ap_class_bookends bk, ap_class_sessions fs  where i.instance_id = bk.instance_id and bk.first_session = fs.session_id and
to_char(fs.session_datetime,\'YYYY\') = :year'

{ year: 2017 }

*/
