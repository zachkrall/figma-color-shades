import colorGen from './colorGen'
import cleanValues from './cleanValues'

const baseColor = '#6B7280'
const gray = {
  50: '#CDD0D5',
  100: '#C2C5CC',
  150: '#B7BBC3',
  200: '#ACB0BA',
  300: '#969BA7',
  400: '#7F8694',
  500: '#6B7280',
  600: '#565C67',
  700: '#41454E',
  800: '#2C2F35',
  900: '#17191C'
}

describe('Generates Colors Correctly', () => {
  it('Grayscale', () => {
    let stops = [0.5, 1, 1.5, 2, 3, 4, 5, 6, 7, 8, 9]
    let colors = {}
    let cleanColor = cleanValues(baseColor)
    stops.forEach(stop => {
      colors[stop * 100] = '#' + colorGen(cleanColor, stop, 8).hex
    })
    expect(colors).toEqual(gray)
  })
})
