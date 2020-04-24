import { ParsedUrlQueryInput } from 'querystring'

export interface CharactersOptions extends ParsedUrlQueryInput {
  name?: string
  nameStartsWith?: string
  modifiedSince?: string
  comics?: string
  series?: string
  events?: string
  stories?: string
  orderBy?: string
  limit?: string | number
  offset?: string | number
}
