import { ParsedUrlQueryInput } from 'querystring'
import { OrderBy } from '../types'

export interface ComicParams extends ParsedUrlQueryInput {
  format?: string
  formatType?: string
  noVariants: boolean
  dateDescriptor: string
  dateRange: string | number
  title?: string
  titleStartsWith?: string
  startYear: string
  issueNumber?: string | number
  diamondCode?: string
  digitalId?: string | number
  upc?: string
  isbn?: string
  ean?: string
  issn?: string
  hasDigitalIssue?: boolean
  modifiedSince?: string
  creators?: string
  characters?: string
  series?: string
  events?: string
  stories?: string
  sharedAppearances?: string
  collaborators?: string
  orderBy?: OrderBy
  limit?: string | number
  offset?: string | number
}
