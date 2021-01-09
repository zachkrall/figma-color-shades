import React, { FC, ChangeEvent, useRef } from 'react'
import { VARIANCE_MAX, VARIANCE_MIN } from '../constants'
import { useSettings } from '../context'
import cleanValues from '../utils/cleanValues'

const ColorPicker: FC<{}> = () => {
  const [state, dispatch] = useSettings()

  const colorInput = useRef<HTMLInputElement>(null)
  const varianceInput = useRef<HTMLInputElement>(null)
  const varianceTextInput = useRef<HTMLInputElement>(null)

  const getColor = (elm: HTMLInputElement) => {
    let value

    if (elm.id === 'color-picker' || elm.id === 'color-input') {
      value = cleanValues(elm.value)
    } else {
      value = colorInput.current.value
    }

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
    dispatch({
      type: 'update',
      payload: {
        color: getColor(e.target),
        variance: getVariance(e.target.id)
      }
    })
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
        <div className="flex items-center">
          <input
            id="color-picker"
            type="color"
            className="mr"
            onChange={inputChange}
            value={String('#' + state.color.hex)}
          />
          <input
            id="color-input"
            ref={colorInput}
            type="text"
            value={state.color.hex}
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
            value={state.variance}
            onInput={inputChange}
            ref={varianceInput}
            step={1}
            className="flex-auto mr"
            disabled={!state.color.isValid}
          />
          <input
            id="varianceText"
            type="text"
            value={state.variance}
            ref={varianceTextInput}
            onInput={inputChange}
            disabled={!state.color.isValid}
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
