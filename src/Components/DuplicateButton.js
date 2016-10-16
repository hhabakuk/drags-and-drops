var React = require('react'),
    PropTypes = React.PropTypes,
    DropTarget = require('react-dnd').DropTarget,
    ItemTypes = require('../ItemTypes');


const duplicateTarget = {
    drop({}, monitor, component) {
        console.log(monitor.getItem());
        const hasDropped = monitor.didDrop();
        if (hasDropped) {
            return;
        }

        component.setState({
            hasDropped: true
        });
    }
};

function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        isOverCurrent: monitor.isOver({shallow: true})
    }
}

var DuplicateButton = React.createClass({

    getInitialState(){
        this.state = {
            hasDropped: false
        };
        return this.state
    },

    propTypes: {
        connectDropTarget: PropTypes.func.isRequired,
        isOver: PropTypes.bool.isRequired,
        isOverCurrent: PropTypes.bool.isRequired
    },


    render() {
        const {isOverCurrent, connectDropTarget } = this.props;
        const { hasDropped } = this.state;

        let backgroundColor;

        if (isOverCurrent) {
            backgroundColor = 'darkgreen';
        }

        return connectDropTarget(
            <div className="duplicateButton" style={{backgroundColor: backgroundColor}}>
                <br/>
                DuplicateButton
                {hasDropped && <span>dropped</span>}
                <div>
                </div>
            </div>
        );
    }
});


module.exports = DropTarget(ItemTypes.BOX, duplicateTarget, collect)(DuplicateButton);