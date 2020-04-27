import { ParsedUrlQueryInput } from 'querystring'
import { OrderBy } from '../types'

export interface CharactersParams extends ParsedUrlQueryInput {
  name?: string
  nameStartsWith?: string
  modifiedSince?: string
  comics?: string
  series?: string
  events?: string
  stories?: string
  orderBy?: OrderBy
  limit?: string | number
  offset?: string | number
}
