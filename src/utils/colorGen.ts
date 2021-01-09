import converter from 'color-convert'

export default function colorGen(
  baseColor: string,
  stop: number,
  variance: number
) {
  let hex = (() => {
    let hsl = converter.rgb.hsl.raw(converter.hex.rgb(baseColor))
    let distance = 5 - stop
    let direction = distance < 0 ? variance + 1 : variance
    let lightness = Math.max(
      0,
      Math.min(hsl[2] + direction * distance, 100)
    )

    return converter.rgb.hex(
      converter.hsl.rgb([hsl[0], hsl[1], lightness])
    )
  })()

  let textColor = (() => {
    let rgb = converter.hex.rgb('#' + hex)
    let brightness =
      (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000

    return brightness > 125 ? 'black' : 'white'
  })()

  let rgb = (() => {
    let [r, g, b] = converter.hex.rgb('#' + hex)
    return { r: r / 255, g: g / 255, b: b / 255 }
  })()

  return {
    stop,
    hex,
    rgb,
    textColor
  }
}
