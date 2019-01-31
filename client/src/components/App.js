import React, { Component } from 'react'
import './App.css'
import { Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import Auth from './Auth'
import Manager from './Manager'
import Biker from './Biker'
import Navbar from './Navbar'

class App extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        {this.props.authUser.role &&
          <Route render={(props) => <Navbar location={props.location} /> } />
        }

        <Switch>
          <Route exact path='/'
            render={() => {
              if(this.props.authUser.role === 'manager')
                return <Manager/>
              else if(this.props.authUser.role === 'biker')
                return <Biker/>
              else
                return <Auth/>
            }}
          />
          <Route render={() => <Redirect to='/' />} />
        </Switch>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  authUser: state.auth
})

export default connect(mapStateToProps, null)(App)
