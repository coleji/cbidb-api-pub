import apClassInstances from './ap-class-instances';

const getSpec = (api) => {
	switch(api) {
	case "/ap-class-instances":
		return apClassInstances;
	default:
		return null;
	}
};

export default getSpec;
