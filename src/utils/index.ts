import { get } from 'lodash'

export const getCharacterThumbnail = (character: unknown): string => {
  const path = get(character, 'thumbnail.path')
  const ext = get(character, 'thumbnail.extension')

  return `${path}/portrait_incredible.${ext}`
}

export const getComicThumbnail = (comic: unknown): string => {
  const path = get(comic, 'thumbnail.path')
  const ext = get(comic, 'thumbnail.extension')

  return `${path}.${ext}`
}

export const cloneWithoutKey = (object: any, key: string): any => {
  const { [key]: deletedKey, ...newObject } = object

  return newObject
}

export const fetchWithLoading = async (
  loadingState: Function,
  callback: Function
): Promise<void> => {
  loadingState(true)
  await callback()
  loadingState(false)
}
