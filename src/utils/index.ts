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

export const fetchWithLoading = async (
  loadingState: Function,
  callback: Function
): Promise<void> => {
  loadingState(true)
  await callback()
  loadingState(false)
}
