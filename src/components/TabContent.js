import React from "react"
import ProtestCard from './ProtestCard'

class TabContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        loading: true,
        error: false,
    };
  }

  async componentDidMount() { }

  async componentDidUpdate() { }

  render() {
      return (
        <div>
            {this.props.listOfEvents.map((e,index)=>{
                return <ProtestCard filepath={e} key={e}/>
            })}
            <div className="has-text-centered">
            {this.props.listOfEvents.length===0?<p>No Events Here</p>:<></>}
            </div>
        </div>
      )
  }
}

export default TabContent