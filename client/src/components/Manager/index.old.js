import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { setList } from '../../redux/actions'
import { Container, List, Card, Grid } from 'semantic-ui-react'
import axios from 'axios'
import BikersModal from './BikersModal'

class Manager extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      bikers: [],
    }
  }

  componentDidMount() {
    this.fetchOrdersList()
    this.fetchBikersList()
  }

  fetchOrdersList() {
    axios.get('http://localhost:3000/orders')
    .then(res => this.props.setOrdersList(res.data))
  }

  fetchBikersList() {
    axios.get('http://localhost:3000/bikers')
    .then(res => this.setState({ bikers: res.data }))
  }

  onBikerChange(orderId, selectedBiker) {
    axios.put('http://localhost:3000/orders', { id: orderId, assignee: selectedBiker })
    .then(res => {
      if(res.status === 200) this.fetchOrdersList()
    })
  }

  render() {
    const { orders } = this.props

    return (
      <Container>
        <Card fluid>
          <Card.Content>
            <Card.Header>Shipments</Card.Header>

            <List divided>
              {orders.length > 0 && orders.map((order, i) =>
                <List.Item key={i}>
                  <List.Content>
                    <Grid columns='equal' stackable>
                      <Grid.Column mobile={4}>
                        <List.Header as='span'>Origin:</List.Header>
                        <List.Description as='span'>{order.origin}</List.Description>
                      </Grid.Column>

                      <Grid.Column>
                      <List.Header as='span'>Destination:</List.Header>
                        <List.Description as='span'>{order.destination}</List.Description>
                      </Grid.Column>

                      <Grid.Column>
                        <List.Header as='span'>Status:</List.Header>
                        <List.Description as='span'>{order.status}</List.Description>
                      </Grid.Column>

                      <Grid.Column>
                        <List.Header as='span'>Assigned to:</List.Header>
                        <List.Description as='span'>
                          {order.assignee ? order.assignee.name : 'None'}
                          <BikersModal
                            bikers={this.state.bikers}
                            selectedBiker={order.assignee ? order.assignee : null}
                            orderId={order.id}
                            onSelectBiker={this.onBikerChange.bind(this)}
                          />
                        </List.Description>

                      </Grid.Column>
                    </Grid>
                  </List.Content>
                </List.Item>
              )}
            </List>
          </Card.Content>
        </Card>
      </Container>
    )
  }
}

const mapStateToProps = (state) => ({
  orders: state.orders
})

const mapDispatchToProps = dispatch => ({
  setOrdersList: list => dispatch(setList(list))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Manager))
