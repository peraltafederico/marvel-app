import { get, head, pick } from 'lodash'
import querystring from 'querystring'
import axios from './api'
import { CharactersParams } from '../interfaces/CharactersParams'
import { Pagination } from '../interfaces/Pagination'
import MarvelHelper from '../helpers/marvelHelper'
import { CharacterApiResponse } from '../interfaces/CharacterApiResponse'
import { Character } from '../interfaces/Character'
import { Comic } from '../interfaces/Comic'
import { ComicApiResponse } from '../interfaces/ComicApiResponse'
import { ComicParams } from '../interfaces/ComicParams'

interface MarvelApiResponse {
  pagination: Pagination
}

interface GetCharacters extends MarvelApiResponse {
  characters: Character[]
}

interface GetComics extends MarvelApiResponse {
  comics: Comic[]
}

interface GetComic extends MarvelApiResponse {
  comic: Comic
}

interface GetCharacter extends MarvelApiResponse {
  character: Character
}

export class MarvelService {
  static async getCharacters(params?: CharactersParams): Promise<GetCharacters> {
    const { data: res } = await axios.get(`/characters?${querystring.stringify(params)}`)
    const characters: CharacterApiResponse[] = get(res, 'data.results')
    const formattedCharacters = characters.map((character) =>
      MarvelHelper.formatCharacter(character)
    )
    const pagination: Pagination = pick(res.data, ['offset', 'limit', 'total', 'count'])

    return { characters: formattedCharacters, pagination }
  }

  static async getComicsByCharacterId(id: string, params?: ComicParams): Promise<GetComics> {
    const { data: res } = await axios.get(
      `/characters/${id}/comics?${querystring.stringify(params)}`
    )
    const comics: ComicApiResponse[] = get(res, 'data.results')
    const formattedComics = comics.map((comic) => MarvelHelper.formatComic(comic))
    const pagination: Pagination = pick(res.data, ['offset', 'limit', 'total', 'count'])

    return { comics: formattedComics, pagination }
  }

  static async getCharacterById(id: string): Promise<GetCharacter> {
    const { data: res } = await axios.get(`/characters/${id}`)
    const character: CharacterApiResponse = head(get(res, 'data.results'))
    const formattedCharacter = MarvelHelper.formatCharacter(character)
    const pagination: Pagination = pick(res.data, ['offset', 'limit', 'total', 'count'])

    return { character: formattedCharacter, pagination }
  }

  static async getComicById(id: string): Promise<GetComic> {
    const { data: res } = await axios.get(`/comics/${id}`)
    const comic: ComicApiResponse = head(get(res, 'data.results'))
    const formattedComic = MarvelHelper.formatComic(comic)
    const pagination: Pagination = pick(res.data, ['offset', 'limit', 'total', 'count'])

    return { comic: formattedComic, pagination }
  }
}
