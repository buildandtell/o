import React from "react"
import { Link } from "gatsby"
import Gamusa from "../images/gamusa.svg"
import Layout from "../components/layout"
import TabContent from "../components/TabContent"
import SEO from "../components/seo"


class IndexPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 0
    };
    this.onTabClick = this.onTabClick.bind(this);
  }

  onTabClick(id) {
    this.setState({selectedTab: id});
  }

  render() {
  return (
    <Layout>
      <SEO title="Home"/>
      <div className="notification">
        The list of protests, add your protest <Link to="/add">here</Link>.
      </div>

    <div>
      <div className="tabs is-centered">
        <ul>
          <li onClick={()=>this.onTabClick(0)}><a>Today</a></li>
          <li onClick={()=>this.onTabClick(1)}><a>Upcoming</a></li>
          <li onClick={()=>this.onTabClick(2)}><a>Past</a></li>
        </ul>
      </div>
      <div className="content"> <TabContent tabId={this.state.selectedTab}/> </div>
    </div>

    </Layout>
  )

  }
}

export default IndexPage