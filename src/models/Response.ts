interface Data<T> {
  offset?: number
  limit?: number
  total?: number
  count?: number
  results?: T[]
}

export class Response<T> {
  code?: number

  status?: string

  copyright?: string

  attributionText?: string

  attributionHTML?: string

  data?: Data<T>

  etag?: string

  constructor(data: Response<T>) {
    this.code = data.code
    this.status = data.status
    this.copyright = data.copyright
    this.attributionText = data.attributionText
    this.attributionHTML = data.attributionHTML
    this.data = data.data
    this.etag = data.etag
  }
}
