var React = require('react');
var ReactDOM = require('react-dom');
var injectTapEventPlugin = require('react-tap-event-plugin');

import Panel from 'react-bootstrap/lib/Panel';
var Grid = require('react-bootstrap/lib/Grid');
var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');
import FormControl from "react-bootstrap/lib/FormControl";
import FormGroup from "react-bootstrap/lib/FormGroup";
import ControlLabel from "react-bootstrap/lib/ControlLabel";

var Button = require('react-bootstrap/lib/Button');
injectTapEventPlugin();
var anyValue = '*';

var BugFilter = React.createClass({
  render: function() {
    return (
       <Panel collapsible defaultExpanded={true} header="Filter">
        <Grid fluid={true}>
          <Row>
            <Col xs={12} sm={6} md={4}>
                <FormGroup controlId="formControlsSelectPriority">
                  <ControlLabel>Priority</ControlLabel>
                  <FormControl componentClass="select" multiple
                   onChange={this.onChangePriority} value={[this.state.priority]}>
                    <option value="">(Any)</option>
                    <option value="P1">P1</option>
                    <option value="P2">P2</option>
                    <option value="P3">P3</option>
                  </FormControl>
                </FormGroup>
            </Col>
            <Col xs={12} sm={6} md={4}>
              <FormGroup controlId="formControlsSelectStatus">
                  <ControlLabel>Priority</ControlLabel>
                  <FormControl componentClass="select" multiple
                   onChange={this.onChangeStatus} value={[this.state.status]}>
                    <option value="">(Any)</option>
                    <option value="Open">Open</option>
                    <option value="New">New</option>
                    <option value="Closed">Closed</option>
                  </FormControl>
                </FormGroup>
            </Col>
            <Col xs={12} sm={6} md={4}>
                <Button value="Search" type="submit" bsStyle="primary" onClick={this.submit}>Search</Button>
            </Col>
          </Row>
        </Grid>
      </Panel>
    )
  },

  getInitialState: function() {
    var initFilter = this.props.initFilter;
    return {status: initFilter.status || anyValue, priority: initFilter.priority || anyValue};

  },

  componentWillReceiveProps: function(newProps) {
        var newFilter = {
          status: newProps.initFilter.status || anyValue,
          priority: newProps.initFilter.priority || anyValue
        };
        if (newFilter.status === this.state.status
            && newFilter.priority === this.state.priority) {
          console.log("BugFilter: componentWillReceiveProps, no change");
          return;
        }
        console.log("BugFilter: componentWillReceiveProps, new filter:", newFilter);
        this.setState({status: newFilter.status, priority: newFilter.priority});
    },

  onChangeStatus: function(e, index, value) {
    this.setState({status: e.target.value});
  },
  onChangePriority: function(e, index, value) {
    this.setState({priority: e.target.value});
  },

  submit: function(e) {
    var newFilter = {};

    if(this.state.priority != anyValue){
        newFilter.priority = this.state.priority
    }
    if(this.state.status != anyValue){
        newFilter.status = this.state.status
    }
    this.props.submitHandler(newFilter);
  }
});

module.exports = BugFilter;