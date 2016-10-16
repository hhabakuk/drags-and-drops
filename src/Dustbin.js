var React = require('react'),
    PropTypes = React.PropTypes,
    DropTarget = require('react-dnd').DropTarget,
    ItemTypes = require('./ItemTypes');

const boxTarget = {
  drop(props, monitor, component) {
    const hasDropped = monitor.didDrop();
    if (hasDropped && !props.deleteButton) { // otherwise overrides dunno why
      return;
    }

    console.log(monitor.getItem());

    if (props.deleteButton) {
      return {text:'was dropped on delete button',
      droppedItem: monitor.getItem()}
    } else if (props.duplicateButton) {
      return {text:'was dropped on duplicate button'}
    } else {
      return {text:'was dropped on footer'}
    }
    


  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOverCurrent: monitor.isOver({shallow: true}),
    isDragging: monitor.canDrop()
  }
}

var Dustbin = React.createClass({
  propTypes: {
    connectDropTarget: PropTypes.func.isRequired,
    isOverCurrent: PropTypes.bool.isRequired,
    deleteButton: PropTypes.bool,
    duplicateButton: PropTypes.bool,
    children: PropTypes.node,
    isDragging: PropTypes.bool
  },


  render() {
    const { duplicateButton, deleteButton, isOverCurrent, connectDropTarget, children, isDragging } = this.props;
    let isHoveringOverDropZone = isOverCurrent && (deleteButton || duplicateButton);

    function getArea() {
      if (deleteButton) {
        return {
          name: 'Delete group',
          className: `dropArea__delete ${isHoveringOverDropZone ? 'hovering' : ''}`
        }
      } else if (duplicateButton) {
        return {
          name: 'Duplicate group',
          className: `dropArea__duplicate ${isHoveringOverDropZone ? 'hovering' : ''}`
        }
      } else {
        return {
          name: '',
          className: `mainFooter ${isDragging ? '' : 'hidden'}`
        }
      }
    }

    return connectDropTarget(
      <div className={getArea().className}>
        {getArea().name}
        <div>
          {children}
        </div>
      </div>
    );
  }
});

module.exports = DropTarget(ItemTypes.BOX, boxTarget, collect)(Dustbin);