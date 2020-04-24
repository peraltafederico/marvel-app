interface Data<T> {
  offset?: number
  limit?: number
  total?: number
  count?: number
  results?: T[]
}

export interface MarvelAPiResponse<T> {
  code?: number

  status?: string

  copyright?: string

  attributionText?: string

  attributionHTML?: string

  data?: Data<T>

  etag?: string
}
