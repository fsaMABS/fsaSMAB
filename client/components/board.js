import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BoardSquare from './boardSquare';
import Infantry from './infantry';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import {connect} from 'react-redux'

class Board extends Component {
    renderSquare(i) {
        const x = i % 8;
        const y = Math.floor(i / 8);
        return (
            <div key={i}
                style={{ width: '12.5%', height: '12.5%' }}>
                <BoardSquare x={x}
                            y={y}>
                {this.renderPiece(x, y)}
                </BoardSquare>
            </div>
        );
    }
      
    renderPiece(x, y) {
        var positions = this.props.positions
        for (var id in positions) {
            var piece = positions[id];
            if (x === piece.x && y === piece.y) {
                return <Infantry id={piece.id}/>                
            }
        }        
    }

    render() {
        const squares = [];
        for (let i = 0; i < 64; i++) {
            squares.push(this.renderSquare(i));
        }

        return (
            <div style={{
                width: '800px',
                height: '800px',
                display: 'flex',
                flexWrap: 'wrap'
            }}>
                {squares}
            </div>
        );
    }
}


const mapState = (state) => {
    return {
        positions: state.positions
    }
}


var RealBoard = DragDropContext(HTML5Backend)(Board);
var BoardContainer = connect(mapState)(RealBoard)



export default BoardContainer