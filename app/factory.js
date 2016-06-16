import { badRequest } from 'boom';
import { EventEmitter } from 'events';
import { Component, createElement, PropTypes } from 'react';

export const emitter = new EventEmitter();

export class AppComponent extends Component {

  constructor(props) {
    super(props);
    this.state = this.props.Component.init || {};
    this.props.Component.setState = (state) => this.setState(state);
    this.props.Component.getState = () => this.state;
  }

  componentDidMount() {
    const events = this.props.Component.events || {};
    Object.keys(events).forEach(e => emitter.on(e, events[e]));
  }

  componentWillUnmount() {
    const events = this.props.Component.events || {};
    Object.keys(events).forEach(e => emitter.emoveListener(e, events[e]));
  }

  render() {
    return this.props.render(this);
  }
}

AppComponent.propTypes = {
  render: PropTypes.func.isRequired,
  Component: PropTypes.object.isRequired,
};

export function createComponent(app) {
  return createElement(AppComponent, app);
}

export function createHandler(component, request, reply) {
  const replyError = (err) => {
    request.log([component, 'error'], { error: err });
    return reply(badRequest(err));
  };
  return (err, response) => {
    if (err) return replyError(err);
    request.log([component, 'count'], { count: response.length });
    reply(response);
  };
}
