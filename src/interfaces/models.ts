interface Item {
  resourceURI?: string
  name?: string
  role?: string
}

interface Data {
  type?: string
}

export interface Resource {
  resourceURI?: string
  name?: string
}

export interface Asset {
  path?: string
  extension?: string
}

export interface Context {
  available?: number
  returned?: number
  collectionURI?: string
  items?: Item[]
}

export interface Date extends Data {
  date?: string
}

export interface TextObject extends Data {
  language?: string
  text?: string
}

export interface Price extends Data {
  price?: number
}
