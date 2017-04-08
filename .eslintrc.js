module.exports = {
    "env": {
        "es6": true,
        "node": true
    },
    "extends": "eslint:recommended",
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true
        },
        "sourceType": "module"
    },
    "plugins": [ ],
    "rules": {
        "indent": [
            "error",
            "tab"
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        'no-console': 'off'
    },
	"globals": {
	    "__DEVELOPMENT__": true,
	    "__CLIENT__": true,
	    "__SERVER__": true,
	    "__DISABLE_SSR__": true,
	    "__DEVTOOLS__": true,
	    "socket": true,
	    "webpackIsomorphicTools": true,
		"__ROOT_DIR__" : true
	  }
};
