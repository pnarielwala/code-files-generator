import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { StateT } from 'data/types'

import { Box, Text } from 'design-system'

type PropsT = {

}

const {{componentName}} = (props: PropsT) => {
  const SomeState = useSelector((state: StateT) => state.someState)
  const dispatch = useDispatch()

  return <div />
}

export default {{componentName}}
