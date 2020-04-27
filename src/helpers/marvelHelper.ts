/* eslint-disable class-methods-use-this */
import { get } from 'lodash'
import moment from 'moment'
import { ComicApiResponse } from '../interfaces/ComicApiResponse'
import { CharacterApiResponse } from '../interfaces/CharacterApiResponse'
import { Comic } from '../interfaces/Comic'
import { Character } from '../interfaces/Character'

class MarvelHelper {
  formatComic(comic: ComicApiResponse): Comic {
    return {
      id: comic.id.toString() || '',
      title: comic.title || '',
      description: comic.description || '',
      thumbnail: this.getComicThumbnail(comic),
      data: this.getComicData(comic),
    }
  }

  formatCharacter(character: CharacterApiResponse): Character {
    return {
      id: character.id.toString() || '',
      name: character.name || '',
      thumbnail: this.getCharacterThumbnail(character),
    }
  }

  private getComicThumbnail(comic: ComicApiResponse): string {
    const path = get(comic, 'thumbnail.path')
    const ext = get(comic, 'thumbnail.extension')

    return `${path}.${ext}`
  }

  private getCharacterThumbnail(character: CharacterApiResponse): string {
    const path = get(character, 'thumbnail.path')
    const ext = get(character, 'thumbnail.extension')

    return `${path}/portrait_incredible.${ext}`
  }

  private getComicData(comic: ComicApiResponse): Record<string, string[]> {
    const data: Record<string, string[]> = {}

    const { date } = comic.dates.find((date) => date.type === 'onsaleDate')

    data.published = [moment(date).format('MMMM DD, YYYY').toString()]

    comic.creators.items.forEach((creator) => {
      if (!data[creator.role]) {
        data[creator.role] = [creator.name]
        return
      }

      data[creator.role].push(creator.name)
    })

    return data
  }
}

export default new MarvelHelper()
