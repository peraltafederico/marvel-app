import { get, head } from 'lodash'
import querystring from 'querystring'
import axios from './api'
import { Character } from '../models/Character'
import { CharactersOptions } from '../interfaces/services'
import { MarvelAPiResponse } from '../models/Response'

export class MarvelService {
  static async getCharactersByNames(names: string[]): Promise<Character[]> {
    const responses = await Promise.all(
      names.map(async (name) =>
        axios.get<MarvelAPiResponse<Character>>(`/characters?&name=${name}`)
      )
    )

    return responses
      .filter((res) => get(res, 'data.data.results').length > 0)
      .map((res) => {
        const char: Character = head(get(res, 'data.data.results'))
        return new Character(char)
      })
  }

  static async getCharacters(options: CharactersOptions): Promise<Character[]> {
    const params = querystring.stringify(options)
    const res = await axios.get(`/characters?${params}`)
    const characters: Character[] = get(res, 'data.data.results')

    return characters.map((character) => new Character(character))
  }

  static async getCharactersByIds(ids: string[]): Promise<Character[]> {
    const characters: Character[] = []

    const responses = await Promise.all(
      ids.map(async (id) => axios.get<MarvelAPiResponse<Character>>(`/characters/${id}`))
    )

    responses.forEach((res) => characters.push(new Character(head(get(res, 'data.data.results')))))

    return characters
  }
}
