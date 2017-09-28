import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';
import {connect} from 'react-redux';


const infantrySource = {
    beginDrag(props) {
        console.log("BEGIN PROPS", props);
        return {pieceId: props.id};
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
            <span> &#9812; </span>
        </div>
      );
    }
}
  
const DragInfantry = DragSource('piece', infantrySource, collect)(Infantry);


const mapState = (state) => {
    return {

    }
}

const mapDispatch = (dispatch) => {
    return {
    
    }
}

const InfantryContainer = connect(mapState, mapDispatch)(DragInfantry)
export default InfantryContainer