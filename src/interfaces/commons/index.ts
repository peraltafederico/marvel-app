interface Item {
  resourceURI?: string
  name?: string
  role?: string
}

export interface Resource {
  resourceURI?: string
  name?: string
}

export interface Asset {
  path?: string
  extension?: string
}

export interface Data {
  available?: number
  returned?: number
  collectionURI?: string
  items?: Item[]
}

export interface Date {
  type?: string

  date?: string
}

export interface TextObject {
  type?: string

  language?: string
  text?: string
}

export interface Price {
  type?: string

  price?: number
}
