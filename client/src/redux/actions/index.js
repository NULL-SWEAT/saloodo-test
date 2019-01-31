export const authUser = userData => ({
  type: 'AUTH_USER',
  userData
})

export const logout = () => ({
  type: 'LOGOUT',
})

export const setList = list => ({
  type: 'SET_LIST',
  list
})
