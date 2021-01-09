import * as React from 'react'
import * as ReactDOM from 'react-dom'
import '@animxyz/core'
import { SettingsProvider } from './context'
import './index.css'

import App from './App'

ReactDOM.render(
  <SettingsProvider>
    <App />
  </SettingsProvider>,
  document.getElementById('react-page')
)
