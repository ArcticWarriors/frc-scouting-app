// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  extends: [
      'airbnb-base',
      'plugin:vue/recommended',
  ],
  parserOptions: {
     parser: 'babel-eslint',
     ecmaVersion: 2017,
     sourceType: 'module'
  },
  // Check if imports actually resolve
  'settings': {
    'import/resolver': {
      'webpack': {
        'config': 'build/webpack.base.conf.js'
      }
    }
  },
  'rules': { 
    // Don't require .vue extension when importing
    'import/extensions': ['error', 'always', {
      'js': 'never',
      'vue': 'never'
    }],
    // Allow optionalDependencies
    'import/no-extraneous-dependencies': ['error', {
      'optionalDependencies': ['test/unit/index.js']
    }],
    // Allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // Allow trailing spaces in development (many IDEs add them, so this causes nagging with the dev server)
    'no-trailing-spaces': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    
    /*** Modify plugin:vue/recommended ***/
    'vue/html-end-tags': 'error',
    'vue/no-async-in-computed-properties': 'error',
    'vue/no-side-effects-in-computed-properties': 'error',
    'vue/order-in-components': 'error',
    'vue/attribute-hyphenation': 'error',
    'vue/html-quotes': 'error',
    'vue/name-property-casing': 'error',
    'vue/v-bind-style': 'error',
    'vue/v-on-style': 'error',
  }
}
