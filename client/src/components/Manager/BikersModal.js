import React from 'react'
import { Modal, Button, List } from 'semantic-ui-react'

class BikersModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      opened: false
    }
  }

  toggleModal() {
    this.setState({ opened: !this.state.opened })
  }

  render() {
    const { bikers, selectedBiker, orderId, onSelectBiker } = this.props

    return (
      <Modal open={this.state.opened} centered={false} size='tiny'
        trigger={
          <Button floated='right' basic size='mini' compact onClick={this.toggleModal.bind(this)}>
            {selectedBiker ? 'Change' : 'Assign'}
          </Button>
        }
      >
        <Modal.Header>Assign to:</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <List selection divided relaxed='very'>
              {bikers.map((biker, i) =>
                <List.Item key={i}
                  active={selectedBiker && biker.id === selectedBiker.id}
                  onClick={() => {
                    onSelectBiker(orderId, biker)
                    this.toggleModal()
                  }}
                >
                  <List.Content>
                    <List.Header>{biker.name}</List.Header>
                  </List.Content>
                </List.Item>
              )}
            </List>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    )
  }
}

export default BikersModal
