module.exports = {
    "parserOptions": {
      "sourceType": "module",
    },
    "env": {
        "node": true,
        "browser": false,
        "commonjs": false,
        "es6": true,
        "screeps/screeps": true,
        "no-console": false,
    },
    "extends": "eslint:recommended",
    "rules": {
        "indent": [
            "error",
            2
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "double"
        ],
        "semi": [
            "error",
            "always"
        ]
    },
    "plugins": [
      "screeps",
    ]
};
