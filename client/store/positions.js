import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const SET_POSITIONS = 'SET_POSITIONS';
const SET_HEALTH = 'SET_HEALTH';

/**
 * INITIAL STATE
 */
const defaultPositions = {
    id_1: {
        id: 1,
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
const setHealth = positions => ({type: SET_HEALTH, positions})

/**
 * THUNK CREATORS
 */


export const attackPiece = (attackerId, defenderId) => {
    return (dispatch, getState) => {
        var positions = getState().positions
        var attacker = positions[attackerId];
        var defender = positions[defenderId];
        defender.HP = defender.HP - attacker.AP; 
        attacker.HP = Math.floor((attacker.HP - defender.AP)/2); 
        positions[attackerId] = attacker
        positions[defenderId] = defender
        dispatch(setHealth(positions))
    }
}


export const movePiece = (x, y, id) => {
  return (dispatch, getState) => {
    var positions = getState().positions
    id = 'id_' + id    
    var piece = positions[id];
    //console.log('piece before change', piece)
    piece.x = x;
    piece.y = y;
    positions[id] = piece;
    //console.log('piece after change', piece)
    dispatch(setPositions(positions))
  }
}

export const canMovePiece = (x, y, id) => {
  return (dispatch, getState) => {
    var positions = getState().positions
    id = 'id_' + id
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
      return Object.assign({}, state, {positions: action.positions});
    case SET_HEALTH:
      return Object.assign({}, state, {positions: action.positions})
    default:
        return state
    }
}
