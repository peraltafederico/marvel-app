import moment from 'moment'
import { get } from 'lodash'
import { TextObject, Date, Price, Resource, Asset, Data } from '../interfaces/models'

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

  getThumbnail(): string {
    const path = get(this, 'thumbnail.path')
    const ext = get(this, 'thumbnail.extension')

    return `${path}.${ext}`
  }

  getId(): string {
    return this.id.toString()
  }

  getData(): Record<string, string[]> {
    const data: Record<string, string[]> = {}

    const { date } = this.dates.find((date) => date.type === 'onsaleDate')

    data.published = [moment(date).format('MMMM DD, YYYY').toString()]

    this.creators.items.forEach((creator) => {
      if (!data[creator.role]) {
        data[creator.role] = [creator.name]
        return
      }

      data[creator.role].push(creator.name)
    })

    return data
  }
}
