import React, { FC, ChangeEvent, useRef } from 'react'
import cleanValues from '../utils/cleanValues'

const VARIANCE_MAX = 20
const VARIANCE_MIN = 3

type Color = { hex: string; isValid: boolean }

interface Props {
  color: Color
  variance: number
  change: (e: { color: Color; variance: number }) => any
}

const ColorPicker: FC<Props> = ({ color, change, variance }) => {
  const colorInput = useRef<HTMLInputElement>(null)
  const varianceInput = useRef<HTMLInputElement>(null)
  const varianceTextInput = useRef<HTMLInputElement>(null)

  const getColor = (): Color => {
    let value = colorInput.current.value
    value = cleanValues(value)

    return {
      hex: value,
      isValid: value.length === 6
    }
  }

  const getVariance = (id: string): number => {
    if (id === 'varianceText') {
      let num = Number(varianceTextInput.current.value || 0)
      return Math.max(
        VARIANCE_MIN,
        Math.min(Math.floor(num), VARIANCE_MAX)
      )
    } else {
      return Number(varianceInput.current.value || 0)
    }
  }

  const inputChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e)
    change({ color: getColor(), variance: getVariance(e.target.id) })
  }

  return (
    <div
      className="flex items-center justify-between"
      style={{
        paddingBottom: '20px',
        fontSize: '1.1em',
        borderBottom: '1px solid var(--border-gray)'
      }}
    >
      <div>
        <div
          className="text-left mb"
          style={{ fontWeight: 600, color: 'var(--gray)' }}
        >
          Color
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <div
            style={{
              flexGrow: 0,
              width: '3em',
              height: '100%',
              padding: '8px',
              backgroundColor:
                '#' + (!color.isValid ? '808080' : color.hex),
              borderRadius: '5px',
              marginRight: 'var(--spacing)',
              border: '1px solid rgba(0,0,0,0.0)'
            }}
          >
            {'\u00A0'}
          </div>
          <input
            type="text"
            ref={colorInput}
            value={color.hex}
            onInput={inputChange}
            maxLength={
              7 /* user might paste 7 character hex code with # */
            }
            size={8}
            style={{
              background: 'none',
              padding: '8px',
              font: 'inherit',
              width: '100%',
              textAlign: 'center',
              flex: '1 1 auto',
              border: '1px solid var(--gray)',
              borderRadius: '5px',
              outline: 0
            }}
          />
        </div>
      </div>
      <div>
        <div
          className="text-left mb"
          style={{ fontWeight: 600, color: 'var(--gray)' }}
        >
          Contrast
        </div>
        <div className="flex items-center">
          <input
            type="range"
            min={VARIANCE_MIN}
            max={VARIANCE_MAX}
            value={variance}
            onInput={inputChange}
            ref={varianceInput}
            step={1}
            className="flex-auto mr"
          />
          <input
            id="varianceText"
            type="text"
            value={variance}
            ref={varianceTextInput}
            onInput={inputChange}
            size={2}
            style={{
              background: 'none',
              padding: '8px 4px',
              font: 'inherit',
              width: 'auto',
              textAlign: 'center',
              border: '1px solid var(--light-gray)',
              borderRadius: '5px',
              outline: 0
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default ColorPicker
