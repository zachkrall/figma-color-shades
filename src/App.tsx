import React, {
  useState,
  useRef,
  useCallback,
  FC,
  ChangeEvent
} from 'react'

import Settings from './components/Settings'
import Shades from './components/Shades'
import ActionBar from './components/ActionBar'
import ErrorMsg from './components/ErrorMsg'

const App: FC<{}> = () => {
  const [settings, updateSettings] = useState({
    color: {
      hex: '808080',
      isValid: true
    },
    variance: 8
  })
  const textbox = useRef<HTMLInputElement>(null)

  return (
    <div id="app">
      <Settings
        color={settings.color}
        variance={settings.variance}
        change={e => updateSettings(e)}
      />
      {settings.color.isValid ? (
        <Shades
          baseColor={settings.color.hex}
          variance={settings.variance}
        />
      ) : (
        <ErrorMsg colorCode={settings.color.hex} />
      )}
      <ActionBar
        baseColor={settings.color.hex}
        variance={settings.variance}
        error={!settings.color.isValid}
      />
    </div>
  )
}

export default App
