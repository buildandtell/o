import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import TabContent from "../components/TabContent"
import SEO from "../components/seo"

const axios = require('axios').default;

const getDirName = (tabid) => {
    if(tabid === 0){
        return "today"
    } else if(tabid === 1){
        return "upcoming"
    } else {
        return "past"
    }
}

class IndexPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 0,
      listOfEvents: [],
      listOfEventsToShow: [],
      offset: 0,
      limit: 50,
      showloadmore: false,
    };
    this.onTabClick = this.onTabClick.bind(this);
    this.onLoadMore = this.onLoadMore.bind(this);
  }

  async componentDidMount() {
    let dirname = getDirName(this.state.selectedTab)
    let res = await axios.get(`https://api.github.com/repos/buildandtell/o/contents/data/${dirname}`)
    let filenames = res.data.map(e=>e.path)
    filenames = filenames.filter(e=>{ if(e[e.length-1] === "X"){ return false } return true })
    this.setState({listOfEvents: filenames })
    let offset = this.state.offset
    let limit = this.state.limit
    let selectedEvents = this.state.listOfEvents.slice(offset,offset+limit)
    this.setState({listOfEventsToShow: selectedEvents})
    this.setState({offset: offset+limit})
    if(this.state.offset < this.state.listOfEvents.length){
      this.setState({showloadmore: true})
    }
    //console.log(this.state)
  }

  onLoadMore() {
    let offset = this.state.offset
    let limit = this.state.limit
    let newoffset = offset+limit
    let selectedEvents = this.state.listOfEvents.slice(offset,newoffset)
    this.setState({listOfEventsToShow: this.state.listOfEventsToShow.concat(selectedEvents)})
    this.setState({offset: newoffset})
    if(this.state.offset > this.state.listOfEvents.length){
      this.setState({showloadmore: false})
    }
  }

  async onTabClick(id) {
    this.setState({showloadmore: false})
    this.setState({offset: 0}); // reset offset
    this.setState({selectedTab: id});
    let tabs = document.getElementsByClassName(`oz-tabs`)
    Array.prototype.forEach.call(tabs, function(tab) {
      tab.classList.remove("is-active")
    })
    document.getElementById(`tab-${id}`).classList.add("is-active")

    let dirname = getDirName(id)
    let res = await axios.get(`https://api.github.com/repos/buildandtell/o/contents/data/${dirname}`)
    let filenames = res.data.map(e=>e.path)
    filenames = filenames.filter(e=>{ if(e[e.length-1] === "X"){ return false } return true })
    this.setState({listOfEvents: filenames })
    let offset = this.state.offset
    let limit = this.state.limit
    let selectedEvents = this.state.listOfEvents.slice(offset,offset+limit)
    this.setState({listOfEventsToShow: selectedEvents})
    this.setState({offset: offset+limit})
    if(this.state.offset < this.state.listOfEvents.length){
      this.setState({showloadmore: true})
    }
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
          <li className="oz-tabs" id="tab-0" onClick={()=>this.onTabClick(0)}><a>Today</a></li>
          <li className="oz-tabs" id="tab-1" onClick={()=>this.onTabClick(1)}><a>Upcoming</a></li>
          <li className="oz-tabs" id="tab-2" onClick={()=>this.onTabClick(2)}><a>Past</a></li>
        </ul>
      </div>
      <div className="content center"> 
        <TabContent listOfEvents={this.state.listOfEventsToShow}/>
        {this.state.showloadmore?
          <a onClick={this.onLoadMore} className="button">Load More</a>:
          <></>
        }
      </div>
    </div>

    </Layout>
  )

  }
}

export default IndexPage