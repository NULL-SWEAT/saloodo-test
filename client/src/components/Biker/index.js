import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { setList } from '../../redux/actions'
import { Container, Table, Card, Dropdown, Modal, Button } from 'semantic-ui-react'
import axios from 'axios'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment'

const statuses = [
  { value: 'WAITING', text: 'WAITING' },
  { value: 'ASSIGNED', text: 'ASSIGNED' },
  { value: 'PICKED_UP', text: 'PICKED_UP' },
  { value: 'DELIVERED', text: 'DELIVERED' },
]

class Biker extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      timestampModal: false,
      modalOrder: {},
    }
    this.onStatusChange = this.onStatusChange.bind(this)
  }

  componentDidMount() {
    this.fetchOrdersList()
  }

  fetchOrdersList() {
    const { authUser } = this.props
    axios.get(`http://localhost:3000/orders/${authUser.id}`)
    .then(res => this.props.setOrdersList(res.data))
  }

  toggleTimestampModal() {
    this.setState({ timestampModal: !this.state.timestampModal })
  }

  onStatusChange(orderId, value) {
    if(value === 'PICKED_UP' || value === 'DELIVERED')  {
      this.setState(
        { modalOrder: { id: orderId, status: value, timestamp: new Date() } },
        () => this.toggleTimestampModal()
      )
    } else {
      this.updateOrderStatus({ id: orderId, status: value })
    }
  }

  setTimestamp(time) {
    this.setState({ modalOrder: { ...this.state.modalOrder, timestamp: time }})
  }

  updateOrderStatus({ id, status }) {
    axios.put('http://localhost:3000/orders', { id, status })
    .then(res => {
      if(res.status === 200) this.fetchOrdersList()
    })
  }

  updateOrderTimestamp({ id, status, timestamp }) {
    axios.put('http://localhost:3000/orders', { id, status, timestamp })
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
            <Card.Header>Your Orders</Card.Header>

            <Table celled compact>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Origin</Table.HeaderCell>
                  <Table.HeaderCell>Destination</Table.HeaderCell>
                  <Table.HeaderCell>Status</Table.HeaderCell>
                  <Table.HeaderCell>Timestamp</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {orders.length > 0 && orders.map((order, i) =>
                  <Table.Row key={i}>
                    <Table.Cell>{order.origin}</Table.Cell>
                    <Table.Cell>{order.destination}</Table.Cell>
                    <Table.Cell>
                      <Dropdown fluid selection
                        options={statuses}
                        value={order.status}
                        onChange={(e, data) => this.onStatusChange(order.id, data.value)}
                        onClose={() => {}}
                      />
                    </Table.Cell>
                    <Table.Cell>
                      {order.timestamp && `${moment(order.timestamp).format('D/MM/YYYY - HH:mm')}`}
                    </Table.Cell>
                    <Table.Cell>

                    </Table.Cell>
                  </Table.Row>
                )}
              </Table.Body>
            </Table>
          </Card.Content>
        </Card>

        <Modal basic size='mini' open={this.state.timestampModal} onClose={(e, data) => console.log(e,data)} >
          <Modal.Header>Select Timestamp</Modal.Header>
          <Modal.Content style={{ display: 'flex', justifyContent: 'center' }}>
            <DatePicker
              selected={this.state.modalOrder.timestamp}
              onChange={this.setTimestamp.bind(this)}
              inline
              showTimeSelect
              timeFormat='HH:mm'
              timeIntervals={15}
              dateFormat='MMMM d, yyyy h:mm aa'
              timeCaption='Time'
            />
          </Modal.Content>
          <Modal.Description>{moment(this.state.modalOrder.timestamp).format('D/MM/YYYY - HH:mm')}</Modal.Description>
          <Modal.Actions>
            <Button color='green' inverted
              onClick={() => {
                this.updateOrderTimestamp({ ...this.state.modalOrder })
                this.toggleTimestampModal()
              }}
            >
              OK
            </Button>
          </Modal.Actions>
        </Modal>

      </Container>
    )
  }
}

const mapStateToProps = (state) => ({
  orders: state.orders,
  authUser: state.auth
})

const mapDispatchToProps = dispatch => ({
  setOrdersList: list => dispatch(setList(list))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Biker))
