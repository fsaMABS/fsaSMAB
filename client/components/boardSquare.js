import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Square from './Square';
import { DropTarget } from 'react-dnd';
import {attackPiece, movePiece, canMovePiece} from '../store'
import {connect} from 'react-redux';

const squareTarget = {
    canDrop(props, monitor, component) {
        var id = monitor.getItem().pieceId 
        var piece = props.positions[id]
        var mobility = piece.mobility;

        //CANT MOVE TO WHERE PIECE ALREADY EXISTS
        for(var i in props.positions) {
            if(props.positions[i].x === props.x && props.positions[i].y === props.y) {
                return false;
            }
        }
        
        //CANT MOVE BEYOND ITS MOBILITEE
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

        //Check for defender next to it... this doesn't account if there are multiple adjacent
        //  defenders or whether or not the person wants to attack. For now, we are calling 
        //  this function automatically and then will build the options up
        for(var i in props.positions) {
            let diffX = Math.abs(props.positions[i].x - props.x)
            let diffY = Math.abs(props.positions[i].y - props.y)
            if(((diffX === 1 && diffY === 0) || (diffX === 0 && diffY === 1)) && (props.positions[id].attackStatus === true))  {
                props.attackThePiece(id, props.positions[i].id)
            }
        }
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
        //console.log('props in boardsquare', this.props)        
        const {  x, y, connectDropTarget, isOver, cell } = this.props;
        return connectDropTarget(
            <div style={{
                position: 'relative',
                width: '100%',
                height: '100%'
            }}>
                <Square cell={cell}>
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
        }, 
        attackThePiece(attackerId, defenderId) {
            dispatch(attackPiece(attackerId, defenderId))
        }
    }
}

var BoardSquareDropTarget =  DropTarget('piece', squareTarget, collect)(BoardSquare);

var BoardSquareContainer = connect(mapState, mapDispatch)(BoardSquareDropTarget)

export default BoardSquareContainer;