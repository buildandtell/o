import React from "react"
const axios = require('axios').default;

class ProtestCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  async componentDidMount() { 
    let res = await axios.get(`https://api.github.com/repos/buildandtell/o/contents/${this.props.filepath}`)
    console.log(res.data.content)
  }

  render(){
    return (
      <div style={{ marginBottom: "2rem" }} className="card">
        <div className="card-content">
          <strong>
              Human Chain `{this.props.filepath}`
          </strong>
          <p className="">
              Human Chain today to remember the father of this nation and his values.
          </p>

          <time dateTime="2016-1-1">11:09 PM - 1 Jan 2016</time>
          <br/>
          Location: Dighalipukhuri

        </div>
        <footer className="card-footer">
          <p className="card-footer-item">
            <span> More Information </span>
          </p>
          <p className="card-footer-item">
            <span> Share </span>
          </p>
        </footer>
      </div>
    )
  }


}

export default ProtestCard