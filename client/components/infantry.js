import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ItemTypes } from './Constants';
import { DragSource } from 'react-dnd';

const infantrySource = {
    beginDrag(props) {
        return {type: 'trump', knightId: props.id};
    }
};
  
function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }
}
  
class Infantry extends Component {
    render() {
        const { connectDragSource, isDragging } = this.props;
        return connectDragSource(
        <div style={{
          opacity: isDragging ? 0.5 : 1,
          fontSize: 25,
          fontWeight: 'bold',
          cursor: 'move'
        }}>
        </div>
      );
    }
}
  
Knight.propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired
};
  
const DragInfantry = DragSource(ItemTypes.KNIGHT, knightSource, collect)(Infantry);


const mapState = (state) => {
    return {

    }
}

const mapDispatch = (dispatch) => {
    return {
    
    }
}

const InfantryContainer = connect(mapState, mapDispatch)(DragInfantry)