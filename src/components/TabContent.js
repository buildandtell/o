import React from "react"
import ProtestCard from './ProtestCard'
const axios = require('axios').default;

// Tab Index
// 0: Today, 1: Upcoming, 2:Past

const getDirName = (tabid) => {
    if(tabid === 0){
        return "today"
    } else if(tabid === 1){
        return "upcoming"
    } else {
        return "past"
    }
}

async function fetchEvents(dirname) {
    return axios.get(`https://api.github.com/repos/buildandtell/o/contents/data/${dirname}`)
        .then(e=>{
            console.log(e)
        })
        .catch(e=>{
            console.log(e)
        })
}

class TabContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        loading: true,
        error: false
    };
  }

  async componentDidMount() {
    let dirname = getDirName(this.props.tabId)
    let res = await axios.get(`https://api.github.com/repos/buildandtell/o/contents/data/${dirname}`)
    console.log(res)
  }

  async componentDidUpdate() {
    let dirname = getDirName(this.props.tabId)
    let res = await axios.get(`https://api.github.com/repos/buildandtell/o/contents/data/${dirname}`)
    console.log(res)
  }

  render() {
      return (
        <div>
            <ProtestCard/>
            <ProtestCard/>
        </div>
      )
  }
}

export default TabContent