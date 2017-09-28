import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_POSITIONS = 'GET_POSITIONS';
const SET_POSITIONS = 'SET_POSITIONS';

/**
 * INITIAL STATE
 */
const defaultPositions = [
    {
        id: 1,
        x: 1,
        y: 1,
        HP: 10,
        type: 'land',
        AP: 3,
        mobility: 5,
        AR: 1,
        visibility: 3,
    },
    {
        id: 2,
        x: 2,
        y: 2,
        HP: 10,
        type: 'land',
        AP: 3,
        mobility: 5,
        AR: 1,
        visibility: 3,
    }
]

/**
 * ACTION CREATORS
 */

const setPositions = positons => ({type: SET_POSITIONS, positions})

/**
 * THUNK CREATORS
 */


export const attackUser = (attackerId, defenderId) => {
    return (dispatch) => {
        
        

        dispatch(setPositions(positions))
    }

}
export const me = () =>
  dispatch =>
    axios.get('/auth/me')
      .then(res =>
        dispatch(getUser(res.data || defaultUser)))
      .catch(err => console.log(err))

export const auth = (method, email, password, name) =>
  dispatch =>
    axios.post(`/auth/${method}`, { email, password, name })
      .then(res => {
        dispatch(getUser(res.data))
        history.push('/home')
      })
      .catch(error =>
        dispatch(getUser({error})))

export const logout = () =>
  dispatch =>
    axios.post('/auth/logout')
      .then(res => {
        dispatch(removeUser())
        history.push('/login')
      })
      .catch(err => console.log(err))

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
