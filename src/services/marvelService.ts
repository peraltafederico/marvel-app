import { get, head } from 'lodash'
import querystring from 'querystring'
import { AxiosResponse } from 'axios'
import axios from './api'
import { Character } from '../models/Character'
import { CharactersOptions } from '../interfaces/services'
import { MarvelAPiResponse } from '../models/Response'
import { Comic } from '../models/Comic'

export class MarvelService {
  static async getCharactersByNames(names: string[]): Promise<Character[]> {
    const responses = await Promise.all(
      names.map(async (name) =>
        axios.get<MarvelAPiResponse<Character>>(`/characters?&name=${name}`)
      )
    )

    return MarvelService.normalizeCharactersResponse(responses)
  }

  static async getCharactersByIds(ids: string[]): Promise<Character[]> {
    const responses = await Promise.all(
      ids.map(async (id) => axios.get<MarvelAPiResponse<Character>>(`/characters/${id}`))
    )

    return MarvelService.normalizeCharactersResponse(responses)
  }

  static async getCharacters(options: CharactersOptions): Promise<Character[]> {
    const params = querystring.stringify(options)
    const res = await axios.get(`/characters?${params}`)
    const characters: Character[] = get(res, 'data.data.results')

    return characters.map((character) => new Character(character))
  }

  static getComicById = async (id: string): Promise<Comic> => {
    const res = await axios.get<MarvelAPiResponse<Comic>>(`/comics/${id}`)

    return new Comic(head(get(res, 'data.data.results')))
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  // eslint-disable-next-line class-methods-use-this
  static normalizeCharactersResponse(
    responses: AxiosResponse<MarvelAPiResponse<Character>>[]
  ): Character[] {
    return responses
      .filter((res) => get(res, 'data.data.results').length > 0)
      .map((res) => {
        const char: Character = head(get(res, 'data.data.results'))
        return new Character(char)
      })
  }
}
