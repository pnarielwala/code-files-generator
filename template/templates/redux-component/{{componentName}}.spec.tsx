import React from 'react'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { axe } from 'jest-axe'

import { render } from '@testing-library/react'

import reducers from 'data/reducers'
import sagas from 'data/sagas'

import {{componentName}} from './{{componentName}}'

let store
beforeEach(() => {
  const sagaMiddleware = createSagaMiddleware()
  store = createStore(reducers, applyMiddleware(sagaMiddleware))
  sagaMiddleware.run(sagas)
})

it('should pass check for programatic accessibility violations', async () => {

    /**
   * Axe tests can sometimes take longer than the Jest default of
   * 5 seconds to complete. If needed, a longer timeout value can
   * be added. For example, to extend the timeout to 8 seconds:
   * it('description', () => { test }, 8000)
  */

  const { container } = render(
    <Provider store={store}>
      <{{componentName}} />
    </Provider>
  )

  let results

  // Check that the component has loaded in the state you
  // would like axe to verify; this can also be achieved
  // with a timeout if needed.
  expect(container).toHaveTextContent('Loaded in the page before axe runs.')

  await act(async () => {
    results = await axe(container)
  })
  expect(results).toHaveNoViolations()
})

it('implement me!', () => {
  const wrapper = render(
    <Provider store={store}>
      <{{componentName}} />
    </Provider>
  )

})
