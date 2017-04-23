import apClassInstances from './ap-class-instances';
import weather from './weather';

const getSpec = (api) => {
	switch(api) {
	case "/ap-class-instances":
		return apClassInstances;
	case "/weather":
		return weather;
	default:
		return null;
	}
};

export default getSpec;
