export const cloneWithoutKey = (object: Record<string, any>, key: string): Record<string, any> => {
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
