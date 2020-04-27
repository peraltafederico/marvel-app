import { ParsedUrlQueryInput } from 'querystring'
import { OrderBy } from '../types'

export interface ComicParams extends ParsedUrlQueryInput {
  formatd?: string
  formatTyped?: string
  noVariants?: boolean
  dateDescriptor?: string
  dateRange?: string | number
  titled?: string
  titleStartsWithd?: string
  startYear?: string
  issueNumberd?: string | number
  diamondCoded?: string
  digitalIdd?: string | number
  upcd?: string
  isbnd?: string
  eand?: string
  issnd?: string
  hasDigitalIssued?: boolean
  modifiedSinced?: string
  creatorsd?: string
  charactersd?: string
  seriesd?: string
  eventsd?: string
  storiesd?: string
  sharedAppearancesd?: string
  collaboratorsd?: string
  orderBy?: OrderBy
  limitd?: string | number
  offset?: string | number
}
