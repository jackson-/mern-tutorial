var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var Link = require('react-router').Link;
var BugFilter = require('./BugFilter')
var BugAdd = require('./BugAdd')

var BugRow = React.createClass({
    render : function() {
        return(
            <tr>
                <td>
                    <Link to={"/bugs/" + this.props.bug._id} >
                        {this.props.bug._id}
                    </Link>
                </td>
                <td>{this.props.bug.status}</td>
                <td>{this.props.bug.priority}</td>
                <td>{this.props.bug.owner}</td>
                <td>{this.props.bug.title}</td>
            </tr>
        )
    }

})

var BugTable = React.createClass({
    render: function(){
        var bugRows = this.props.bugs.map(function(bug){
            return(
                <BugRow key={bug._id} bug={bug} />
            );
        })
        return(
            <div id="bug-table">
                <table className="table table-striped table-bordered table-condensed">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Status</th>
                            <th>Priority</th>
                            <th>Owner</th>
                            <th>Title</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bugRows}
                    </tbody>
                </table>
            </div>
        )
    }
});

var BugList = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    getInitialState: function() {
        return {bugs: []};
    },
    loadData : function(filter){
        $.ajax('/api/bugs', {data:filter}).done(function(data){
            this.setState({bugs:data});
        }.bind(this));
    },
    changeFilter: function(newFilter){
        this.context.router.push({search: '?' + $.param(newFilter)});
        this.loadData(newFilter);

    },
    componentDidMount: function(){
        this.loadData({});
    },
    addBug : function(bug){
        $.ajax({
            type:"POST",
            url:'/api/bugs/',
            data: JSON.stringify(bug),
            contentType: 'application/json',
            success: function(result){
                var newBug = result
                var newBugs = this.state.bugs.concat(newBug)
                this.setState({bugs:newBugs})
            }.bind(this),
            error: function(xhr, status, err) {
            // ideally, show error to user.
            console.log("Error adding bug:", err);
          }
        });
    },

    render: function(){
        return(
            <div id="bug-list">
                <h1>Bug Tracker</h1>
                <BugFilter submitHandler={this.changeFilter} initFilter={this.props.location.query}/>
                <BugTable bugs = {this.state.bugs}/>
                <BugAdd bugs = {this.state.bugs} addBug = {this.addBug}/>
            </div>
        )
    }
});

module.exports = BugList;