import moment from 'moment';

const QUERY_PARAMS = {
	"startDate" : {
		default: moment().format("MM/DD/YYYY"),
		isValid : value => {
			return /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/.test(value);
		}
	}
};

export default (sql, urlQuery) => new Promise((resolve, reject) => {
	var startDate = (function() {
		var spec = QUERY_PARAMS.startDate
		if (!urlQuery.startDate || !spec.isValid(urlQuery.startDate)) {
			return spec.default
		} else {
			return urlQuery.startDate
		}
	}());

	var result = sql.replace(":startDate", startDate);

	resolve(result);
})
