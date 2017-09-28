import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Square from './Square';
import { canMovePiece, moveKnight, moveObama } from './Game';
import { ItemTypes } from '../constants';
import { DropTarget } from 'react-dnd';
import connect from 'react-redux';

const squareTarget = {
    canDrop(props, monitor, component) {
        return component.canMoveThePiece() //is component.props.canMovePiece() going to work?
    },
    drop(props, monitor, component) {
        var id = monitor.getItem().knightId
        component.moveThePiece(props.x, props.y, id)  //is component.props.movePiece() going to work?
    }
};

function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver()
    };
}

class BoardSquare extends Component {
    constructor(props) {
        super(props)
    }

    moveThePiece = () => {
        this.props.movePiece()
    }
    canMoveThePiece = () => {
        this.props.canMovePiece()
    }

  render() {
    const { x, y, connectDropTarget, isOver } = this.props;
    const black = (x + y) % 2 === 1;

    return connectDropTarget(
      <div style={{
        position: 'relative',
        width: '100%',
        height: '100%'
      }}>
        <Square black={black}>
          {this.props.children}
        </Square>
        {isOver &&
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: '100%',
            zIndex: 1,
            opacity: 0.5,
            backgroundColor: 'yellow',
          }} />
        }
      </div>
    );
  }
}

BoardSquare.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  isOver: PropTypes.bool.isRequired
};


const mapState = () => {
    return {

    }
}

const mapDispatch = (dispatch) => {
    return {
        moveThePiece() {
            dispatch(movePiece())
        }
    }
}
var BoadSquareDropTarget =  DropTarget([ItemTypes.PIECE], squareTarget, collect)(BoardSquare);

var BoardSquareContainer = connect(mapState, mapDispatch)(BoadSquareDropTarget)