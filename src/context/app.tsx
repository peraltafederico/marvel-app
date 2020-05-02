import React, { FC, createContext, useReducer } from 'react'
import { ThemeProvider } from 'styled-components'
import { theme } from '../theme'

type Dispatch = (action: Action) => void

type ActionTypes = 'CHANGE_THEME'
type ThemeTypes = 'light' | 'dark'

interface Payload {
  theme: ThemeTypes
}

interface Action {
  type: ActionTypes
  payload: Payload
}

interface State {
  theme: ThemeTypes
}

const persistedState = JSON.parse(localStorage.getItem('theme'))

const initialState = {
  theme: 'light',
}

const AppStateContext = createContext<State>(persistedState || initialState)
const AppDispatchContext = createContext<Dispatch | undefined>(undefined)

const userReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'CHANGE_THEME':
      return {
        ...state,
        theme: action.payload.theme,
      }
    default:
      return state
  }
}

const AppProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, persistedState || initialState)
  return (
    <AppStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>
        <ThemeProvider theme={theme[state.theme]}>{children}</ThemeProvider>
      </AppDispatchContext.Provider>
    </AppStateContext.Provider>
  )
}

export { AppStateContext, AppDispatchContext, AppProvider }
