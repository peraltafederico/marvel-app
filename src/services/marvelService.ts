import { get, head } from 'lodash'
import querystring from 'querystring'
import axios from './api'
import { Character } from '../models/Character'
import { CharactersOptions } from '../interfaces/services'

export class MarvelService {
  static async getCharactersByNames(names: string[]): Promise<Character[]> {
    const responses = await Promise.all(
      names.map(async (name) => axios.get(`/characters?&name=${name}`))
    )

    return responses
      .filter((res) => get(res, 'data.data.results').length > 0)
      .map((res) => new Character(head(get(res, 'data.data.results'))))
  }

  static async getCharacters(options: CharactersOptions): Promise<Character[]> {
    const params = querystring.stringify(options)

    const res = await axios.get(`/characters?${params}`)
    const results = get(res, 'data.data.results')

    return results.map((result) => new Character(result))
  }

  static async getCharactersByIds(ids: string[]): Promise<Character[]> {
    const characters = []

    const response = await Promise.all(
      ids.map(async (character) => axios.get(`/characters/${character}`))
    )

    response.forEach((res) => characters.push(new Character(head(get(res, 'data.data.results')))))

    return characters
  }
}
