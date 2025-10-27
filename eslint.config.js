import {eslintConfig} from 'xeira'


export default [
  // Extiende la configuración base de xeira
  ...eslintConfig,
  
  // Opcional: añade reglas o configuraciones específicas para este proyecto
  {
    files: ['./packages/**/*.jsx', './packages/**/*.mjs'],
    rules: {
      'no-unused-vars': [
        "warn", // or "error"
        {
          "argsIgnorePattern": "^_",
          "varsIgnorePattern": "^_",
          "caughtErrorsIgnorePattern": "^_"
        }
      ],
      'react/react-in-jsx-scope': 0  
    },
  },
];