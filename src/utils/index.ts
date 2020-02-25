import { get } from 'lodash'

export const parseMarvelResponse = (response: unknown): never[] => {
  return get(response, 'data.results')
}

export const getCharacterThumbnail = (character: unknown): string => {
  const path = get(character, 'thumbnail.path')
  const ext = get(character, 'thumbnail.extension')

  return `${path}/portrait_xlarge.${ext}`
}

export const getCharacterName = (character: unknown): string => {
  return get(character, 'name')
}
