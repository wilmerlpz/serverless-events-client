import React, { Component } from "react";
import { API } from "aws-amplify";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import "./Home.css";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      events: []
    };
  }

  async componentDidMount() {
    if (!this.props.isAuthenticated) {
      return;
    }

    try {
      const events = await this.events();
      this.setState({ events });
    } catch (e) {
      alert(e);
    }

    this.setState({ isLoading: false });
  }

  events() {
    return API.get("events", "/events");
  }

  renderEventsList(events) {
    return [{}].concat(events).map(
      (note, i) =>
        i !== 0
          ? <LinkContainer
              key={note.eventId}
              to={`/events/${note.eventId}`}
            >
              <ListGroupItem header={note.name.trim().split("\n")[0]}>
                {"Created: " + new Date(note.createdAt).toLocaleString()}
              </ListGroupItem>
            </LinkContainer>
          : <LinkContainer
              key="new"
              to="/events/new"
            >
              <ListGroupItem>
                <h4>
                  <b>{"\uFF0B"}</b> Create a new note
                </h4>
              </ListGroupItem>
            </LinkContainer>
    );
  }

  renderLander() {
    return (
      <div className="lander">
        <h1>Scratch</h1>
        <p>A simple note taking app</p>
        <div>
          <Link to="/login" className="btn btn-info btn-lg">
            Login
          </Link>
          <Link to="/signup" className="btn btn-success btn-lg">
            Signup
          </Link>
        </div>
      </div>
    );
  }

  renderEvents() {
    return (
      <div className="events">
        <PageHeader>Your Events</PageHeader>
        <ListGroup>
          {!this.state.isLoading && this.renderEventsList(this.state.events)}
        </ListGroup>
      </div>
    );
  }

  render() {
    return (
      <div className="Home">
        {this.props.isAuthenticated ? this.renderEvents() : this.renderLander()}
      </div>
    );
  }
}
