import React, { Component } from "react";
import { API, Storage } from "aws-amplify";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import { s3Upload } from "../libs/awsLib";
import config from "../config";
import "./Notes.css";

export default class Notes extends Component {
  constructor(props) {
    super(props);

    this.file = null;

    this.state = {
      isLoading: null,
      isDeleting: null,
      note: null,
      name: "",
      description: "",
      attachmentURL: null
    };
  }

  async componentDidMount() {
    try {
      let attachmentURL;
      const note = await this.getNote();
      const { name, mainImage, description } = note;

      console.log("main photo:", mainImage);
      if (mainImage) {

        attachmentURL = await Storage.vault.get(mainImage);
        console.log("attachmentURL:", attachmentURL);
      }

      this.setState({
        note,
        name,
        description,
        attachmentURL
      });
    } catch (e) {
      alert(e);
    }
  }

  getNote() {
    return API.get("events", `/events/${this.props.match.params.id}`);
  }

  saveNote(note) {
    return API.put("events", `/events/${this.props.match.params.id}`, {
      body: note
    });
  }

  deleteNote() {
    return API.del("events", `/events/${this.props.match.params.id}`);
  }

  validateForm() {
    return this.state.name.length > 0;
  }

  formatFilename(str) {
    return str.replace(/^\w+-/, "");
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
    let attachment;

    event.preventDefault();

    if (this.file && this.file.size > config.MAX_ATTACHMENT_SIZE) {
      alert(`Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE/1000000} MB.`);
      return;
    }

    this.setState({ isLoading: true });

    try {
      if (this.file) {
        attachment = await s3Upload(this.file);
      }

      await this.saveNote({
        name: this.state.name,
        attachment: attachment || this.state.note.attachment
      });
      this.props.history.push("/");
    } catch (e) {
      alert(e);
      this.setState({ isLoading: false });
    }
  }

  handleDelete = async event => {
    event.preventDefault();

    const confirmed = window.confirm(
      "Are you sure you want to delete this note?"
    );

    if (!confirmed) {
      return;
    }

    this.setState({ isDeleting: true });

    try {
      await this.deleteNote();
      this.props.history.push("/");
    } catch (e) {
      alert(e);
      this.setState({ isDeleting: false });
    }
  }

  render() {
    return (
      <div className="Notes">
        {this.state.note &&
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
          {this.state.note.mainImage &&
              <FormGroup>
                <ControlLabel>Attachment</ControlLabel>
                <FormControl.Static>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={this.state.attachmentURL}
                  >
                    {this.formatFilename(this.state.note.mainImage)}
                  </a>
                </FormControl.Static>
              </FormGroup>}
            <FormGroup controlId="file">
              {!this.state.note.mainImage &&
                <ControlLabel>Attachment</ControlLabel>}
              <FormControl onChange={this.handleFileChange} type="file" />
            </FormGroup>
            <LoaderButton
              block
              bsStyle="primary"
              bsSize="large"
              disabled={!this.validateForm()}
              type="submit"
              isLoading={this.state.isLoading}
              text="Save"
              loadingText="Saving…"
            />
            <LoaderButton
              block
              bsStyle="danger"
              bsSize="large"
              isLoading={this.state.isDeleting}
              onClick={this.handleDelete}
              text="Delete"
              loadingText="Deleting…"
            />
          </form>}
      </div>
    );
  }
}
