import React from 'react'

const Badges = () => 
  <div className="badges">

    <span className="badge">
      <a href={`https://www.npmjs.com/package/miolo`}>
        <img alt="NPM Version" 
              src={`https://badge.fury.io/js/miolo.svg`}/>
      </a>
    </span>
    {/*
    <span className="badge">
      <a href={`https://david-dm.org/afialapis/miolo`}>
        <img alt="Dependency Status" 
              src={`https://david-dm.org/afialapis/miolo.svg`}/>
      </a>
    </span>
    */}
    <span className="badge">
      <a href={`https://www.npmjs.com/package/miolo`}>
        <img alt="NPM Downloads" 
              src={`https://img.shields.io/npm/dm/miolo.svg?style=flat`}/>
      </a>
    </span>
  </div>

export default Badges
