const commonStyles = {
  card: {
    textColor: '#fff',
    iconColor: '#fff',
  },
  backdrop: {
    background: 'rgba(44, 44, 38, 0.75)',
  },
}

export const theme = {
  dark: {
    body: {
      background: '#2f364a',
    },
    modal: {
      iconColor: 'rgba(255, 255, 255, 0.7)',
    },
    content: {
      background: '#181b26',
      iconColor: 'rgba(255, 255, 255, 0.7)',
      textColor: '#fff',
    },
    ...commonStyles,
  },
  light: {
    body: {
      background: '#F0F8FF',
    },
    modal: {
      iconColor: '#000',
    },
    content: {
      background: '#fff',
      iconColor: 'rgba(0, 0, 0, 0.1)',
      textColor: '#3e3e3e',
    },
    ...commonStyles,
  },
}
