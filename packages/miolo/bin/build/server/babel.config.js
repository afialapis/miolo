export default { 
  presets: [
    ["@babel/preset-env", { 
      targets: {"esmodules": true},
      bugfixes: true,
      loose: true 
    }],
    ['@babel/preset-react']
  ] ,
  plugins: [
    ["@babel/plugin-proposal-decorators", { "legacy": true }]
  ],

  exclude: /node_modules/,
  /*https://github.com/rollup/plugins/tree/master/packages/babel#babelhelpers*/
  
  // TODO
  //  context.isAnApp()
  //  ? 'runtime' https://github.com/rollup/plugins/tree/master/packages/babel#injected-helpers
  //  : bundled  
  
  babelHelpers: 'bundled'
}
