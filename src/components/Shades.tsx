import React, { FC } from 'react'
import colorGen from '../utils/colorGen'
import { useSettings } from '../context'
import { STEPS } from '../constants'

const Shades: FC<{}> = () => {
  const [state] = useSettings()

  return (
    <div
      className="flex-auto flex flex-column"
      style={{ padding: '20px 0px', fontSize: '1.1em' }}
    >
      {STEPS.map((step, index) => {
        let { hex, textColor } = colorGen(
          state.color.hex,
          step,
          state.variance
        )
        return (
          <div
            className="flex-auto shade flex justify-between xyz-in"
            xyz="fade duration-5 small"
            style={{
              'background': '#' + hex,
              'color': textColor,
              'fontWeight': step === 5 ? 700 : 500,
              'letterSpacing': '0.06em',
              '--xyz-delay':
                Math.abs((STEPS.length * 0.4 - index) * 0.05) + 's'
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
