import React from 'react'
import ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'
import App from './containers/App'

import styledNormalize from 'styled-normalize'
import { injectGlobal } from 'styled-components'
import { Colors } from './styles/variables'

const injectNormalizeCSS = () => injectGlobal`
  ${styledNormalize}

  html {
    font-size: 62.5%;
  }
  body {
    padding: 0;
    font-family: sans-serif;
    color: ${Colors.textDark};
  }
`
const renderApp = () => {
  injectNormalizeCSS()

  ReactDOM.render(<App />, document.getElementById('root'))
  registerServiceWorker()
}

renderApp()
