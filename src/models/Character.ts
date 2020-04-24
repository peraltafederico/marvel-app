import { get } from 'lodash'
import { Resource, Asset, Context } from '../interfaces/models'

export class Character {
  id?: number

  name?: string

  description?: string

  modified?: string

  resourceURI?: string

  urls?: Resource[]

  thumbnail?: Asset

  comics?: Context

  stories?: Context

  events?: Context

  series?: Context

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

  getThumbnail(): string {
    const path = get(this, 'thumbnail.path')
    const ext = get(this, 'thumbnail.extension')

    return `${path}/portrait_incredible.${ext}`
  }

  getId(): string {
    return this.id.toString()
  }
}
