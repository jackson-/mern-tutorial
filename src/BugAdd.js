var React = require('react');
var ReactDOM = require('react-dom');
import FormControl from "react-bootstrap/lib/FormControl";
import FormGroup from "react-bootstrap/lib/FormGroup";
import ControlLabel from "react-bootstrap/lib/ControlLabel";
import Panel from 'react-bootstrap/lib/Panel';
import Button from 'react-bootstrap/lib/Button';

var BugAdd = React.createClass({
    handleSubmit : function(e){
        e.preventDefault();
        var form = document.forms.bugAdd;
        this.props.addBug({priority:form.priority.value, status:form.status.value, owner:form.owner.value, title:form.title.value})
        // clear the form for the next input
        form.owner.value = ""; form.title.value = "";form.status.value = ""; form.priority.value = "";
    },
    render: function(){
        return(
            <Panel header="Add Bug">
                <h3>Add New Bug</h3>
                <form name='bugAdd'>
                     <FormGroup controlId="status">
                      <ControlLabel>Status</ControlLabel>
                      <FormControl name="status" type="text" />
                    </FormGroup>
                    <FormGroup controlId="priority">
                      <ControlLabel>Priority</ControlLabel>
                      <FormControl name="priority" type="text" />
                    </FormGroup>
                    <FormGroup controlId="owner">
                      <ControlLabel>Owner</ControlLabel>
                      <FormControl name="owner" type="text" />
                    </FormGroup>
                    <FormGroup controlId="title"name="title">
                      <ControlLabel>Title</ControlLabel>
                      <FormControl type="text" />
                    </FormGroup>
                    <Button bsStyle="primary" onClick={this.handleSubmit} >
                        Submit
                    </Button>
                </form>
            </Panel>
        )
    }
});

module.exports = BugAdd;