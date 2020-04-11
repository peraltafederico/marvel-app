/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, createContext, useReducer } from 'react'
import { cloneWithoutKey } from '../utils'

type Dispatch = (action: Action) => void

type ActionTypes =
  | 'ADD_FAV_CHARACTER'
  | 'ADD_FAV_COMIC'
  | 'REMOVE_FAV_CHARACTER'
  | 'REMOVE_FAV_COMIC'

interface Action {
  type: ActionTypes
  payload: any
}
interface Character {
  comics?: string[]
}

interface State {
  favCharacters: {
    [id: string]: Character
  }
}

const persistedState = JSON.parse(localStorage.getItem('favCharacters'))

const initialState = {
  favCharacters: {},
}

const UserStateContext = createContext<State>(persistedState || initialState)
const UserDispatchContext = createContext<Dispatch | undefined>(undefined)

const userReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD_FAV_CHARACTER':
      return {
        ...state,
        favCharacters: {
          ...state.favCharacters,
          [action.payload.id]: { comics: [] },
        },
      }
    case 'ADD_FAV_COMIC':
      return {
        ...state,
        favCharacters: {
          ...state.favCharacters,
          [action.payload.charId]: {
            comics: state.favCharacters[action.payload.charId].comics.concat(action.payload.id),
          },
        },
      }
    case 'REMOVE_FAV_COMIC':
      return {
        ...state,
        favCharacters: {
          ...state.favCharacters,
          [action.payload.charId]: {
            comics: state.favCharacters[action.payload.charId].comics.filter(
              (comic) => comic !== action.payload.id
            ),
          },
        },
      }
    case 'REMOVE_FAV_CHARACTER':
      return {
        ...state,
        favCharacters: cloneWithoutKey(state.favCharacters, action.payload.id),
      }
    default:
      return state
  }
}

const UserProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, persistedState || initialState)

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>{children}</UserDispatchContext.Provider>
    </UserStateContext.Provider>
  )
}

export { UserStateContext, UserDispatchContext, UserProvider }
