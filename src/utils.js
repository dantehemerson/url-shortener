import validUrl from 'valid-url'

export const isValidUrl = (url) => {
  return validUrl.isWebUri(url)
}
