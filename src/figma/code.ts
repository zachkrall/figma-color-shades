/// <reference path="../../node_modules/@figma/plugin-typings/index.d.ts" />
import colorGen from '../utils/colorGen'
import { NAMED_COLORS_RGB, STEPS } from '../constants'
import createLabel from './Label'

figma.showUI(__html__, { height: 700, width: 400 }) // ok

figma.ui.onmessage = async msg => {
  if (msg.type === 'create-rectangles') {
    const PAGE = figma.currentPage

    await figma.loadFontAsync({
      family: 'Roboto',
      style: 'Regular'
    })
    await figma.loadFontAsync({
      family: 'Helvetica Neue',
      style: 'Medium'
    })
    await figma.loadFontAsync({
      family: 'Inter',
      style: 'Medium'
    })

    try {
      await figma.loadFontAsync({
        family: 'DNE',
        style: 'Regular'
      })
    } catch (e) {
      console.error(e)
    }

    const all_fonts: Font[] = await figma.listAvailableFontsAsync()

    const hasInter = all_fonts.some(
      ({ fontName: f }) => f.family === 'Inter'
    )
    const hasHelvetica = all_fonts.some(
      ({ fontName: f }) => f.family === 'Helvetica Neue'
    )
    const hasDNE = all_fonts.some(
      ({ fontName: f }) => f.family === 'DNE'
    )

    let use_font = 'Roboto'
    let use_weight = 'Regular'

    if (hasHelvetica) {
      use_font = 'Helvetica Neue'
      use_weight = 'Medium'
    }
    if (hasInter) {
      use_font = 'Inter'
      use_weight = 'Medium'
    }
    if (hasDNE) {
      /* this font does not exist */
      use_font = 'DNE'
      use_weight = 'Regular'
    }

    const nodes: SceneNode[] = []

    const { variance: v, baseColor: b } = msg

    STEPS.forEach((s, i) => {
      const elements = []
      const { hex, textColor: t, rgb: color } = colorGen(b, s, v)
      const width: number = 300
      const height: number = 50
      const x: number = 0
      const y: number = i * height

      const stop_number: string = (s * 100).toString()
      const stop_color: string = ('#' + hex).toString()

      const textColor: SolidPaint['color'] = NAMED_COLORS_RGB[t]

      /* rectangle */
      const rect = figma.createRectangle()
      rect.x = x
      rect.y = y
      rect.resize(width, height)
      rect.fills = [{ type: 'SOLID', color }]
      figma.currentPage.appendChild(rect)
      elements.push(rect)

      /* left label */
      const leftLabel = createLabel({
        text: stop_number,
        x: 20,
        y: y,
        w: width * 0.5 - 40,
        h: height,
        textAlign: 'LEFT',
        verticalAlign: 'CENTER',
        fills: [{ type: 'SOLID', color: textColor }],
        font: use_font,
        fontStyle: use_weight
      })
      elements.push(leftLabel)

      /* right label */
      const rightLabel = createLabel({
        text: stop_color,
        x: width * 0.5 + 20,
        y: y,
        w: width * 0.5 - 40,
        h: height,
        textAlign: 'RIGHT',
        verticalAlign: 'CENTER',
        fills: [{ type: 'SOLID', color: textColor }],
        font: use_font,
        fontStyle: use_weight
      })
      elements.push(rightLabel)

      /* create group */
      const colorStop = figma.group(elements, PAGE)
      colorStop.name = stop_color

      nodes.push(colorStop)
    })

    PAGE.selection = nodes

    /* create group */
    const group = figma.group(PAGE.selection, PAGE)
    group.name = ('#' + b).toString()

    figma.viewport.scrollAndZoomIntoView(nodes)
  }

  figma.closePlugin()
}
