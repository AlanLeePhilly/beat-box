import React from 'react';
import { Link } from 'react-router'
import BackButton from './BackButton'

const NavBar = props => {
  return(
    <div className="row">
      {/* <BackButton />
      <Link to='/'> HOME </Link> */}
      <h1 className="page-title"><header>Sequencial Sounds</header></h1>
      { props.children }
    </div>
  )
}

export default NavBar;
