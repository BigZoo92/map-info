type AppColors = 'white' | 'black' | 'purple' | 'blue'

interface ThemeColors {
  light: string
  default: string
  dark: string
}

export type Colors = {
  [key in AppColors]: ThemeColors
}

export const colors: Colors = {
  white: {
    light: '#fff',
    default: '#F6FBFD',
    dark: '#E3EBEE',
  },
  black: {
    light: '#360842',
    default: '#2C0735',
    dark: '#0B020E',
  },
  purple: {
    light: '#858AE3',
    default: '#613DC1',
    dark: '#4E148C',
  },
  blue: {
    light: '#CEF1FF3',
    default: '#97DFFC',
    dark: '#6FA6BB',
  },
}
