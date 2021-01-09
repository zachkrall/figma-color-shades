/// <reference path="../../node_modules/@figma/plugin-typings/index.d.ts" />
import colorGen from '../utils/colorGen'

figma.showUI(__html__, { height: 700, width: 400 }) // ok

figma.ui.onmessage = async msg => {
  if (msg.type === 'create-rectangles') {
    await figma.loadFontAsync({ family: 'Roboto', style: 'Regular' })

    const nodes: SceneNode[] = []
    const stops: number[] = [
      0.5,
      1,
      1.5,
      2,
      3,
      4,
      5,
      6,
      7,
      7.5,
      8,
      8.5,
      9
    ]

    const { variance, baseColor } = msg

    stops.forEach((stop, i) => {
      const elements = []
      const color = colorGen(baseColor, stop, variance)
      const textColors = {
        black: { r: 0, g: 0, b: 0 },
        white: { r: 1, g: 1, b: 1 }
      }
      const dims = { width: 300, height: 50 }
      const pos = { x: 0, y: i * dims.height }

      /* rectangle */
      const rect = figma.createRectangle()
      rect.x = pos.x
      rect.y = pos.y
      rect.resize(dims.width, dims.height)
      rect.fills = [{ type: 'SOLID', color: color.rgb }]
      figma.currentPage.appendChild(rect)
      elements.push(rect)

      /* left label */
      const leftLabel = figma.createText()
      leftLabel.x = 20
      leftLabel.y = pos.y
      leftLabel.resize(dims.width * 0.5 - 40, dims.height)
      leftLabel.textAlignHorizontal = 'LEFT'
      leftLabel.textAlignVertical = 'CENTER'
      leftLabel.insertCharacters(0, String(stop * 100), 'BEFORE')
      leftLabel.fills = [
        { type: 'SOLID', color: textColors[color.textColor] }
      ]
      elements.push(leftLabel)

      /* right label */
      const rightLabel = figma.createText()
      rightLabel.x = dims.width * 0.5 + 20
      rightLabel.y = pos.y
      rightLabel.resize(dims.width * 0.5 - 40, dims.height)
      rightLabel.textAlignHorizontal = 'RIGHT'
      rightLabel.textAlignVertical = 'CENTER'
      rightLabel.insertCharacters(
        0,
        String('#' + color.hex),
        'BEFORE'
      )
      rightLabel.fills = [
        { type: 'SOLID', color: textColors[color.textColor] }
      ]
      elements.push(rightLabel)

      const colorStop = figma.group(elements, figma.currentPage)
      colorStop.name = String(stop * 100)

      nodes.push(colorStop)
    })

    figma.currentPage.selection = nodes

    const group = figma.group(
      figma.currentPage.selection,
      figma.currentPage
    )
    group.name = '#' + baseColor

    figma.viewport.scrollAndZoomIntoView(nodes)
  }

  figma.closePlugin()
}
