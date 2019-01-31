import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { setList } from '../../redux/actions'
import { Container, Card, Table } from 'semantic-ui-react'
import axios from 'axios'
import moment from 'moment'
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
    axios.put('http://localhost:3000/orders', { id: orderId, assignee: selectedBiker, status: 'ASSIGNED'  })
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

            <Table celled stackable compact>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Origin</Table.HeaderCell>
                  <Table.HeaderCell>Destination</Table.HeaderCell>
                  <Table.HeaderCell>Status</Table.HeaderCell>
                  <Table.HeaderCell>Assignee</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {orders.length > 0 && orders.map((order, i) =>
                  <Table.Row key={i}>
                    <Table.Cell>{order.origin}</Table.Cell>
                    <Table.Cell>{order.destination}</Table.Cell>
                    <Table.Cell>{order.status} {order.timestamp && `(${moment(order.timestamp).format('D/MM/YYYY - HH:mm')})`}</Table.Cell>
                    <Table.Cell>
                      {order.assignee ? order.assignee.name : '-'}
                      <BikersModal
                        bikers={this.state.bikers}
                        selectedBiker={order.assignee ? order.assignee : null}
                        orderId={order.id}
                        onSelectBiker={this.onBikerChange.bind(this)}
                      />
                    </Table.Cell>
                  </Table.Row>
                )}
              </Table.Body>
            </Table>
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
