import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Datetime from "react-datetime"
import ReCAPTCHA from "react-google-recaptcha";
import "./datetime.css"

class FormPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      location: '',
      time: {},
      timevalid: false,
      desc: '',
      links: [],
      notes: '',
      cap: ''
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleCaptcha = this.handleCaptcha.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.handleDescChange = this.handleDescChange.bind(this);
    this.handleLinkChange = this.handleLinkChange.bind(this);
    this.handleNoteChange = this.handleNoteChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNameChange(event) {
    this.setState({name: event.target.value});
  }
  handleLocationChange(event) {
    this.setState({location: event.target.value});
  }
  handleTimeChange(t) {
    // check if time is a string, if yes then add the warning
    if (typeof t === "string") {
      this.setState({timevalid: false });
    } else {
      this.setState({time: t, timevalid: true });
    }
  }
  handleDescChange(event) {
    this.setState({desc: event.target.value});
  }
  handleLinkChange(event) {
    this.setState({links: event.target.value});
  }
  handleNoteChange(event) {
    this.setState({notes: event.target.value});
  }
  handleCaptcha(v) {
    this.setState({cap: v});
  }

  handleSubmit(event) {
    event.preventDefault()
    // check time invalid and check capcha

    if(!(this.state.cap !== '' && this.state.timevalid)){
      console.log("invalid")
      // TODO: Add some notification.
    } else {
      console.log(this.state)
    }
  }

  render() {
    return (
    <Layout>
    <SEO title="Add Protest" />
<div 
style={{
  marginBottom: "2rem"
}}
>
  <small>*Submit info in which ever language you prefer. </small>

<form onSubmit={this.handleSubmit}>
<div className="field">
  <label htmlFor="name" className="label">Name</label>
  <div className="control">
    <input
    onChange={this.handleNameChange}
    className="input" name="name" type="text" placeholder="Name of event"/>
  </div>
</div>

<div className="field">
  <label htmlFor="time" className="label">Start Date and Time</label>
  <div className="control">
    <Datetime
    onChange={this.handleTimeChange}
    name="time"
    inputProps={{className:"input", placeholder:"Tap to select Date and Time"}}/>
  </div>
  {this.state.timeinvalid && <p className="help is-danger">Please select time.</p>}
</div>

<div className="field">
  <label htmlFor="location" className="label">Location</label>
  <div className="control">
    <input
    name="location"
    onChange={this.handleLocationChange}
    className="input" type="text" placeholder="Location of the event"/>
  </div>
</div>

<div className="field">
  <label htmlFor="desc" className="label">Description</label>
  <div className="control">
    <textarea
    name="desc"
    onChange={this.handleDescChange}
    className="textarea" placeholder="Description"></textarea>
  </div>
</div>

<div className="field">
  <label htmlFor="links" className="label">Socialmedia link to follow (if any, separated by commas)</label>
  <div className="control">
    <input
    name="links"
    onChange={this.handleLinkChange}
    className="input" type="text" placeholder="Enter links"/>
  </div>
</div>

<div className="field">
  <label htmlFor="notes" className="label">Additional notes (if any)</label>
  <div className="control">
    <textarea
    name="notes"
    onChange={this.handleNoteChange}
    className="textarea" placeholder="Textarea"></textarea>
  </div>
</div>

<div className="field">
  <ReCAPTCHA
  onChange={this.handleCaptcha}
  sitekey="6LdoxdQUAAAAAFDANbTQvDF65ixqE7wZhPfeosuw" />
</div>

<div className="field is-grouped">
  <div className="control">
    <input className="button is-link" type="submit" value="Submit"/>
  </div>
</div>

</form>
</div>
</Layout>




    );
  }
}

export default FormPage