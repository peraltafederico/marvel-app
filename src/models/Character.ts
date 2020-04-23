import { Urls, Thumbnail, Stories, Events, Series, Comics } from '../interfaces'

export class Character {
  id?: number

  name?: string

  description?: string

  modified?: string

  resourceURI?: string

  urls?: Urls[]

  thumbnail?: Thumbnail

  comics?: Comics

  stories?: Stories

  events?: Events

  series?: Series

  constructor(data?: Character) {
    this.id = data.id
    this.name = data.name
    this.description = data.description
    this.modified = data.modified
    this.resourceURI = data.resourceURI
    this.urls = data.urls
    this.thumbnail = data.thumbnail
    this.comics = data.comics
    this.stories = data.stories
    this.events = data.events
    this.series = data.series
  }
}
