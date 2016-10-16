var React = require('react'),
    PropTypes = React.PropTypes,
    DropTarget = require('react-dnd').DropTarget,
    ItemTypes = require('../ItemTypes');


const deleteTarget = {
    drop({}, monitor, component) {
        const hasDropped = monitor.didDrop();
        if (hasDropped) { // hoolitseb, et oleks tegemist droppimise, mitte hoverdamisega
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

var DeleteButton = React.createClass({

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
        const {isOver, connectDropTarget } = this.props;
        const { hasDropped } = this.state; // sellest peaks tegema tegelt redux actioni

        let backgroundColor;

        if (isOver) {
            backgroundColor = 'plum';
        }
        
        return connectDropTarget(
            <div className="deleteButton" style={{backgroundColor: backgroundColor}}>
                <br/>
                DeleteButton
                <div>
                </div>
            </div>
        );
    }
});


module.exports = DropTarget(ItemTypes.BOX, deleteTarget, collect)(DeleteButton);