import React from "react"
import b64 from 'base-64'
import m from 'moment'
const axios = require('axios').default;

class ProtestCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      event: {},
      display: true
    };
  }

  async componentDidMount() { 
    let res = await axios.get(`https://api.github.com/repos/buildandtell/o/contents/${this.props.filepath}`)
    let content = b64.decode(res.data.content)
    this.setState({event: JSON.parse(content)})
  }
  componentDidUpdate(){
    console.log(this.state)
  }

  render(){
    return (
      <div style={{ marginBottom: "2rem" }} className="card">
        <div className="card-content">
          <strong style={{textTransform: "capitalize"}}> {this.state.event.name} </strong>
          <p> {this.state.event.desc} s</p>

          <strong>Time: </strong><time>{m(this.state.event.time).format('MMMM Do YYYY, h:mm A')}</time>
          <br/>
          <strong>Location:</strong> {this.state.event.location}

          <div className="notification is-info">
            {this.state.event.note}
          </div>
          <strong>Links: </strong>

        </div>
        <footer className="card-footer"> </footer>
      </div>
    )
  }


}

export default ProtestCard