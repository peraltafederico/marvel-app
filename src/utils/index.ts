import { get } from 'lodash'

export const getCharacterThumbnail = (character: unknown): string => {
  const path = get(character, 'thumbnail.path')
  const ext = get(character, 'thumbnail.extension')

  return `${path}/portrait_xlarge.${ext}`
}

export const getComicThumbnail = (comic: unknown): string => {
  const path = get(comic, 'thumbnail.path')
  const ext = get(comic, 'thumbnail.extension')

  return `${path}.${ext}`
}

export const fetchWithLoading = async (fetchingState: Function, callback: Function) => {
  fetchingState(true)
  await callback()
  fetchingState(false)
}
