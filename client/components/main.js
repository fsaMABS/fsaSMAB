import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'

const Main = (props) => {
  const {} = props

  return (
    <div>
      <h1>ADVANCED WARS</h1>
    </div>
  )
}

const mapState = (state) => {
  return {
  }
}

const mapDispatch = (dispatch) => {
  return {
  }
}

export default withRouter(connect(mapState, mapDispatch)(Main))


Main.propTypes = {
}
