// http://eslint.org/docs/user-guide/configuring

module.exports = {
  extends: [
      'airbnb-base',
  ],
  parserOptions: {
     ecmaVersion: 2017,
     sourceType: 'module'
  },
  'rules': {
    // Don't require .js extension when importing
    'import/extensions': ['error', 'always', {
      'js': 'never',
    }],
    // Allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // Allow trailing spaces in development (many IDEs add them, so this causes nagging with the dev server)
    'no-trailing-spaces': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // Allow console, since this is nodejs
    'no-console': 'off',
    // Allow unused parameters, as we have a lot of callbacks so it'll be cleaner
    'no-unused-vars': ["error", { "args": "none" }]
  }
}
