const orders = (state = [], action) => {
  switch (action.type) {
    case 'SET_LIST':
      return [
        ...action.list
      ]
    default:
      return state
  }
}

export default orders
