import { TextObject, Date, Price, Resource, Asset, Data } from '../interfaces/models'

export interface ComicApiResponse {
  id?: number
  digitalId?: number
  title?: string
  issueNumber?: number
  variantDescription?: string
  description?: string
  modified?: Date
  isbn?: string
  upc?: string
  diamondCode?: string
  ean?: string
  issn?: string
  format?: string
  pageCount?: number
  textObjects?: TextObject[]
  resourceURI?: string
  urls?: Resource[]
  series?: Resource
  variants?: Resource[]
  collections?: Resource[]
  collectedIssues?: Resource[]
  dates?: Date[]
  prices?: Price[]
  thumbnail?: Asset
  images?: Asset[]
  creators?: Data
  characters?: Data
  stories?: Data
  events?: Data
}
