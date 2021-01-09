import React, { Context, useReducer, createContext } from 'react'
import {
  BASE_COLOR_DEFAULT,
  BASE_COLOR_IS_VALID_DEFAULT,
  VARIANCE_DEFAULT
} from './constants'

type State = {
  color?: {
    hex: string
    isValid: boolean
  }
  variance?: number
}

const StateContext: Context<State> = createContext(null)
const DispatchContext: Context<any> = createContext(null)

function reducer(state: State, action: any): State {
  switch (action.type) {
    case 'update': {
      return { ...state, ...action.payload } as State
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

function SettingsProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, {
    color: {
      hex: BASE_COLOR_DEFAULT,
      isValid: BASE_COLOR_IS_VALID_DEFAULT
    },
    variance: VARIANCE_DEFAULT
  })

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  )
}
function useState(): State {
  const context = React.useContext(StateContext)
  if (context === undefined) {
    throw new Error('useState must be used within a Provider')
  }
  return context
}
function useDispatch(): any {
  const context = React.useContext(DispatchContext)
  if (context === undefined) {
    throw new Error('useDispatch must be used within a Provider')
  }
  return context
}

function useSettings(): [State, any] {
  return [useState(), useDispatch()]
}

export { SettingsProvider, useSettings }
