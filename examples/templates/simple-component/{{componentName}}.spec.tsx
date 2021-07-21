import React from 'react'

import { render, act } from '@testing-library/react'
import { axe } from 'jest-axe'

import {{componentName}}, { PropsT } from './{{componentName}}'

const defaultProps: PropsT = {}

const doRender = (overrides: Partial<PropsT> = {}) =>
  render(<{{componentName}} {...defaultProps} {...overrides} />)

it('should pass check for programatic accessibility violations', async () => {
  
  /**
   * Axe tests can sometimes take longer than the Jest default of
   * 5 seconds to complete. If needed, a longer timeout value can
   * be added. For example, to extend the timeout to 8 seconds:
   * it('description', () => { test }, 8000)
  */

  const { container } = doRender()

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

it.todo('implement me!')
