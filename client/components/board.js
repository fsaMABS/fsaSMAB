import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BoardSquare from './boardSquare';
import Infantry from './infantry';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import {connect} from 'react-redux'
import map from './map'

class Board extends Component {
    renderSquare(cell, i, j) {
        // const x = i % 8;
        // const y = Math.floor(i / 8);
        return (
            <div key={i + 'row' + j}
                style={{ flex: 1 }}>
                <BoardSquare x={i} y={j} cell={cell}>
                {this.renderPiece(i, j)}
                </BoardSquare>
            </div>
        );
    }
      
    renderPiece(x, y) {
        console.log(this.props.positions)
        var positions = this.props.positions
        for (var id in positions) {
            var piece = positions[id];
            if (x === piece.x && y === piece.y) {
                return <Infantry id={piece.id}/>                
            }
        }        
    }

    render() {
        let parsedMap = map.map((row, i) => {
            return (<div key={i} style={{flex: 1, display: 'flex', flexDirection: 'row'}}>
                {row.split('').map((cell, j) => this.renderSquare(cell, i, j))}
            </div>)
        })
        // for (let i = 0; i < 160; i++) {
        //     squares.push(this.renderSquare(i));
        // }

        return (
            <div style={{
                width: '1600px',
                height: '1000px',
                display: 'flex',
                flexDirection: 'column'
                // flexWrap: 'wrap'
            }}>
                {parsedMap}
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