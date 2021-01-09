/// <reference path="../../node_modules/@figma/plugin-typings/index.d.ts" />

interface LabelProps {
  text?: string
  x?: number
  y?: number
  w?: number
  h?: number
  textAlign?: TextNode['textAlignHorizontal']
  verticalAlign?: TextNode['textAlignVertical']
  fills?: GeometryMixin['fills']
  font?: FontName['family']
  fontStyle?: FontName['style']
}

export default function createLabel({
  text = '',
  x = 0,
  y = 0,
  w = 150,
  h = 150,
  textAlign = 'LEFT',
  verticalAlign = 'TOP',
  fills = [],
  font = 'Roboto',
  fontStyle = 'Regular'
}: LabelProps) {
  const label = figma.createText()
  label.x = x
  label.y = y
  label.resize(w, h)
  label.textAlignHorizontal = textAlign
  label.textAlignVertical = verticalAlign
  label.insertCharacters(0, text, 'BEFORE')
  label.fills = fills
  label.fontName = { family: font, style: fontStyle } as FontName
  return label
}
