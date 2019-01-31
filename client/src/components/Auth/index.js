import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { authUser } from '../../redux/actions'
import { Button, Form, Grid, Segment, Message } from 'semantic-ui-react'
import axios from 'axios'

class Auth extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      password: '',
      error: false,
    }
  }

  onChange(event) {
    this.setState({ [event.target.id]: event.target.value })
  }

  onSubmit(event) {
    event.preventDefault()
    const { name, password } = this.state
    axios.post('http://localhost:3000/auth', { name, password })
    .then(res => {
      this.props.setAuthUser({ ...res.data })
      this.props.history.push('/')
    })
    .catch(error => this.setState({ error: true }, () => console.log(error)))
  }

  render() {
    const { name, password } = this.state

    return (
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          {this.state.error &&
            <Message error content='Name and/or Password incorrect' />
          }

          <Form size='large' onSubmit={this.onSubmit.bind(this)}>
            <Segment stacked>
              <Form.Input
                fluid
                icon='user'
                iconPosition='left'
                placeholder='Name'
                id='name'
                value={name}
                onChange={this.onChange.bind(this)}
              />
              <Form.Input
                fluid
                icon='lock'
                iconPosition='left'
                placeholder='Password'
                type='password'
                id='password'
                value={password}
                onChange={this.onChange.bind(this)}
              />

              <Button color='teal' fluid size='large' type='submit'>
                Login
              </Button>
            </Segment>
          </Form>

        </Grid.Column>
      </Grid>
    )
  }
}

const mapStateToProps = (state) => ({
  authUser: state.auth
})

const mapDispatchToProps = dispatch => ({
  setAuthUser: userData => dispatch(authUser(userData))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Auth))
