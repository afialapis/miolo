import {eslintConfig} from 'xeira'


export default [
  ...eslintConfig,
  
  {
    files: ['**/*.jsx'],
    rules: {
      'react/react-in-jsx-scope': 0,
    },
  },
];