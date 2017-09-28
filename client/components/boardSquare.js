import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Square from './Square';
import { DropTarget } from 'react-dnd';
import {attackPiece, movePiece, canMovePiece} from '../store'
import {connect} from 'react-redux';

const squareTarget = {
    canDrop(props, monitor, component) {
        var id = 'id_' + monitor.getItem().pieceId 
        var piece = props.positions[id]
        var mobility = piece.mobility;
        var diffX = Math.abs(piece.x-props.x);
        var diffY = Math.abs(piece.y - props.y);
        if ((diffY + diffX) <= mobility) {
            return true;
        } else {
            return false
        }
    },
    drop(props, monitor, component) {
        var id = monitor.getItem().pieceId
        props.moveThePiece(props.x, props.y, id)
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
    render() {
        console.log('props in boardsquare', this.props)        
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


const mapState = (state) => {
    return {
        positions: state.positions
    }
}

const mapDispatch = (dispatch) => {
    return {
        moveThePiece(x, y, id) {
            dispatch(movePiece(x, y, id))
        },
        canMoveThePiece(x, y, id) {
            dispatch(canMovePiece(x, y, id))
        }
    }
}

var BoardSquareDropTarget =  DropTarget('piece', squareTarget, collect)(BoardSquare);

var BoardSquareContainer = connect(mapState, mapDispatch)(BoardSquareDropTarget)

export default BoardSquareContainer;