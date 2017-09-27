import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Router} from 'react-router'
import {Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import history from './history'
import {Main} from './components'
import {} from './store'

class Routes extends Component {
  componentDidMount () {
  }

  render () {
    const {} = this.props

    return (
      <Router history={history}>
        <Main>
          <Switch>
            {/* <Route component={} /> */}
          </Switch>
        </Main>
      </Router>
    )
  }
}

const mapState = (state) => {
  return {
  }
}

const mapDispatch = (dispatch) => {
  return {
  }
}

export default connect(mapState, mapDispatch)(Routes)

/**
 * PROP TYPES
 */
Routes.propTypes = {
}
