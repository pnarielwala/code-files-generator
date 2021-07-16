import { AxiosResponse } from 'axios'
import xhr from 'utils/axios'

import { {{pascalCaseResource}}T } from 'types/{{pascalCaseResource}}'

type Get{{pascalCaseResource}}ResponseBodyT = {
  {{resource}}: {{pascalCaseResource}}T
}
type Get{{pascalCaseResource}}ResponseT = AxiosResponse<Get{{pascalCaseResource}}ResponseBodyT>

export const get{{pascalCaseResource}} = (id: string): Promise<Get{{pascalCaseResource}}ResponseT> => {
  return xhr.get(`/{{resource}}/${id}`)
}
