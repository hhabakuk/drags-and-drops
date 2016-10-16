var React = require('react'),
    PropTypes = React.PropTypes,
    DeleteButton = require('./Components/DeleteButton'),
    DuplicateButton = require('./Components/DuplicateButton'),
    ItemTypes = require('./ItemTypes'),
    BubbleDropZone = require('./Dustbin'),
    DropTarget = require('react-dnd').DropTarget;


const footerTarget = {
    drop() {
    }
};

function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isDragging: monitor.canDrop()
    }
}

const Footer = React.createClass({

    propTypes: {
        connectDropTarget: PropTypes.func.isRequired,
        isDragging: PropTypes.bool.isRequired
    },

    render: function () {

        const {isDragging, connectDropTarget } = this.props;

        return connectDropTarget(
            <div>
                <BubbleDropZone>
                    <DuplicateButton duplicateButton />
                    <DeleteButton deleteButton />
                </BubbleDropZone>
            </div>
        );
    }
});

module.exports = module.exports = DropTarget(ItemTypes.BOX, footerTarget, collect)(Footer);