/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, createContext, useReducer } from 'react'

type Actions = { type: 'CHANGE_NAME'; payload?: any }
type Dispatch = (action: Actions) => void
type State = { name: string }

const initialState = {
  name: 'Username',
}

const UserStateContext = createContext<State>({ ...initialState })
const UserDispatchContext = createContext<Dispatch | undefined>(undefined)

const userReducer = (state: State, action: Actions): State => {
  switch (action.type) {
    case 'CHANGE_NAME':
      return {
        ...state,
        name: action.payload.name,
      }
    default:
      return state
  }
}

const UserProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState)

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  )
}

export { UserStateContext, UserDispatchContext, UserProvider }
