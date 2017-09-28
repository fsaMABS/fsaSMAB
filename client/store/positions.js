import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const SET_POSITIONS = 'SET_POSITIONS';

/**
 * INITIAL STATE
 */
const defaultPositions = {
    id_1: {
        x: 1,
        y: 1,
        HP: 10,
        type: 'infantry',
        AP: 3,
        mobility: 5,
        AR: 1,
        visibility: 3,
    },
    id_2: {
        id: 2,
        x: 2,
        y: 2,
        HP: 10,
        type: 'infantry',
        AP: 3,
        mobility: 5,
        AR: 1,
        visibility: 3,
    }
}

/**
 * ACTION CREATORS
 */

const setPositions = positions => ({type: SET_POSITIONS, positions})

/**
 * THUNK CREATORS
 */


export const attackUser = (attackerId, defenderId) => {
    return (dispatch, getState) => {
        var positions = getState().positions
        var attacker = positions[attackerId];
        var defender = positions[defenderId];
        defender.HP = defender.HP - attacker.AP; 
        attacker.HP = Math.floor((attacker.HP - defender.AP)/2); 
        positions[attackerId] = attacker
        positions[defenderId] = defender
        dispatch(setPositions(positions))
    }
}


export const movePiece = (id, x, y) => {
  return (dispatch, getState) => {
    var positions = getState().positions
    var piece = positions[id];
    piece.x = x;
    piece.y = y;
    positions[id] = piece;
    dispatch(setPositions(positions))
  }
}

export const canMovePiece = (id, x, y) => {
  return (dispatch, getState) => {
    var positions = getState().positions
    var piece = positions[id];
    var mobility = piece.mobility;
    var diffX = Math.abs(piece.x-x);
    var diffY = Math.abs(piece.y - y);
    if ((diffY + diffX) <= mobility) {
      return true;
    } else {
      return false
    }
  }
}

/**
 * REDUCER
 */
export default function (state = defaultPositions, action) {
  switch (action.type) {
    case SET_POSITIONS:
      return action.positions
    default:
        return state
    }
}
