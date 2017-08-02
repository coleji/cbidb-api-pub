import apClassInstances from './ap-class-instances';
import jpClassInstances from './jp-class-instances';
import jpTeams from './jp-teams';
import weather from './weather';

const getSpec = (api, query) => {
	switch(api) {
	case "/ap-class-instances":
		return apClassInstances;
	case "/jp-class-instances":
		return jpClassInstances;
	case "/jp-teams":
		return jpTeams;
	case "/weather":
		return weather;
	default:
		return null;
	}
};

export default getSpec;
