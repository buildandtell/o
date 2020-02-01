import React from "react"
import { Link } from "gatsby"
import Gamusa from "../images/gamusa.svg"
import ProtestCard from '../components/ProtestCard'
import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = () => {
  return (
    <Layout>
      <SEO title="Home"/>
    <div>
<div class="notification">
The list of protests, add your protest <Link to="/add">here</Link>.
</div>


<div>
  <div class="tabs is-centered">
  <ul>
    <li class="is-active"><a>Today</a></li>
    <li><a>Upcoming</a></li>
    <li><a>Past</a></li>
  </ul>
  </div>
  <div class="content">
  <ProtestCard/>
  <ProtestCard/>
  <ProtestCard/>
  </div>

</div>

</div>
    </Layout>


  )
}

export default IndexPage