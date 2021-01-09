import React, {
  useState,
  useRef,
  useCallback,
  FC,
  ChangeEvent
} from 'react'

import { useSettings } from './context'

import Settings from './components/Settings'
import Shades from './components/Shades'
import ActionBar from './components/ActionBar'
import ErrorMsg from './components/ErrorMsg'

const App: FC<{}> = () => {
  const [state, dispatch] = useSettings()
  return (
    <div id="app">
      <Settings />
      {state.color.isValid ? <Shades /> : <ErrorMsg />}
      <ActionBar />
    </div>
  )
}

export default App
