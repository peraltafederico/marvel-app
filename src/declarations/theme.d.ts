import 'styled-components'

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    body: {
      background: string
    }
    modal: {
      iconColor: string
    }
    content: {
      background: string
      iconColor: string
      textColor: string
    }
    card: {
      iconColor: string
      textColor: string
    }
    backdrop: {
      background: string
    }
  }
}
