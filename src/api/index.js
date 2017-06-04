import apClassInstances from './ap-class-instances';
import jpClassInstances from './jp-class-instances';
import weather from './weather';

const getSpec = (api, query) => {
	switch(api) {
	case "/ap-class-instances":
		return apClassInstances;
	case "/jp-class-instances":
		return jpClassInstances;
	case "/weather":
		return weather;
	default:
		return null;
	}
};

export default getSpec;
