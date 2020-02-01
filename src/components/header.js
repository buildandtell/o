import { Link } from "gatsby"
import PropTypes from "prop-types"
import Logo from "./logo" 
import React from "react"

const Header = ({ siteTitle }) => (
  <header
        style={{
          margin: `0 auto`,
          maxWidth: 769,
          padding: `0 1.0875rem 1.45rem`,
        }}
  >
<div className="columns is-mobile">
  <div className="column is-one-fifth">
    <Logo/>
  </div>
  <Link to="/">
  <div className="column">
    <div className="container">
      <h1 className="title"> Ozin Patoki </h1>
      <h2 className="subtitle"> Artists against Fascism </h2>
    </div>
  </div>
  </Link>
</div>
<p className="buttons">
  <button className="button is-small">
    <span 
    style={{padding: `0 0.2rem 0 0`}}
    role="img" aria-label="flag"> 🚩 </span>
    <span>Posters</span>
  </button>
  <button className="button is-small">
    <span 
    style={{padding: `0 0.2rem 0 0`}}
    role="img" aria-label="flag"> 📖 </span>
    <span>Info</span>
  </button>
  <button className="button is-small">
    <span 
    style={{padding: `0 0.2rem 0 0`}}
    role="img" aria-label="flag"> 📝 </span>
    <span>Need Help</span>
  </button>
  <button className="button is-small">
    <span role="img" aria-label="flag">  🔈 </span>
  </button>
</p>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
