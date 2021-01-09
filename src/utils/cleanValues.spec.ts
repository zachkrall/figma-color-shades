import cleanValues from './cleanValues'

describe('Cleans Up Color Codes', () => {
  it('#00ff00', () => {
    expect(cleanValues('#00ff00')).toBe('00FF00')
  })
  it('#489FF4', () => {
    expect(cleanValues('#489FF4')).toBe('489FF4')
  })
  it('#XRQFFFF4', () => {
    expect(cleanValues('#XRQFFFF4')).toBe('FFFF4')
  })
})
