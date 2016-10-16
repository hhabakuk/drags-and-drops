var React = require('react'),
    PropTypes = React.PropTypes,
    DragSource = require('react-dnd').DragSource,
    ItemTypes = require('../ItemTypes');

const boxSource = {
  beginDrag() {
    return {
      name: 'My Name'
    };
  },

  endDrag(props, monitor, component) {
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource()
  }
}

var Box = React.createClass({
  propTypes: {
    connectDragSource: PropTypes.func.isRequired
  },

  render() {
    var connectDragSource = this.props.connectDragSource;

    return connectDragSource(
      <div className="bubble">
        Drag me
      </div>
    );
  }
});

module.exports = DragSource(ItemTypes.BOX, boxSource, collect)(Box);