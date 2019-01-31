import React from 'react'
import { Menu, Container, Button} from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../../redux/actions'

class Navbar extends React.Component {
  render() {
    return(
      <Menu fixed='top' inverted>
        <Container>
          <Menu.Item as='p' header>
            Saloodo Test
          </Menu.Item>

          <Menu.Menu position='right'>
            <Menu.Item>{this.props.auth.name}</Menu.Item>
            <Menu.Item>
              <Button color='red' inverted onClick={() => this.props.logout()}>Logout</Button>
            </Menu.Item>
          </Menu.Menu>
        </Container>
      </Menu>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar))
