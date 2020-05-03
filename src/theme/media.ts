import { screenConfig } from '../config'

const customMediaQuery = (maxWidth: number): string => `@media (max-width: ${maxWidth}px)`

export const media = {
  desktop: customMediaQuery(screenConfig.desktop),
  tablet: customMediaQuery(screenConfig.tablet),
  mobile: customMediaQuery(screenConfig.mobile),
}
