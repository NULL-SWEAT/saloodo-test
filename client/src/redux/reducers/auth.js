const auth = (state = {}, action) => {
  switch (action.type) {
    case 'AUTH_USER':
      return {
        ...state,
        id: action.userData.id,
        name: action.userData.name,
        role: action.userData.role,
      }
    case 'LOGOUT':
      return {}
    default:
      return state
  }
}

export default auth
