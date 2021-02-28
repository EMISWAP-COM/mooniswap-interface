import { Web3Provider } from '@ethersproject/providers'
import { createWeb3ReactRoot, Web3ReactProvider } from '@web3-react/core'
import React from 'react'
import { isMobile } from 'react-device-detect'
import ReactDOM from 'react-dom'
import ReactGA from 'react-ga'
import { Provider } from 'react-redux'
import { NetworkContextName } from './constants'
import 'inter-ui'
import './i18n'
import App from './pages/App'
import store from './state'
import ApplicationUpdater from './state/application/updater'
import TransactionUpdater from './state/transactions/updater'
import ListsUpdater from './state/lists/updater'
import UserUpdater from './state/user/updater'
import MulticallUpdater from './state/multicall/updater'
import InvestUpdater from './state/invest/updater'
import ThemeProvider, { FixedGlobalStyle, ThemedGlobalStyle } from './theme'
import HttpsRedirect from './https-redirect'
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary'

const Web3ProviderNetwork = createWeb3ReactRoot(NetworkContextName)

if ('ethereum' in window) {
  (window.ethereum as any).autoRefreshOnNetworkChange = false
}

function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider)
  library.pollingInterval = 15000
  return library
}

const GOOGLE_ANALYTICS_ID: string | undefined = window['env'].REACT_APP_GOOGLE_ANALYTICS_ID
if (typeof GOOGLE_ANALYTICS_ID === 'string') {
  ReactGA.initialize(GOOGLE_ANALYTICS_ID, {
    gaOptions: {
      allowLinker: true
    }
  })
  ReactGA.ga('require', 'linker')
  ReactGA.ga('linker:autoLink', ['crowdsale.emidao.org'])
  ReactGA.set({
    customBrowserType: !isMobile
      ? 'desktop'
      : 'web3' in window || 'ethereum' in window
        ? 'mobileWeb3'
        : 'mobileRegular'
  })
} else {
  ReactGA.initialize('test', { testMode: true, debug: true })
}

window.addEventListener('error', error => {
  ReactGA.exception({
    description: `${error.message} @ ${error.filename}:${error.lineno}:${error.colno}`,
    fatal: true
  })
})

function Updaters() {
  return (
    <>
      <ListsUpdater/>
      <UserUpdater/>
      <ApplicationUpdater/>
      <TransactionUpdater/>
      <MulticallUpdater/>
      <InvestUpdater/>
    </>
  )
}

ReactDOM.render(
  <HttpsRedirect>
    <Provider store={store}>
      <ThemeProvider>
        <ErrorBoundary title={'Oops, something goes wrong...'}>
          <FixedGlobalStyle/>
          <Web3ReactProvider getLibrary={getLibrary}>
            <Web3ProviderNetwork getLibrary={getLibrary}>
              <Updaters/>
              <ThemedGlobalStyle/>
              <App/>
            </Web3ProviderNetwork>
          </Web3ReactProvider>
        </ErrorBoundary>
      </ThemeProvider>
    </Provider>
  </HttpsRedirect>,
  document.getElementById('root')
)
