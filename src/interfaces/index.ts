interface Item {
  resourceURI?: string
  name?: string
  role?: string
}

interface Relations {
  resourceURI?: string
  name?: string
}

interface Data {
  type?: string
}

interface Assets {
  path?: string
  extension?: string
}

interface Context {
  available?: number
  returned?: number
  collectionURI?: string
  items?: Item[]
}

export type Urls = Relations

export type Series = Relations

export type Variants = Relations

export type Collections = Relations

export type CollectedIssues = Relations

export type Thumbnail = Assets

export type Images = Assets

export type Creators = Context

export type Characters = Context

export type Stories = Context

export type Events = Context

export type Comics = Context

export interface Dates extends Data {
  date?: Date
}

export interface TextObjects extends Data {
  language?: string
  text?: string
}

export interface Prices extends Data {
  price?: number
}

export interface CharactersOptions {
  name?: string
  nameStartsWith?: string
  modifiedSince?: string
  comics?: string
  series?: string
  events?: string
  stories?: string
  orderBy?: string
  limit?: string
  offset?: string
}
