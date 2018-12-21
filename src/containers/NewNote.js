import React, { Component } from "react";
import { API } from "aws-amplify";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import MapLocation from "../components/MapLocation";
import { s3Upload } from "../libs/awsLib";
import config from "../config";
import "./NewNote.css";

export default class NewNote extends Component {
  constructor(props) {
    super(props);

    this.file = null;

    this.state = {
      isLoading: null,
      name: "",
      description: "",
      city:"",
      state:"",
      country:"",
      status: ""
    };
  }

  createNote(note) {
    return API.post("events", "/events", {
      body: note
    });
  }

  validateForm() {
    return this.state.description.length > 0 && this.state.name.length > 0 && this.state.city.length > 0;

  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleFileChange = event => {
    this.file = event.target.files[0];
  }

  handleSubmit = async event => {
    event.preventDefault();

    if (this.file && this.file.size > config.MAX_ATTACHMENT_SIZE) {
      alert(`Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE/1000000} MB.`);
      return;
    }

    this.setState({ isLoading: true });

    try {
      const attachment = this.file
        ? await s3Upload(this.file)
        : null;

      await this.createNote({
        attachment,
        name: this.state.name,
        description: this.state.description,
        city: this.state.city,
        state: this.state.state,
        country: this.state.country,
        status: this.state.status
      });
      this.props.history.push("/");
    } catch (e) {
      alert(e);
      this.setState({ isLoading: false });
    }
  }

  render() {
    return (
      <div className="NewNote">
        <form onSubmit={this.handleSubmit}>
        <FormGroup controlId="name">
          <FormControl
            type="text"
            value={this.state.name}
            placeholder="Enter event name"
            onChange={this.handleChange}
          />
          <FormControl.Feedback />
          </FormGroup>
          <FormGroup controlId="description">
            <FormControl
              onChange={this.handleChange}
              value={this.state.description}
              componentClass="textarea"
            />
          </FormGroup>
          
          <FormGroup controlId="city">
          <FormControl
            type="text"
            value={this.state.city}
            placeholder="Enter City"
            onChange={this.handleChange}
          />
          <FormControl.Feedback />
          </FormGroup>

          <FormGroup controlId="state">
          <FormControl
            type="text"
            value={this.state.state}
            placeholder="Enter state"
            onChange={this.handleChange}
          />
          <FormControl.Feedback />
          </FormGroup>

          <FormGroup controlId="country">
          <FormControl
            type="text"
            value={this.state.country}
            placeholder="Enter country"
            onChange={this.handleChange}
          />
          <FormControl.Feedback />
          </FormGroup>

          <FormGroup controlId="status">
          <FormControl
            type="text"
            value={this.state.status}
            placeholder="Enter status"
            onChange={this.handleChange}
          />
          <FormControl.Feedback />
          </FormGroup>

          <FormGroup controlId="status">
          <MapLocation {...this.props}/>
          </FormGroup>

          <MapLocation {...this.props}/>

          <FormGroup controlId="file">
            <ControlLabel>Attachment</ControlLabel>
            <FormControl onChange={this.handleFileChange} type="file" />
          </FormGroup>
          <LoaderButton
            block
            bsStyle="primary"
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
            isLoading={this.state.isLoading}
            text="Create"
            loadingText="Creating…"
          />
        </form>
          
      </div>
    );
  }

}
