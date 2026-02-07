import {eslintConfig} from 'xeira'


export default [
  // Extiende la configuración base de xeira
  ...eslintConfig,
  
  // Opcional: añade reglas o configuraciones específicas para este proyecto
  {
    files: ['src/**/*.mjs', 'src/**/*.jsx'],
    rules: {
      'react/display-name': 0,
      'no-unused-vars': [
        "warn", // or "error"
        {
          "argsIgnorePattern": "^_",
          "varsIgnorePattern": "^_",
          "caughtErrorsIgnorePattern": "^_"
        }
      ],      
      // React 19 seems to not need this, but it is required by our build approach
      'react/react-in-jsx-scope': 'error',
    },
  },
];