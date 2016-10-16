var React = require('react');
var PropTypes = React.PropTypes;
var connect = require('react-redux').connect;
var DragDropContext = require('react-dnd').DragDropContext;
var HTML5Backend = require('react-dnd-html5-backend'),
    Box = require('./Components/Box'),
    Footer = require('./Footer'),
    flow = require('lodash/flow');

const Container = React.createClass({
    render: function () {

        return (
            <div>
                <Box />
                <Footer />
            </div>
        );
    }
});

module.exports = DragDropContext(HTML5Backend)(Container);