import React, { FC } from 'react'
import colorGen from '../utils/colorGen'

const Shades: FC<{ baseColor: string; variance: number }> = ({
  baseColor,
  variance
}) => {
  const steps = [0.5, 1, 1.5, 2, 3, 4, 5, 6, 7, 7.5, 8, 8.5, 9]

  return (
    <div
      className="flex-auto flex flex-column"
      style={{ padding: '20px 0px', fontSize: '1.1em' }}
    >
      {steps.map((step, index) => {
        let { hex, textColor } = colorGen(baseColor, step, variance)
        return (
          <div
            className="flex-auto shade flex justify-between xyz-in"
            xyz="fade small duration-5"
            style={{
              'background': '#' + hex,
              'color': textColor,
              'fontWeight': step === 5 ? 700 : 500,
              'letterSpacing': '0.06em',
              '--xyz-delay':
                Math.abs((steps.length * 0.5 - index) * 0.05) + 's'
            }}
          >
            <span>{step * 100}</span>
            <span>{'#' + hex}</span>
          </div>
        )
      })}
    </div>
  )
}

export default Shades
