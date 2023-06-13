import React from 'react'
import Header from './Header.mjs'
import Badges from './Badges.mjs'
import { Outlet } from 'react-router-dom'
const Page = () => {
  return (
    <div className="main">
      <nav className="page-header">
        <Header />
      </nav>
    
      <div className="page-body">
        <Outlet/>
      </div>
      <footer className="page-footer">
        <Badges/>
        <div>
          {`miolo is sharpened by `}<a href={'afialapis.com'} target="_blank noopener noreferrer">afialapis.com</a> under <a href={`https://opensource.org/licenses/MIT`} target="_blank noopener noreferrer">MIT</a> license
        </div>
      </footer>
    </div>
  )
}

export default Page
