import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BoardSquare from './boardSquare';
import Piece from './infantry';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import Obama from './obama';


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
        for (var i = 0; i <this.props.positions.length; i++) {
            const [pieceX, pieceY, pieceId] = this.props.positions[i];
            if (x=== pieceX && y === pieceY) {
                return <Piece id={pieceId}/>
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
    positions = state.positions
}

const mapDispatch = (dispatch) => {

}

var BoardDragDropContext = DragDropContext(HTML5Backend)(Board);

var BoardContainer = connect(mapState,mapDispatch)(BoardDragDropContext)

export default BoardContainer