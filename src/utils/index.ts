export const cloneWithoutKey = (
  object: Record<string, unknown>,
  key: string
): Record<string, unknown> => {
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
