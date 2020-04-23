import { get, head } from 'lodash'
import querystring from 'querystring'
import axios from './api'
import { Character } from '../models/Character'

export class MarvelApi {
  static async getCharactersByNames(names: string[]): Promise<Character[]> {
    const responses = await Promise.all(
      names.map(async (name) => axios.get(`/characters?&name=${name}`))
    )

    return responses
      .filter((res) => get(res, 'data.data.results').length > 0)
      .map((res) => new Character(head(get(res, 'data.data.results'))))
  }

  static async getCharacters(options): Promise<Character[]> {
    const params = querystring.stringify(options)

    const res = await axios.get(`/characters?${params}`)
    const results = get(res, 'data.data.results')

    return results.map((result) => new Character(result))
  }
}
