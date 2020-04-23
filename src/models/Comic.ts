import {
  TextObjects,
  Urls,
  Series,
  Variants,
  Collections,
  CollectedIssues,
  Dates,
  Prices,
  Thumbnail,
  Images,
  Creators,
  Characters,
  Stories,
  Events,
} from '../interfaces'

export class Comic {
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

  textObjects?: TextObjects[]

  resourceURI?: string

  urls?: Urls[]

  series?: Series

  variants?: Variants[]

  collections?: Collections[]

  collectedIssues?: CollectedIssues[]

  dates?: Dates[]

  prices?: Prices[]

  thumbnail?: Thumbnail

  images?: Images[]

  creators?: Creators

  characters?: Characters

  stories?: Stories

  events?: Events

  constructor(data?: Comic) {
    this.id = data.id
    this.digitalId = data.digitalId
    this.title = data.title
    this.issueNumber = data.issueNumber
    this.variantDescription = data.variantDescription
    this.description = data.description
    this.modified = data.modified
    this.isbn = data.isbn
    this.upc = data.upc
    this.diamondCode = data.diamondCode
    this.ean = data.ean
    this.issn = data.issn
    this.format = data.format
    this.pageCount = data.pageCount
    this.textObjects = data.textObjects
    this.resourceURI = data.resourceURI
    this.urls = data.urls
    this.series = data.series
    this.variants = data.variants
    this.collections = data.collections
    this.collectedIssues = data.collectedIssues
    this.dates = data.dates
    this.prices = data.prices
    this.thumbnail = data.thumbnail
    this.images = data.images
    this.creators = data.creators
    this.characters = data.characters
    this.stories = data.stories
    this.events = data.events
  }
}
