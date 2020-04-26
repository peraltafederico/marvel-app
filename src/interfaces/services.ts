import { ParsedUrlQueryInput } from 'querystring'

export interface CharactersParams extends ParsedUrlQueryInput {
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

export interface ComicParams extends ParsedUrlQueryInput {
  titleStartsWith?: string
  modifiedSince?: string
  comics?: string
  series?: string
  events?: string
  stories?: string
  orderBy?: string
  title?: string
  limit?: string | number
  offset?: string | number
  issueNumber?: string | number
}
