import { Resource, Asset, Data } from './commons'

export interface CharacterApiResponse {
  id?: number
  name?: string
  description?: string
  modified?: string
  resourceURI?: string
  urls?: Resource[]
  thumbnail?: Asset
  comics?: Data
  stories?: Data
  events?: Data
  series?: Data
}
